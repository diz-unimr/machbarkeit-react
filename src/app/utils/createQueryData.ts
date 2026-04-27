/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type {
  FeasibilityQueryData,
  QueryCriterion,
} from "@/features/feasibility/feasibility-builder/type";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import useGlobalFilterStore from "@app/store/global-filter-store";
import setCriterionContext from "./setCriterionContext";
import type {
  ConceptType,
  QuantityType,
} from "@/features/filters/controls/type";
import generateUID from "./generateUID";

const createQueryData = (): FeasibilityQueryData | null => {
  const selectedInclusionCriteria =
    useSelectedCriteriaStore.getState().selectedInclusionCriteria.criteria;
  if (selectedInclusionCriteria.length === 0) return null;

  const logics =
    useSelectedCriteriaStore.getState().selectedInclusionCriteria.logics;
  const globalFilter = useGlobalFilterStore.getState().globalFilter;
  if (globalFilter.caseType) {
    selectedInclusionCriteria.push({
      uid: generateUID(),
      criterion: globalFilter.caseType,
    });
    logics.push("AND"); // still has problem
  }

  const queryData: FeasibilityQueryData = {
    version: "1.0.0",
    display: "Feasibility Query",
    inclusionCriteria: [] as QueryCriterion[][],
    exclusionCriteria: [] as QueryCriterion[][],
  };

  const criteriaWithContext = selectedInclusionCriteria
    .map((c) => {
      if (c.criterion.context) return c;
      else return { ...c, criterion: setCriterionContext(c.criterion) };
    })
    .filter((c) => c !== undefined);

  const criteria = {
    id: criteriaWithContext[0].criterion.id,
    termCodes: criteriaWithContext[0].criterion.termCodes,
    context: criteriaWithContext[0].criterion.context,
    valueFilter:
      (criteriaWithContext[0].criterion
        .valueFilter as ConceptType["valueFilter"]) ||
      undefined /* (criteriaWithContext[0].criterion.valueFilter as QuantityType["valueFilter"])?. */,
    timeRestriction: criteriaWithContext[0].criterion.timeRestrictionAllowed
      ? criteriaWithContext[0].criterion.timeRestriction
      : undefined,
    isLocalFilter: criteriaWithContext[0].criterion.isLocalFilter ?? false,
  };

  let group = [criteria] as QueryCriterion[];

  for (let i = 0; i < logics.length; i++) {
    const next = {
      id: criteriaWithContext[i + 1].criterion.id,
      termCodes: criteriaWithContext[i + 1].criterion.termCodes,
      context: criteriaWithContext[i + 1].criterion.context,
      valueFilter:
        criteriaWithContext[i + 1].criterion.filterType === "concept"
          ? (criteriaWithContext[i + 1].criterion
              .valueFilter as ConceptType["valueFilter"])
          : criteriaWithContext[i + 1].criterion.filterType === "quantity"
            ? (criteriaWithContext[0].criterion
                .valueFilter as QuantityType["valueFilter"])
            : undefined,
      timeRestriction: criteriaWithContext[i + 1].criterion
        .timeRestrictionAllowed
        ? criteriaWithContext[i + 1].criterion.timeRestriction
        : undefined,
      isLocalFilter:
        criteriaWithContext[i + 1].criterion.isLocalFilter ?? false,
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
