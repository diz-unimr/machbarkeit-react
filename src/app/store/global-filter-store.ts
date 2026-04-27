/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type { TimeRangeType } from "@features/filters/controls/type";
import type { GlobalFilterName } from "@features/filters/globalFilterPanel";
import type { Criterion } from "../types/ontologyType";

export type GlobalFilter = {
  timeRange: TimeRangeType["timeRestriction"] | null;
  caseType: Criterion | null;
  isEditing: boolean;
};

type GlobalFilterStore = {
  globalFilter: GlobalFilter;
  updateGlobalFilter: (
    filterName: GlobalFilterName,
    value: Criterion | TimeRangeType["timeRestriction"] | null,
  ) => void;
  startEditing: () => void;
  stopEditing: () => void;
};

const useGlobalFilterStore = create<GlobalFilterStore>((set) => ({
  globalFilter: {
    timeRange: null,
    caseType: null,
    isEditing: false,
  },

  updateGlobalFilter: (filterName, value) => {
    set((state) => {
      const updatedGlobalFilter = {
        ...state.globalFilter,
        [filterName]:
          filterName === "timeRange"
            ? (value as TimeRangeType["timeRestriction"])
            : filterName === "caseType"
              ? (value as Criterion)
              : null,
      };
      return {
        globalFilter: updatedGlobalFilter,
      };
    });
  },

  startEditing: () =>
    set((state) => ({
      globalFilter: {
        ...state.globalFilter,
        isEditing: true,
      },
    })),

  stopEditing: () =>
    set((state) => ({
      globalFilter: {
        ...state.globalFilter,
        isEditing: false,
      },
    })),
}));

export default useGlobalFilterStore;
