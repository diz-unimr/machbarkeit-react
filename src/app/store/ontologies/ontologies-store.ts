/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type { Criterion } from "@app/types/ontology";
import { sortOntologyTree } from "./sorting";
import { flattenTree } from "./flatten";

type OntologyStore = {
  ontology: Record<string, Criterion[]>;
  flattenCriteria: Record<string, Record<string, Criterion>>;
  setOntology: (ontology: Criterion[]) => void;
  setFlattenCriterion: (tree: Criterion[]) => void;
};

export const useOntologiesStore = create<OntologyStore>((set, get) => ({
  ontology: {} as Record<string, Criterion[]>,
  flattenCriteria: {} as Record<string, Record<string, Criterion>>,

  setOntology: (item) => {
    const sortedTree = sortOntologyTree(item);
    set((state) => {
      if (sortedTree) {
        return {
          ontology: {
            ...state.ontology,
            [item[0].moduleId]: sortedTree,
          },
        };
      } else return { ontology: { ...state.ontology } }; // return state;
    });
  },

  setFlattenCriterion: (tree) => {
    console.log("flatten");
    const currentFlattenCriterion = get().flattenCriteria;
    // const modules = Object.keys(currentFlattenCriterion);
    // if (modules.length >= 3) delete currentFlattenCriterion[modules[0]];
    const newFlattenCriterion = flattenTree(currentFlattenCriterion, tree);
    set({ flattenCriteria: newFlattenCriterion });
  },
}));
