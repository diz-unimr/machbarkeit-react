/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import { useSelectedCriteriaStore } from "./selected-criteria-store";
import type { TimeRangeType } from "@features/filters/controls/type";
import type { GlobalFilterName } from "@features/filters/globalFilterPanel";

export type GlobalFilter = {
  timeRange: TimeRangeType["timeRestriction"] | null;
  caseType: string | null;
};

type GlobalFilterStore = {
  globalFilter: GlobalFilter;
  updateGlobalFilter: (
    filterName: GlobalFilterName,
    value: string | (TimeRangeType["timeRestriction"] | null)
  ) => void;
};

export const checkGlobalConflicts = (
  filterValue: TimeRangeType["timeRestriction"] | null
): boolean => {
  const { selectedInclusionCriteria } = useSelectedCriteriaStore.getState();
  const hasLocalFilter = selectedInclusionCriteria.criteria.some(
    (c) =>
      c.criterion.timeRestriction &&
      (c.criterion.timeRestriction.isLocalFilter ||
        c.criterion.timeRestriction?.afterDate !== filterValue?.afterDate ||
        c.criterion.timeRestriction?.beforeDate !== filterValue?.beforeDate)
  );
  return hasLocalFilter;
};

export const useGlobalFilterStore = create<GlobalFilterStore>((set) => ({
  globalFilter: {
    timeRange: null,
    caseType: "no filter",
  },

  updateGlobalFilter: (filterName, value) => {
    set((state) => {
      const updatedGlobalFilter = {
        ...state.globalFilter,
        [filterName]:
          filterName === "timeRange"
            ? (value as TimeRangeType["timeRestriction"])
            : filterName === "caseType"
              ? (value as string)
              : null,
      };
      return {
        globalFilter: updatedGlobalFilter,
      };
    });
  },
}));
