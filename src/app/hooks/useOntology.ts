/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useRef, useState } from "react";
import { useOntologiesStore } from "@app/store/ontologies/ontologies-store";
import getOntology from "@app/services/ontologyService";

export default function useOntology(moduleId: string | null) {
  const currentAbortController = useRef<AbortController | null>(null);
  const { ontology, setOntology } = useOntologiesStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!moduleId) return;

    // abort current request
    currentAbortController.current?.abort();
    // create new request
    currentAbortController.current = new AbortController();
    setIsLoading(true);
    const fetchOntology = async () => {
      const [data] = await getOntology(moduleId);
      if (data) setOntology(data);
      setIsLoading(false);
    };
    fetchOntology();
  }, [moduleId]);

  return { ontology, isLoading };
}
