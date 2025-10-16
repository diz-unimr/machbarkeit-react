/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { useCheckedItemsStore } from "./checked-items-store";
import { useModulesStore } from "./modules-store";
import type { Criterion, Module } from "../features/ontology/type";
import type {
  ConceptType,
  QuantityType,
  TimeRangeType,
} from "../features/filters/controls/type";

enableMapSet();

type Store = {
  characteristics: Characteristics;
  addCharacteristics: () => void;
  deleteCharacteristic: (id: string) => void;
  updateFilterValue: () => void;
};

type QueryCriterion = {
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
};

const getContext = () => {
  const modules: Module[] = useModulesStore.getState().modules;
  const selectedItems = useCheckedItemsStore.getState().selectedItems;
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
};

export const useCharacteristicsStore = create<Store>()(
  immer((set) => ({
    characteristics: {
      display: "Machbarkeitsabfrage",
      version: "1.0.0",
      inclusionCriteria: [],
    },

    addCharacteristics: () =>
      set((state) => {
        const selectedItems = useCheckedItemsStore.getState().selectedItems;
        const context = getContext();
        const itemsWithContext = Object.values(selectedItems).map((item) => ({
          id: item.id,
          termCodes: item.termCodes,
          context,
        }));
        itemsWithContext.forEach((item: QueryCriterion) => {
          state.characteristics.inclusionCriteria?.push([item]);
        });
      }),

    deleteCharacteristic: (id: string) =>
      set((state) => {
        state.characteristics.inclusionCriteria =
          state.characteristics.inclusionCriteria?.map((inner) =>
            inner.filter((characteristic) => characteristic.id !== id)
          );
      }),

    updateFilterValue: () =>
      set(() => {
        const selectedItems = useCheckedItemsStore.getState().selectedItems;
        return { characteristics: Object.values(selectedItems) };
      }),
  }))
);
