/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";

type ValidityItem = {
  id: string;
  isValid: boolean;
};

type FilterValidationStore = {
  validityItems: ValidityItem[];
  updateValidityItem: (item: ValidityItem) => void;
  deleteItem: (id: string) => void;
};

const useFilterValidationStore = create<FilterValidationStore>((set) => ({
  validityItems: [],
  updateValidityItem: (newItem) => {
    set((state) => ({
      validityItems: state.validityItems.some((item) => item.id === newItem.id)
        ? state.validityItems.map((i) => (i.id === newItem.id ? newItem : i))
        : [...state.validityItems, newItem],
    }));
  },
  deleteItem: (id) => {
    set((state) => ({
      validityItems: state.validityItems.filter((item) => item.id !== id),
    }));
  },
}));

export default useFilterValidationStore;
