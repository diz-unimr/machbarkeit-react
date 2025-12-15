/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type { Module } from "@app/types/ontologyType";

type ModulesStore = {
  modules: Module[];
  setModules: (modules: Module[]) => void;
};

export const useModulesStore = create<ModulesStore>((set) => ({
  modules: [],
  setModules: (item) => set({ modules: item }),
}));
