/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */
// eslint-disable react-hooks/exhaustive-deps

import { useEffect, useMemo, useRef, useState } from "react";
import useOntologiesStore from "@/app/store/ontologies-store";
import { getOntology } from "@app/services/ontologyService";
import type { Criterion } from "@app/types/ontologyType";
import useModulesStore from "@app/store/modules-store";
import { setModuleColor, collectMatches } from "./ontologyHelpers";

/* const setModuleColor = (
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

const matchesSearchTerm = (node: Criterion, term: string) => {
  if (!node.selectable) return false;
  const termLower = term.toLowerCase();
  const displayMatch = node.display?.toLowerCase().includes(termLower);
  const codeMatch = node.termCodes?.some((tc) =>
    tc.code?.toLowerCase().includes(termLower),
  );
  return displayMatch || codeMatch;
};

const cloneSubtree = (node: Criterion): Criterion => ({
  ...node,
  children: node.children?.map(cloneSubtree),
});

const collectMatches = (nodes: Criterion[], term: string): Criterion[] => {
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
}; */

const useOntologies = (
  moduleId: string | null,
  textSearch?: string,
  // activeLabTab?: string,
): {
  ontologyResult: { criteria: Criterion[] | null; status?: number };
  isLoading: boolean;
} => {
  const fetchController = useRef<AbortController | null>(null);
  const { ontology, setOntology } = useOntologiesStore();
  const { modules } = useModulesStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!moduleId) {
      setIsLoading(false);
      return;
    }

    if (ontology[moduleId]) {
      setIsLoading(false);
      return;
    }
    // delete old request if any
    fetchController.current?.abort();
    //create new abort controller for this request
    const controller = new AbortController();
    fetchController.current = controller;

    setIsLoading(true);

    const fetchOntology = async () => {
      try {
        const [data, _status] = await getOntology(
          moduleId,
          controller.signal,
          //activeLabTab,
        );
        if (controller.signal.aborted) return;
        if (data) {
          setModuleColor(data, modules.find((m) => m.id === moduleId)?.color);
          setOntology(data);
        }
      } catch {
        // ignore error, state remains null until fetch succeeds
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };
    fetchOntology();

    return () => controller.abort();
  }, [moduleId, moduleId ? ontology[moduleId] : null, modules]);

  const memoizedResult = useMemo(() => {
    if (!moduleId) {
      return { criteria: null };
    }

    const term = textSearch ? textSearch.trim() : "";
    if (term.length === 1) {
      return { criteria: null, status: 400 };
    }

    const baseTree = ontology[moduleId];
    const status = baseTree ? 200 : undefined;

    if (!baseTree) {
      return { criteria: null, status };
    }

    if (!term) {
      return { criteria: baseTree, status };
    }
    const matchedNodes = collectMatches(baseTree, term);

    return { criteria: matchedNodes, status };
  }, [moduleId, textSearch, moduleId ? ontology[moduleId] : null]);

  return { ontologyResult: memoizedResult, isLoading };
};

export default useOntologies;
