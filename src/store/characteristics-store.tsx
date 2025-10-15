/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import { useCheckedItemsStore } from "./checked-items-store";
import { useModulesStore } from "./modules-store";
import type { Criterion, Module } from "../features/ontology/type";

enableMapSet();

type Store = {
  characteristics: Array<Criterion>;
  addCharacteristics: () => void;
  deleteCharacteristic: (item: Criterion) => void;
  updateFilterValue: () => void;
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
    characteristics: [] as Array<Criterion>,

    addCharacteristics: () =>
      set((state) => {
        const selectedItems = useCheckedItemsStore.getState().selectedItems;
        const context = getContext();
        const itemsWithContext = Object.values(selectedItems).map((item) => ({
          ...item,
          context,
        }));
        return {
          characteristics: [...state.characteristics, ...itemsWithContext],
        };
      }),
    deleteCharacteristic: (item: Criterion) =>
      set((state) => ({
        characteristics: state.characteristics.filter(
          (characteristic) => characteristic.id !== item.id
        ),
      })),
    updateFilterValue: () =>
      set(() => {
        const selectedItems = useCheckedItemsStore.getState().selectedItems;
        console.log(selectedItems);
        return { characteristics: Object.values(selectedItems) };
      }),
  }))
);
