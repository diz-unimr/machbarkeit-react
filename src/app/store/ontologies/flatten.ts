/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion } from "@app/types/ontologyType";

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
