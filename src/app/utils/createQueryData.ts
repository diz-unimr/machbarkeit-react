/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type {
  FeasibilityQueryData,
  QueryCriterion,
} from "@/features/feasibility/feasibility-builder/type";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import setCriterionContext from "./setCriterionContext";
import type {
  ConceptType,
  QuantityType,
} from "@/features/filters/controls/type";

const createQueryData = (): FeasibilityQueryData | null => {
  const selectedInclusionCriteria =
    useSelectedCriteriaStore.getState().selectedInclusionCriteria;

  if (selectedInclusionCriteria.criteria.length === 0) return null;
  const queryData: FeasibilityQueryData = {
    version: "1.0.0",
    display: "Feasibility Query",
    inclusionCriteria: [] as QueryCriterion[][],
    exclusionCriteria: [] as QueryCriterion[][],
  };

  const criteriaWithContext = selectedInclusionCriteria.criteria
    .map((c) => {
      if (c.criterion.context) return c;
      else return { ...c, criterion: setCriterionContext(c.criterion) };
    })
    .filter((c) => c !== undefined);

  const criterion = criteriaWithContext[0].criterion
  const criteria = {
    id: criterion.id,
    termCodes: criterion.termCodes,
    context: criterion.context,
    valueFilter:
      (criterion.valueFilter as ConceptType["valueFilter"]) ||
      undefined /* (criteriaWithContext[0].criterion.valueFilter as QuantityType["valueFilter"])?. */,
    timeRestriction: criterion.timeRestrictionAllowed
      ? criterion.timeRestriction
      : undefined,
    isLocalFilter: criterion.isLocalFilter ?? false,
  };

  const logics = selectedInclusionCriteria.logics;
  let group = [criteria] as QueryCriterion[];

  for (let i = 0; i < logics.length; i++) {
    const criterion = criteriaWithContext[i + 1]?.criterion;
    if (!criterion) continue;

    const next = {
      id: criterion.id,
      termCodes: criterion.termCodes,
      context: criterion.context,
      valueFilter:
        criterion.valueFilter?.type === "concept"
          ? (criterion.valueFilter as ConceptType["valueFilter"])
          : ["quantity-range", "quantity-comparator"].includes(
                criterion.valueFilter?.type || "",
              )
            ? (criterion.valueFilter as QuantityType["valueFilter"])
            : undefined,
      timeRestriction: criterion.timeRestrictionAllowed
        ? criterion.timeRestriction
        : undefined,
      isLocalFilter: criterion.isLocalFilter ?? false,
    };
    const logic = logics[i];

    if (logic === "OR") {
      group.push(next);
    } else {
      queryData.inclusionCriteria?.push(group);
      group = [next];
    }
  }

  queryData.inclusionCriteria?.push(group);
  return queryData;
};

export default createQueryData;
