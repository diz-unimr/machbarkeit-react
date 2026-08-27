/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type { Metadata } from "@app/types/MetadataType";

type MetadataStore = {
  metadata: Metadata[];
  setMetadata: (metadata: Metadata[]) => void;
};

const useMetadataStore = create<MetadataStore>((set) => ({
  metadata: [],
  setMetadata: (item) => set({ metadata: item }),
}));

export default useMetadataStore;
