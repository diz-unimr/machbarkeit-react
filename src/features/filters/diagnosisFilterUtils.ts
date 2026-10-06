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
import type { ConceptType } from "./controls/type";

export const createAttributeFilterInfo = (
  criterion: Criterion,
  attributeDefinition: AttributeDefinition,
  nextConcepts: ConceptType["valueFilter"],
): AttributeFilter | null => {
  if (!nextConcepts || nextConcepts?.selectedConcepts?.length === 0)
    return null;

  if (attributeDefinition.type === "reference") {
    const selectedCodes = nextConcepts.selectedConcepts.map((c) => c.code);

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

  if (attributeDefinition.type === "concept") {
    return {
      type: "concept",
      attributeCode: attributeDefinition.attributeCode,
      selectedConcepts: nextConcepts?.selectedConcepts,
    } satisfies AttributeFilterConcept;
  }

  return null;
};

export const getSelectedConcepts = (
  criterion: Criterion,
  filterDefinition: AttributeDefinition,
) => {
  if (filterDefinition.type === "concept") {
    return (
      criterion.attributeFilters?.find((attr) => attr?.type === "concept")
        ?.selectedConcepts ?? []
    );
  }

  if (filterDefinition.type === "reference") {
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
