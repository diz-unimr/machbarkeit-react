/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion } from "@app/types/ontologyType";
import { getModuleName } from "@app/utils/moduleUtils";

const sortLaboruntersuchung = (
  selectableCodes: Criterion[],
  nonSelectableCodes: Criterion[],
) => {
  let mergedLabCodes: Criterion[] = [];

  nonSelectableCodes.sort((a, b) => {
    if (a.display === "Sonstiges") return 1;
    if (b.display === "Sonstiges") return -1;
    return a.display.localeCompare(b.display);
  });

  selectableCodes.sort((a, b) =>
    (a.termCodes?.[0]?.code ?? "").localeCompare(b.termCodes?.[0]?.code ?? ""),
  );
  mergedLabCodes = [...nonSelectableCodes, ...selectableCodes];
  return mergedLabCodes;
};

const sortOntologyTree = (
  ontologyTree: Criterion[],
): Criterion[] | undefined => {
  if (!ontologyTree) return ontologyTree;

  const moduleName = getModuleName(ontologyTree[0].moduleId);
  const items = [...ontologyTree];
  const nonSelectable = items.filter((i) => !i.selectable);
  const selectable = items.filter((i) => i.selectable);

  let mergedLabCodes: Criterion[] = [];

  if (moduleName === "Laboruntersuchung") {
    mergedLabCodes = sortLaboruntersuchung(selectable, nonSelectable);
  } else {
    nonSelectable.sort((a, b) => a.display.localeCompare(b.display));
    selectable.sort((a, b) =>
      (a.termCodes?.[0]?.code ?? "").localeCompare(
        b.termCodes?.[0]?.code ?? "",
      ),
    );
    mergedLabCodes = [...nonSelectable, ...selectable];
  }

  // Recursively sort
  return mergedLabCodes.map((node) => ({
    ...node,
    children: node.children?.length
      ? sortOntologyTree(node.children)
      : node.children,
  }));
};

export default sortOntologyTree;
