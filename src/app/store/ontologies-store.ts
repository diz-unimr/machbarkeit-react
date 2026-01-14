/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type { Criterion } from "@app/types/ontologyType";
import sortOntologyTree from "../utils/sortOntologyTree";

type OntologyStore = {
  ontology: Record<string, Criterion[]>;
  setOntology: (ontology: Criterion[]) => void;
};

const useOntologiesStore = create<OntologyStore>((set) => ({
  ontology: {} as Record<string, Criterion[]>,

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
      } else return { ontology: { ...state.ontology } };
    });
  },
}));

export default useOntologiesStore;
