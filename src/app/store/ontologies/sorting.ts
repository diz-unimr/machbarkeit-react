/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion } from "@app/types/ontologyType";
import { getModuleName } from "@app/utils/moduleUtils";

export const sortOntologyTree = (
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

const sortLaboruntersuchung = (
  selectable: Criterion[],
  nonSelectable: Criterion[]
) => {
  let merged: Criterion[] = [];

  /* const loinc = selectable.filter((i) =>
    i.termCodes?.some((c) => c.system === "http://loinc.org")
  ); */
  const swisslab = selectable.filter((i) =>
    i.termCodes?.every(
      (c) =>
        c.system === "https://fhir.diz.uni-marburg.de/CodeSystem/swisslab-code"
    )
  );

  /* loinc.sort((a, b) =>
    (a.termCodes?.[1]?.code ?? "").localeCompare(b.termCodes?.[1]?.code ?? "")
  ); */
  swisslab.sort((a, b) =>
    (a.termCodes?.[0]?.code ?? "").localeCompare(b.termCodes?.[0]?.code ?? "")
  );

  // merged = [...nonSelectable, ...loinc, ...swisslab];
  merged = [...nonSelectable, ...swisslab];
  return merged;
};
