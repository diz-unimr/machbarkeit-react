/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useRef, useState } from "react";
import type { AxiosError } from "axios";
import type { FeasibilityQueryData } from "@/features/feasibility/feasibility-builder/types";
import feasibilityQuery from "../services/feasibility-service";
import useFeasibilityQueryStore from "../store/feasibility-query-store";

export const useFeasibilityQuery = () => {
  const abortController = useRef<AbortController | null>(null);

  const isQueryRunning = useFeasibilityQueryStore((s) => s.isQueryRunning);
  const startQueryRunning = useFeasibilityQueryStore(
    (s) => s.startQueryRunning,
  );
  const stopQueryRunning = useFeasibilityQueryStore((s) => s.stopQueryRunning);

  const [queryResult, setQueryResult] = useState<number | null>(null);
  const [errorMessageResult, setErrorMessageResult] = useState<string | null>(
    null,
  );

  const clearRunningQuery = () => {
    abortController.current?.abort();
    abortController.current = null;
    stopQueryRunning();
    setQueryResult(null);
    setErrorMessageResult(null);
  };

  const stopQuery = () => {
    clearRunningQuery();
  };

  const startQuery = async (queryData: FeasibilityQueryData) => {
    // cancel current request
    abortController.current?.abort();
    // create new controller
    const controller = new AbortController();
    abortController.current = controller;

    startQueryRunning();
    setQueryResult(null);
    setErrorMessageResult(null);

    try {
      const [numberOfPatients, errorMessage] = await feasibilityQuery(
        queryData,
        controller,
      );

      if (controller.signal.aborted) return;

      setQueryResult(numberOfPatients);
      setErrorMessageResult(errorMessage);
    } catch (error) {
      if ((error as AxiosError).name !== "AbortError") {
        setErrorMessageResult("Unexpected error");
      }
    } finally {
      if (abortController.current === controller) {
        abortController.current = null;
        stopQueryRunning();
      }
    }
  };

  return {
    isQueryRunning,
    queryResult,
    errorMessageResult,
    clearRunningQuery,
    startQuery,
    stopQuery,
  };
};
