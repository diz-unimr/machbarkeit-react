/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { useItemsStore } from "./checked-items-store";
import type { Criterion } from "../features/ontology/type";

enableMapSet();

type Store = {
  characteristics: Array<Array<Criterion>>;
  addCharacteristics: (criteriaFilter: Criterion[]) => void;
  deleteCharacteristic: (
    groupIndex: number,
    itemIndex: number,
    id: string
  ) => void;
  updateCharacteristicPosition: (
    groupIndex: number,
    itemIndex: number,
    criteriaFilter: Criterion
  ) => void;
  updateFilterValue: (
    groupIndex: number,
    itemIndex: number,
    criteriaFilter: Criterion
  ) => void;
  updateLogic: () => void;
};

/* type QueryCriterion = {
  id: string;
  termCodes: Criterion["termCodes"];
  context?: Criterion["context"];
};

type Characteristics = {
  display?: string;
  version?: string;
  inclusionCriteria?: Array<
    Array<QueryCriterion & Partial<ConceptType | QuantityType | TimeRangeType>>
  >;
  // exclusionCriteria?: QueryCriterion[][];
}; */

/* const getContext = () => {
  const modules: Module[] = useModulesStore.getState().modules;
  const selectedItems = useItemsStore.getState().selectedItems;
  const module = modules.find(
    (module) => module.id === Object.values(selectedItems)[0].moduleId
  );
  const context: Criterion["context"] = {
    code: module?.fdpgCdsCode || "",
    display: module?.name || "",
    system: module?.fdpgCdsSystem || "",
    version: module?.version || "",
  };
  return context;
}; */

export const useCharacteristicsStore = create<Store>()(
  immer((set) => ({
    characteristics: [],

    addCharacteristics: (criteriaFilter: Criterion[]) =>
      set((state) => {
        criteriaFilter.forEach((criterion) => {
          state.characteristics.push([criterion]);
        });
      }),

    deleteCharacteristic: (groupIndex: number, itemIndex: number, id: string) =>
      set((state) => {
        state.characteristics = state.characteristics?.map((inner) =>
          inner.filter((characteristic) => characteristic.id !== id)
        );
      }),

    updateCharacteristicPosition: (
      groupIndex: number,
      itemIndex: number,
      criteriaFilter: Criterion
    ) => set(() => {}),

    updateFilterValue: (
      groupIndex: number,
      itemIndex: number,
      criteriaFilter: Criterion
    ) =>
      set((state) => {
        state.characteristics[groupIndex][itemIndex] = criteriaFilter;
      }),

    updateLogic: () =>
      set(() => {
        /* const selectedItems = useItemsStore.getState().selectedItems;
        return { characteristics: Object.values(selectedItems) }; */
      }),
  }))
);
