/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type {
  AttributeDefinition,
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
  if (criterion.context?.code !== "Diagnose" || !criterion.attributeFilters)
    return null;

  const updatedAttributeFilters = criterion.attributeFilters
    .map((attr) => {
      const attrDefinition = criterion.attributeDefinitions?.find(
        (def) => def.attributeCode.code === attr.attributeCode.code,
      );

      if (!attrDefinition) return null;

      if (attrDefinition.type === "concept" && attr.type === "concept") {
        return {
          type: "concept",
          attributeCode: {
            code: "Fallart",
            display: "Fallart",
            system: "http://hl7.org/fhir/StructureDefinition",
          },
          selectedConcepts: attr.selectedConcepts,
        } as AttributeFilterConcept;
      }

      if (attrDefinition.type === "reference") {
        const selectedCodes =
          attr.type === "concept"
            ? attr.selectedConcepts.map((c) => c.code)
            : [];

        const priorityCodeKey =
          selectedCodes.length > 1 ? "cc_or_cm" : selectedCodes[0];

        const diagnosisCoding = getDiagnosisPriorityCode(
          criterion,
          priorityCodeKey,
        );

        if (!diagnosisCoding) return null;

        return {
          type: "reference",
          attributeCode: diagnosisCoding,
          criteria: [
            {
              termCodes: criterion.termCodes,
              context: criterion.context,
              timeRestriction: criterion.timeRestriction,
            },
          ],
        } satisfies AttributeFilterReference;
      }
      return null;
    })
    .filter((attr) => attr !== null && attr !== undefined);

  return updatedAttributeFilters;
};
