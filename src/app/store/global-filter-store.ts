/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
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

const useGlobalFilterStore = create<GlobalFilterStore>((set) => ({
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

export default useGlobalFilterStore;
