/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type { Metadata } from "@/app/types/MetadataType";

type MetadataStore = {
  metadata: Metadata[];
  selectedMetadata: Metadata[];

  setMetadata: (metadata: Metadata[]) => void;
  toggleSelectedMetadata: (item: Metadata) => void;
};

const useMetadataStore = create<MetadataStore>((set) => ({
  metadata: [],
  selectedMetadata: [],

  setMetadata: (items) => set({ metadata: items }),

  toggleSelectedMetadata: (item) =>
    set((state) => {
      const exists = state.selectedMetadata.some(
        (selected) =>
          selected.attributeName === item.attributeName &&
          selected.kdsModule === item.kdsModule,
      );
      return {
        selectedMetadata: exists
          ? state.selectedMetadata.filter(
              (selected) =>
                selected.attributeName !== item.attributeName ||
                selected.kdsModule !== item.kdsModule,
            )
          : [...state.selectedMetadata, item],
      };
    }),
}));

export default useMetadataStore;
