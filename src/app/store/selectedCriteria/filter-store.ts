/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type { GlobalFilter } from "@features/feasibility/feasibility-builder/type";
import { useSelectedCriteriaStore } from "./selected-criteria-store";
import type { TimeRangeType } from "@features/filters/controls/type";

type FilterStore = {
  globalFilter: GlobalFilter;
  updateGlobalFilter: (
    filterType: string,
    value: string | (TimeRangeType["timeRestriction"] | null)
  ) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  globalFilter: {
    timeRange: null,
    caseType: null,
  },
  updateGlobalFilter: (filterType, value) => {
    console.log(filterType, value);
    set((state) => {
      const { selectedInclusionCriteria, updateCriteriaFilter } =
        useSelectedCriteriaStore.getState();
      console.log(selectedInclusionCriteria);
      const updatedGlobalFilter = {
        ...state.globalFilter,
        [filterType]: value,
      };
      updateCriteriaFilter(updatedGlobalFilter.timeRange);
      return {
        globalFilter: updatedGlobalFilter,
      };
    });
  },
}));
