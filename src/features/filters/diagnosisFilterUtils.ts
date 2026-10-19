/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type {
  AttributeFilter,
  AttributeFilterConcept,
  AttributeFilterReference,
  Coding,
  Criterion,
} from "@/app/types/ontologyType";
import { getDiagnosisPriorityCode } from "@/app/constants/diagnosisPriorityCodes";

export const getSelectedConcepts = (
  criterion: Criterion,
  filterType: string,
) => {
  if (filterType === "concept") {
    return (
      criterion.attributeFilters?.find((attr) => attr?.type === "concept")
        ?.selectedConcepts ?? []
    );
  }

  if (filterType === "reference") {
    const attributeCode = criterion.attributeFilters?.find(
      (attr) => attr.type === "reference",
    )?.attributeCode.code;

    if (!attributeCode) return undefined;

    const codesToCheck =
      attributeCode === "cc_or_cm" ? ["cc", "cm"] : [attributeCode];

    return codesToCheck
      .map((code) => getDiagnosisPriorityCode(criterion, code))
      .filter((coding): coding is Coding => coding !== undefined);
  }

  return undefined;
};

export const buildAttributeFilters = (
  criterion: Criterion,
): AttributeFilter[] | null => {
  if (criterion.context?.code !== "Diagnose") return null;

  const filters = criterion.attributeFilters;
  if (!filters) return null;

  const definitions = new Map(
    (criterion.attributeDefinitions ?? []).map((def) => [
      def.attributeCode.code,
      def,
    ]),
  );

  const hasReferenceFilter = filters.some(
    (attr) => definitions.get(attr.attributeCode.code)?.type === "reference",
  );

  const result = filters.flatMap((attr): AttributeFilter[] => {
    const definition = definitions.get(attr.attributeCode.code);

    if (!definition) return [];

    // Concept filter: Fallart
    if (definition.type === "concept" && attr.type === "concept") {
      return [
        {
          type: "concept",
          attributeCode: {
            code: "Fallart",
            display: "Fallart",
            system: "http://hl7.org/fhir/StructureDefinition",
          },
          selectedConcepts: attr.selectedConcepts,
        } as AttributeFilterConcept,
      ];
    }

    // Reference filter: DiagnosisPriority
    if (definition.type === "reference") {
      const selectedCodes =
        attr.type === "concept" && attr.selectedConcepts?.length
          ? attr.selectedConcepts.map((c) => c.code)
          : ["cc", "cm"];

      const priorityCodeKey =
        selectedCodes.length > 1 ? "cc_or_cm" : selectedCodes[0];

      const diagnosisCoding = getDiagnosisPriorityCode(
        criterion,
        priorityCodeKey,
      );

      if (!diagnosisCoding) return [];

      return [
        {
          type: "reference",
          attributeCode: diagnosisCoding,
          criteria: [
            {
              termCodes: criterion.termCodes,
              context: criterion.context,
              timeRestriction: criterion.timeRestriction,
            },
          ],
        } as AttributeFilterReference,
      ];
    }

    return [];
  });

  // default cc_or_cm
  if (!hasReferenceFilter) {
    const diagnosisCoding = getDiagnosisPriorityCode(criterion, "cc_or_cm");

    if (diagnosisCoding) {
      result.push({
        type: "reference",
        attributeCode: diagnosisCoding,
        criteria: [
          {
            termCodes: criterion.termCodes,
            context: criterion.context,
            timeRestriction: criterion.timeRestriction,
          },
        ],
      } as AttributeFilterReference);
    }
  }

  return result;
};
