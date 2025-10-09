/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type { Criterion } from "../features/ontology/type";

type OntologyStore = {
  ontology: Record<string, Criterion[]>;
  flattenCriterion: Record<string, Record<string, Criterion>>;
  setOntology: (ontology: Criterion[]) => void;
  setTree: (tree: Criterion[]) => void;
};

export const useOntologyStore = create<OntologyStore>((set, get) => ({
  ontology: {} as Record<string, Criterion[]>,
  flattenCriterion: {} as Record<string, Record<string, Criterion>>,

  setOntology: (item) =>
    set((state) => ({
      ontology: {
        ...state.ontology,
        [item[0].moduleId]: item,
      },
    })),
  setTree: (tree) => {
    const currentFlattenCriterion = get().flattenCriterion;
    const modules = Object.keys(currentFlattenCriterion);
    console.log("modules.length: ", modules.length);
    if (modules.length >= 3) delete currentFlattenCriterion[modules[0]];
    const newFlattenCriterion = flattenTree(currentFlattenCriterion, tree);
    set({ flattenCriterion: newFlattenCriterion });
  },
}));

export const flattenTree = (
  currentMap: Record<string, Record<string, Criterion>>,
  tree: Criterion[]
): Record<string, Record<string, Criterion>> => {
  const walk = (node: Criterion) => {
    if (!currentMap[node.moduleId]) {
      currentMap[node.moduleId] = {};
    }
    currentMap[node.moduleId][node.id] = {
      ...node,
      childrenIds: node.children?.map((c) => c.id) ?? [],
    };
    node.children?.forEach(walk);
  };
  tree.forEach(walk);
  return currentMap;
};
