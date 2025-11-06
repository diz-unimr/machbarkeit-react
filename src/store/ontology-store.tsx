/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type { Criterion } from "../features/ontology/type";
import { getModuleName } from "../utils/utilities";
type OntologyStore = {
  ontology: Record<string, Criterion[]>;
  flattenCriterion: Record<string, Record<string, Criterion>>;
  setOntology: (ontology: Criterion[]) => void;
  setFlattenCriterion: (tree: Criterion[]) => void;
};

/* const sortOntologyTree = (
  ontologyTree: Criterion[],
  isFirstParent: boolean = false
): Criterion[] | undefined => {
  if (ontologyTree) {
    if (isFirstParent)
      ontologyTree.sort((a, b) => a.display.localeCompare(b.display));
    else
      ontologyTree.sort((a, b) =>
        a.termCodes[0].code.localeCompare(b.termCodes[0].code)
      );
    ontologyTree.forEach((node) => {
      if (node.children && node.children.length > 0) {
        sortOntologyTree(node.children);
      }
    });
    return ontologyTree;
  }
}; */

const sortLaboruntersuchung = (
  selectable: Criterion[],
  nonSelectable: Criterion[]
) => {
  let merged: Criterion[] = [];

  const loinc = selectable.filter((i) =>
    i.termCodes?.some((c) => c.system === "http://loinc.org")
  );
  const swisslab = selectable.filter((i) =>
    i.termCodes?.every(
      (c) =>
        c.system === "https://fhir.diz.uni-marburg.de/CodeSystem/swisslab-code"
    )
  );

  loinc.sort((a, b) =>
    (a.termCodes?.[1]?.code ?? "").localeCompare(b.termCodes?.[1]?.code ?? "")
  );
  swisslab.sort((a, b) =>
    (a.termCodes?.[0]?.code ?? "").localeCompare(b.termCodes?.[0]?.code ?? "")
  );

  merged = [...nonSelectable, ...loinc, ...swisslab];
  return merged;
};

const sortOntologyTree = (
  ontologyTree: Criterion[]
): Criterion[] | undefined => {
  if (!ontologyTree) return ontologyTree;
  const moduleName = getModuleName(ontologyTree[0].moduleId);

  const items = [...ontologyTree];
  const nonSelectable = items.filter((i) => !i.selectable);
  const selectable = items.filter((i) => i.selectable);

  let merged: Criterion[] = [];

  if (moduleName === "Laboruntersuchung") {
    merged = sortLaboruntersuchung(selectable, nonSelectable);
  } else {
    nonSelectable.sort((a, b) => a.display.localeCompare(b.display));
    selectable.sort((a, b) =>
      (a.termCodes?.[0]?.code ?? "").localeCompare(b.termCodes?.[0]?.code ?? "")
    );
    merged = [...nonSelectable, ...selectable];
  }

  // Recursively sort
  return merged.map((node) => ({
    ...node,
    children: node.children?.length
      ? sortOntologyTree(node.children)
      : node.children,
  }));
};

const flattenTree = (
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

export const useOntologyStore = create<OntologyStore>((set, get) => ({
  ontology: {} as Record<string, Criterion[]>,
  flattenCriterion: {} as Record<string, Record<string, Criterion>>,

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
    const currentFlattenCriterion = get().flattenCriterion;
    const modules = Object.keys(currentFlattenCriterion);
    if (modules.length >= 3) delete currentFlattenCriterion[modules[0]];
    const newFlattenCriterion = flattenTree(currentFlattenCriterion, tree);
    set({ flattenCriterion: newFlattenCriterion });
  },
}));
