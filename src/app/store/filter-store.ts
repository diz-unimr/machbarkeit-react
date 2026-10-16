/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type { TimeRangeType } from "@features/filters/controls/type";
import type { GlobalFilterName } from "@/features/filters/GlobalFilterPanel";
import type { DropZone } from "@/features/feasibility/feasibility-builder/type";
import type { FilterType } from "../types/ontologyType";

export type GlobalFilter = {
  timeRestriction: TimeRangeType["timeRestriction"] | null;
  /* caseType: CaseType | null;
  isEditing: boolean; */
};

export type EditingFilter = {
  scope: "global" | DropZone;
  criterionUid?: string;
  filterName: FilterType | "timeRestriction";
};

type FilterStore = {
  globalFilter: GlobalFilter;
  editingFilters: EditingFilter[];
  updateGlobalFilter: (
    filterName: GlobalFilterName,
    value: TimeRangeType["timeRestriction"] | null,
  ) => void;
  startEditing: (editinfFilterInfo: EditingFilter) => void;
  stopEditing: (editinfFilterInfo: EditingFilter) => void;
  clearFilter: () => void;
};

const useFilterStore = create<FilterStore>((set) => ({
  globalFilter: {
    timeRestriction: null,
    /* caseType: "no filter",
    isEditing: false, */
  },

  editingFilters: [],

  updateGlobalFilter: (filterName, value) => {
    set((state) => {
      const updatedGlobalFilter = {
        ...state.globalFilter,
        [filterName]:
          filterName === "timeRestriction"
            ? (value as TimeRangeType["timeRestriction"])
            : null,
      };
      state.stopEditing({ scope: "global", filterName: "timeRestriction" });
      return {
        globalFilter: updatedGlobalFilter,
      };
    });
  },

  startEditing: (editingFilterInfo) =>
    set((state) => {
      console.log("editingFilterInfo: ", editingFilterInfo);
      const editingFilters = state.editingFilters ?? [];
      const isEditing = editingFilters.some(
        (filter) =>
          filter.scope === editingFilterInfo.scope &&
          filter.criterionUid === editingFilterInfo.criterionUid &&
          filter.filterName === editingFilterInfo.filterName,
      );

      console.log("isEditing: ", isEditing);

      if (isEditing) {
        return state;
      }

      return {
        editingFilters: [...editingFilters, editingFilterInfo],
      };
    }),

  stopEditing: (editingFilterInfo: EditingFilter) =>
    set((state) => {
      console.log("stopEditing: ", editingFilterInfo);
      const editingFilters = state.editingFilters ?? [];

      return {
        editingFilters: editingFilters.filter(
          (filter) =>
            !(
              filter.scope === editingFilterInfo.scope &&
              filter.criterionUid === editingFilterInfo.criterionUid &&
              filter.filterName === editingFilterInfo.filterName
            ),
        ),
      };
    }),

  clearFilter: () =>
    set(() => ({
      globalFilter: {
        timeRestriction: null,
      },
      editingFilters: [],
    })),
}));

export default useFilterStore;
