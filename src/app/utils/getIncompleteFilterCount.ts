/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { EditingFilter } from "@/app/store/filter-store";
import type {
  DropZone,
  CriterionNode,
} from "@/features/feasibility/feasibility-builder/type";

/* type UnconfirmedFilter = {
  scope: "global" | "local";
  criterionUid?: string;
  filterName: string;
}; */

type UnconfirmedFiltersProps =
  | {
      scope: "all";
      editingFilters: EditingFilter[];
      criteria: CriterionNode[];
    }
  | {
      scope: DropZone;
      editingFilters: EditingFilter[];
      item: CriterionNode;
    };

export const getIncompleteFilterCount = (
  params: UnconfirmedFiltersProps,
): number => {
  // Check EditingFilters
  let numberOfEditingFilters = 0;
  if (params.scope === "all") {
    numberOfEditingFilters = params.editingFilters.length;
  } else {
    numberOfEditingFilters = params.editingFilters.filter((filter) => {
      return (
        params.scope === filter.scope && params.item.uid === filter.criterionUid
      );
    }).length;
  }

  // Check missing required Filter
  let numberOfMissingRequiredFilters = 0;
  // check all required filters
  if (params.scope === "all") {
    params.criteria.forEach(({ criterion }) => {
      // check value definition
      if (
        criterion.valueDefinition?.optional === false &&
        !criterion.valueFilter
      ) {
        numberOfMissingRequiredFilters += 1;
      }

      // check attribute definitions
      criterion.attributeDefinitions?.forEach((attr) => {
        const hasFilter = criterion.attributeFilters?.some(
          (filter) => filter.attributeCode.code === attr.attributeCode.code,
        );

        if (attr.optional === false && !hasFilter) {
          numberOfMissingRequiredFilters += 1;
        }
      });
    });
  } else {
    // check required filters in current criterion
    const criterion = params.item?.criterion;
    // check value definition
    if (
      criterion?.valueDefinition?.optional === false &&
      !criterion?.valueFilter
    ) {
      numberOfMissingRequiredFilters += 1;
    }

    // check attribute definitions
    const requiredFilters = criterion.attributeDefinitions?.filter(
      (attr) => attr.optional === false,
    );
    requiredFilters?.forEach((reqAttr) => {
      const hasFilter = criterion.attributeFilters?.some(
        (filter) => filter.attributeCode.code === reqAttr.attributeCode.code,
      );

      if (!hasFilter) numberOfMissingRequiredFilters += 1;
    });
  }

  const numberOfIncompletedFilter =
    numberOfEditingFilters + numberOfMissingRequiredFilters;

  return numberOfIncompletedFilter;
};
