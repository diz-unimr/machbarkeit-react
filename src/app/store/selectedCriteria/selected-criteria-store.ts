/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type {
  CriterionNode,
  DropZone,
  SelectedCriteria,
} from "@features/feasibility/feasibility-builder/type";
import type { Active, Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type {
  ConceptType,
  QuantityType,
  TimeRangeType,
} from "@features/filters/controls/type";
import { useGlobalFilterStore } from "./global-filter-store";
import { useFilterValidationStore } from "../filter-validation-store";

export type FilterType =
  | {
      uid: string;
      filterType: "conceptType";
      filterValue: ConceptType["valueFilter"] | null;
    }
  | {
      uid: string;
      filterType: "quantityType";
      filterValue: QuantityType["valueFilter"] | null;
    }
  | {
      uid: string;
      filterType: "timeRangeType";
      filterValue: TimeRangeType["timeRestriction"] | null;
    };

type selectedCriteriaStore = {
  selectedInclusionCriteria: SelectedCriteria;
  selectedExclusionCriteria: SelectedCriteria;
  addNewCriteria: (newCriterion: CriterionNode, zone: DropZone) => void;
  removeCriterion: (idex: number, uid: string, zone: string) => void;
  updateCriterionFilter: (filterInfo: FilterType | null) => void;
  applyGlobalFilter: (filterName: "timeRange") => void;
  toggleLogic: (logicIndex: number) => void;
  // toggleCriterionExpansion: (uid: string, zone: string) => void;
  reOrderCriteria: (active: Active, over: Over, zone: string) => void;
  setSelectedCriteria: (selectedCriteria: SelectedCriteria) => void;
};

export const useSelectedCriteriaStore = create<selectedCriteriaStore>(
  (set) => ({
    selectedInclusionCriteria: {
      criteriaType: "inclusion",
      criteria: [],
      logics: [],
    },
    selectedExclusionCriteria: {
      criteriaType: "exclusion",
      criteria: [],
      logics: [],
    },
    addNewCriteria: (newCriterion, zone) => {
      set((state) => {
        const { globalFilter } = useGlobalFilterStore.getState();
        const nextCriteria = [
          ...state.selectedInclusionCriteria.criteria,
          newCriterion.criterion.timeRestrictionAllowed &&
          globalFilter.timeRange
            ? {
                ...newCriterion,
                criterion: {
                  ...newCriterion.criterion,
                  timeRestriction: globalFilter.timeRange,
                },
              }
            : newCriterion,
        ];

        const nextLogics =
          nextCriteria.length > 1
            ? [...state.selectedInclusionCriteria.logics, "AND"]
            : [];

        if (zone === "inclusion") {
          return {
            selectedInclusionCriteria: {
              ...state.selectedInclusionCriteria,
              criteria: nextCriteria,
              logics: nextLogics,
            },
          };
        }

        if (zone === "exclusion") {
          return {
            selectedExclusionCriteria: {
              ...state.selectedExclusionCriteria,
              criteria: nextCriteria,
              logics: nextLogics,
            },
          };
        }

        return state;
      });
    },

    removeCriterion: (index, uid, zone) => {
      set((state) => {
        const { deleteItem } = useFilterValidationStore.getState();
        const currentCriteria = state.selectedInclusionCriteria;
        const nextCriteria = currentCriteria.criteria.filter(
          (c) => c.uid !== uid
        );
        const nextLogics = currentCriteria.logics.filter((_, i) => {
          if (index === currentCriteria.criteria.length - 1) return i;
          else if (currentCriteria.logics[index - 1] === "OR")
            return i != index - 1;
          else return i != index;
        });

        deleteItem(uid);

        if (zone === "inclusion") {
          return {
            selectedInclusionCriteria: {
              ...state.selectedInclusionCriteria,
              criteria: nextCriteria,
              logics: nextLogics,
            },
          };
        }

        if (zone === "exclusion") {
          return {
            selectedExclusionCriteria: {
              ...state.selectedExclusionCriteria,
              criteria: nextCriteria,
              logics: nextLogics,
            },
          };
        }

        return state;
      });
    },
    // update local filter
    updateCriterionFilter: (filterInfo) => {
      console.log("filterInfo: ", filterInfo);
      set((state) => {
        const selectedCriteria = state.selectedInclusionCriteria;
        switch (filterInfo?.filterType) {
          case "conceptType":
          case "quantityType":
            return {
              selectedInclusionCriteria: {
                ...selectedCriteria,
                criteria: selectedCriteria.criteria.map((c) =>
                  c.uid === filterInfo.uid
                    ? {
                        ...c,
                        criterion: {
                          ...c.criterion,
                          valueFilter: filterInfo.filterValue ?? undefined,
                        },
                      }
                    : c
                ),
              },
            };
          case "timeRangeType": {
            console.log(filterInfo.filterValue ?? undefined);
            const updatedCriteria: SelectedCriteria = {
              ...selectedCriteria,
              criteria: selectedCriteria.criteria.map((c) =>
                c.uid === filterInfo.uid
                  ? {
                      ...c,
                      criterion: {
                        ...c.criterion,
                        timeRestriction: filterInfo.filterValue ?? undefined,
                      },
                    }
                  : c
              ),
            };
            return {
              selectedInclusionCriteria: updatedCriteria,
            };
          }
          default:
            return {
              selectedInclusionCriteria: { ...selectedCriteria },
            };
        }
      });
    },

    applyGlobalFilter: (filterName) => {
      set((state) => {
        const { globalFilter } = useGlobalFilterStore.getState();
        const selectedCriteria = state.selectedInclusionCriteria;
        const updatedCriteria: SelectedCriteria = {
          ...selectedCriteria,
          criteria: selectedCriteria.criteria.map((c) => {
            c.criterion.timeRestriction =
              globalFilter.timeRange as TimeRangeType["timeRestriction"];
            return c;
          }),
        };
        return {
          selectedInclusionCriteria: updatedCriteria,
        };
      });
    },

    toggleLogic: (logicIndex: number) => {
      set((state) => {
        const nextLogics = state.selectedInclusionCriteria.logics.map(
          (logic, i) =>
            i === logicIndex ? (logic === "OR" ? "AND" : "OR") : logic
        );
        return {
          selectedInclusionCriteria: {
            ...state.selectedInclusionCriteria,
            logics: nextLogics,
          },
        };
      });
    },

    /* toggleCriterionExpansion: (uid, zone) => {
      set((state) => {
        const currentCriteria = state.selectedInclusionCriteria;
        const updatedCriteria = {
          ...currentCriteria,
          criteria: currentCriteria.criteria.map((c) =>
            c.uid === uid
              ? {
                  ...c,
                  isExpanded: !c.isExpanded,
                }
              : c
          ),
        };
        return {
          selectedInclusionCriteria: updatedCriteria,
        };
      });
    }, */

    reOrderCriteria: (active, over, zone) => {
      set((state) => {
        const currentCriteria = state.selectedInclusionCriteria;
        const oldIndex = currentCriteria.criteria.findIndex(
          (c) => c.uid === active.id
        );
        const newIndex = currentCriteria.criteria.findIndex(
          (c) => c.uid === over.id
        );
        const movedCriteria = arrayMove(
          currentCriteria.criteria,
          oldIndex,
          newIndex
        );
        const nextCriteria = { ...currentCriteria, criteria: movedCriteria };

        return {
          selectedInclusionCriteria: nextCriteria,
        };
      });
    },

    setSelectedCriteria: (selectedCriteria) => {
      if (selectedCriteria.criteriaType === "inclusion") {
        set({ selectedInclusionCriteria: selectedCriteria });
      } else if (selectedCriteria.criteriaType === "exclusion") {
        set({ selectedExclusionCriteria: selectedCriteria });
      }
    },
  })
);
