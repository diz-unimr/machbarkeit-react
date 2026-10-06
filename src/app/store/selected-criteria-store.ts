/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type {
  CriterionNode,
  DropZone,
  LogicOperator,
  SelectedCriteria,
} from "@features/feasibility/feasibility-builder/type";
import type { Active, Over } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type {
  ConceptType,
  QuantityType,
  TimeRangeType,
} from "@features/filters/controls/type";
import useGlobalFilterStore from "./global-filter-store";
import type { AttributeFilter, Coding, Criterion } from "../types/ontologyType";

export type SelectedValueFilterProps =
  | {
      uid: string;
      filterType: "concept";
      selectedFilter: ConceptType["valueFilter"] | null;
      isLocalFilter?: boolean;
    }
  | {
      uid: string;
      filterType: "quantity";
      selectedFilter: QuantityType["valueFilter"] | null;
      isLocalFilter?: boolean;
    }
  | {
      uid: string;
      filterType: "timeRange";
      selectedFilter: TimeRangeType["timeRestriction"] | null;
      isLocalFilter?: boolean;
    };

export type SelectedAttributeFilterProps = {
  uid: string;
  attributeCode: Coding;
  selectedFilter: AttributeFilter | null;
  isLocalFilter?: boolean;
};

type SelectedCriteriaStore = {
  selectedInclusionCriteria: SelectedCriteria;
  selectedExclusionCriteria: SelectedCriteria;
  addNewCriterion: (newCriterion: CriterionNode, zone: DropZone) => void;
  startEditing: (zone: DropZone, uid: string) => void;
  stopEditing: (zone: DropZone, uid: string) => void;
  removeCriterion: (idex: number, uid: string, zone: DropZone) => void;
  updateValueFilter: (selectedFilterInfo: SelectedValueFilterProps) => void;
  updateAttributeFilter: (
    selectedFilterInfo: SelectedAttributeFilterProps,
  ) => void;
  applyGlobalTimeRange: (includeLocal: boolean) => void;
  toggleLogic: (logicIndex: number) => void;
  reOrderCriteria: (active: Active, over: Over, zone: DropZone) => void;
  setSelectedCriteria: (selectedCriteria: SelectedCriteria) => void;
  clearSelectedCriteria: () => void;
};

const checkFilterRequired = (criterion: Criterion) => {
  const hasAttributeDefinitionsFilterRequired =
    criterion.attributeDefinitions?.some((filter) => filter.optional === false);
  const hasValueDefinitionFilterRequired =
    criterion.valueDefinition?.optional === false;

  return (
    hasAttributeDefinitionsFilterRequired || hasValueDefinitionFilterRequired
  );
};

export const useSelectedCriteriaStore = create<SelectedCriteriaStore>(
  (set) => ({
    selectedInclusionCriteria: {
      criteriaType: "inclusionCriteria",
      criteria: [],
      logics: [],
    },
    selectedExclusionCriteria: {
      criteriaType: "exclusionCriteria",
      criteria: [],
      logics: [],
    },
    addNewCriterion: (newCriterion, zone) => {
      set((state) => {
        const hasFilterRequired = checkFilterRequired(newCriterion.criterion);
        const { globalFilter } = useGlobalFilterStore.getState();
        const nextCriteria = [
          ...state.selectedInclusionCriteria.criteria,
          {
            ...newCriterion,
            criterion: {
              ...newCriterion.criterion,
              timeRestriction:
                newCriterion.criterion.timeRestrictionAllowed &&
                globalFilter.timeRange
                  ? globalFilter.timeRange
                  : undefined,
            },
            isEditing: hasFilterRequired,
          },
        ];

        const nextLogics =
          nextCriteria.length > 1
            ? [
                ...state.selectedInclusionCriteria.logics,
                "AND" as LogicOperator,
              ]
            : [];

        if (zone === "inclusionCriteria") {
          return {
            selectedInclusionCriteria: {
              ...state.selectedInclusionCriteria,
              criteria: nextCriteria,
              logics: nextLogics,
            },
          };
        }

        if (zone === "exclusionCriteria") {
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

    startEditing: (zone, uid) =>
      set((state) => {
        if (zone === "inclusionCriteria") {
          return {
            selectedInclusionCriteria: {
              ...state.selectedInclusionCriteria,
              criteria: state.selectedInclusionCriteria.criteria.map((c) =>
                c.uid === uid ? { ...c, isEditing: true } : c,
              ),
            },
          };
        } else if (zone === "exclusionCriteria") {
          return {
            selectedExclusionCriteria: {
              ...state.selectedExclusionCriteria,
              criteria: state.selectedExclusionCriteria.criteria.map((c) =>
                c.uid === uid ? { ...c, isEditing: true } : c,
              ),
            },
          };
        }
        return state;
      }),

    stopEditing: (zone, uid) =>
      set((state) => {
        if (zone === "inclusionCriteria") {
          return {
            selectedInclusionCriteria: {
              ...state.selectedInclusionCriteria,
              criteria: state.selectedInclusionCriteria.criteria.map((c) =>
                c.uid === uid ? { ...c, isEditing: false } : c,
              ),
            },
          };
        } else if (zone === "exclusionCriteria") {
          return {
            selectedExclusionCriteria: {
              ...state.selectedExclusionCriteria,
              criteria: state.selectedExclusionCriteria.criteria.map((c) =>
                c.uid === uid ? { ...c, isEditing: false } : c,
              ),
            },
          };
        }
        return state;
      }),

    removeCriterion: (index, uid, zone) => {
      set((state) => {
        const currentCriteria = state.selectedInclusionCriteria;
        const nextCriteria = currentCriteria.criteria.filter(
          (c) => c.uid !== uid,
        );
        const nextLogics = currentCriteria.logics.filter((_, i) => {
          if (index === currentCriteria.criteria.length - 1) return i;
          else if (currentCriteria.logics[index - 1] === "OR")
            return i != index - 1;
          else return i != index;
        });

        if (zone === "inclusionCriteria") {
          return {
            selectedInclusionCriteria: {
              ...state.selectedInclusionCriteria,
              criteria: nextCriteria,
              logics: nextLogics,
            },
          };
        }

        if (zone === "exclusionCriteria") {
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
    updateValueFilter: (selectedValueFilter) => {
      set((state) => {
        const selectedCriteria = state.selectedInclusionCriteria;
        switch (selectedValueFilter?.filterType) {
          case "concept":
          case "quantity":
            return {
              selectedInclusionCriteria: {
                ...selectedCriteria,
                criteria: selectedCriteria.criteria.map((c) =>
                  c.uid === selectedValueFilter.uid
                    ? {
                        ...c,
                        criterion: {
                          ...c.criterion,
                          valueFilter:
                            selectedValueFilter.selectedFilter ?? undefined,
                        },
                      }
                    : c,
                ),
              },
            };
          case "timeRange": {
            const updatedCriteria: SelectedCriteria = {
              ...selectedCriteria,
              criteria: selectedCriteria.criteria.map((c) =>
                c.uid === selectedValueFilter.uid
                  ? {
                      ...c,
                      criterion: {
                        ...c.criterion,
                        timeRestriction:
                          selectedValueFilter.selectedFilter?.beforeDate ||
                          selectedValueFilter.selectedFilter?.afterDate
                            ? selectedValueFilter.selectedFilter
                            : undefined,
                        isLocalFilter:
                          selectedValueFilter.isLocalFilter ?? false,
                      },
                    }
                  : c,
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

    updateAttributeFilter: (selectedAttributeFilter) => {
      set((state) => {
        const selectedCriteria = state.selectedInclusionCriteria;
        return {
          selectedInclusionCriteria: {
            ...selectedCriteria,
            criteria: selectedCriteria.criteria.map((c) => {
              if (c.uid !== selectedAttributeFilter.uid) return c;

              const otherAttributeFilters = (
                c.criterion.attributeFilters ?? []
              ).filter((af) => {
                return selectedAttributeFilter.attributeCode.code === "Fallart"
                  ? af.attributeCode.code !== "Fallart"
                  : af.attributeCode.code === "Fallart";
              });

              const nextAttributeFilters =
                selectedAttributeFilter.selectedFilter
                  ? [
                      ...otherAttributeFilters,
                      selectedAttributeFilter.selectedFilter,
                    ]
                  : otherAttributeFilters;

              return {
                ...c,
                criterion: {
                  ...c.criterion,
                  attributeFilters: nextAttributeFilters,
                },
              };
            }),
          },
        };
      });
    },

    applyGlobalTimeRange: (includeLocal) => {
      set((state) => {
        const { globalFilter } = useGlobalFilterStore.getState();
        const current = state.selectedInclusionCriteria;
        return {
          selectedInclusionCriteria: {
            ...current,
            criteria: current.criteria.map((c) => {
              if (!c.criterion.timeRestrictionAllowed) return c;

              const isLocal = c.criterion.isLocalFilter === true;
              if (!includeLocal && (isLocal || c.isEditing)) return c; // skips local
              return {
                ...c,
                isEditing: false,
                criterion: {
                  ...c.criterion,
                  timeRestriction: globalFilter.timeRange
                    ? globalFilter.timeRange
                    : undefined,
                  isLocalFilter: false,
                },
              };
            }),
          },
        };
      });
    },

    toggleLogic: (logicIndex: number) => {
      set((state) => {
        const nextLogics = state.selectedInclusionCriteria.logics.map(
          (logic, i) =>
            i === logicIndex ? (logic === "OR" ? "AND" : "OR") : logic,
        );
        return {
          selectedInclusionCriteria: {
            ...state.selectedInclusionCriteria,
            logics: nextLogics,
          },
        };
      });
    },

    reOrderCriteria: (active, over /* zone */) => {
      set((state) => {
        const currentCriteria = state.selectedInclusionCriteria;
        const oldIndex = currentCriteria.criteria.findIndex(
          (c) => c.uid === active.id,
        );
        const newIndex = currentCriteria.criteria.findIndex(
          (c) => c.uid === over.id,
        );
        const movedCriteria = arrayMove(
          currentCriteria.criteria,
          oldIndex,
          newIndex,
        );
        const nextCriteria = { ...currentCriteria, criteria: movedCriteria };

        return {
          selectedInclusionCriteria: nextCriteria,
        };
      });
    },

    setSelectedCriteria: (selectedCriteria) => {
      if (selectedCriteria.criteriaType === "inclusionCriteria") {
        set({ selectedInclusionCriteria: selectedCriteria });
      } else if (selectedCriteria.criteriaType === "exclusionCriteria") {
        set({ selectedExclusionCriteria: selectedCriteria });
      }
    },

    clearSelectedCriteria: () => {
      set({
        selectedInclusionCriteria: {
          criteriaType: "inclusionCriteria",
          criteria: [],
          logics: [],
        },
        selectedExclusionCriteria: {
          criteriaType: "exclusionCriteria",
          criteria: [],
          logics: [],
        },
      });
    },
  }),
);
