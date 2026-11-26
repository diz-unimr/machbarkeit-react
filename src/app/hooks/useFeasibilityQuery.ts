/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useRef } from "react";
import type { AxiosError } from "axios";
import type { FeasibilityQueryData } from "@/features/feasibility/feasibility-builder/types";
import feasibilityQuery from "../services/feasibility-service";
import useFeasibilityQueryStore from "../store/feasibility-query-store";

export const useFeasibilityQuery = () => {
  const abortController = useRef<AbortController | null>(null);

  const startQueryRunning = useFeasibilityQueryStore(
    (s) => s.startQueryRunning,
  );
  const stopQueryRunning = useFeasibilityQueryStore((s) => s.stopQueryRunning);
  const setPatientCount = useFeasibilityQueryStore(
    (s) => s.setPatientCount,
  );
  const setErrorMessageResult = useFeasibilityQueryStore(
    (s) => s.setErrorMessageResult,
  );


  const clearRunningQuery = () => {
    abortController.current?.abort();
    abortController.current = null;
    stopQueryRunning();
    setPatientCount(null);
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
    setPatientCount(null);
    setErrorMessageResult(null);

    try {
      const [numberOfPatients, errorMessage] = await feasibilityQuery(
        queryData,
        controller,
      );

      if (controller.signal.aborted) return;

      setPatientCount(numberOfPatients)
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
    clearRunningQuery,
    startQuery,
    stopQuery,
  };
};
