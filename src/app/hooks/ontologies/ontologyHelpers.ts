/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion, ModuleColorProps } from "@app/types/ontologyType";

const matchesSearchTerm = (node: Criterion, term: string) => {
  if (!node.selectable) return false;
  const termLower = term.toLowerCase();
  const displayMatch = node.display?.toLowerCase().includes(termLower);
  const codeMatch = node.termCodes?.some((tc) =>
    tc.code?.toLowerCase().includes(termLower),
  );
  return displayMatch || codeMatch;
};

export const setModuleColor = (
  nodes: Criterion[],
  color: ModuleColorProps | undefined,
) => {
  nodes.forEach((node) => {
    node.color = color;
    if (node.children && node.children.length > 0) {
      setModuleColor(node.children, color);
    }
  });
};

export const cloneSubtree = (node: Criterion): Criterion => ({
  ...node,
  children: node.children?.map(cloneSubtree),
});

export const collectMatches = (
  nodes: Criterion[],
  term: string,
): Criterion[] => {
  const results: Criterion[] = [];

  const traverse = (node: Criterion) => {
    if (matchesSearchTerm(node, term)) {
      results.push(cloneSubtree(node));
      return; // avoid duplicate copies of descendants
    }

    node.children?.forEach(traverse);
  };

  nodes.forEach(traverse);
  return results;
};
