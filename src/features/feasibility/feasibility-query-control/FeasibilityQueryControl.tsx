/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useRef, useState } from "react";
import { Button } from "@components/ui/buttons/Button";
import ButtonContainer from "@components/ui/buttons/ฺButtonContainer";
import type { FeasibilityQueryData } from "@features/feasibility/feasibility-builder/type";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import useFeasibilityQueryStore from "@/app/store/feasibility-query-store";
import feasibilityQuery from "@app/services/feasibility-service";
import loadingSpinnerIcon from "@assets/loading_spinner.svg";
import useGlobalFilterStore from "@/app/store/global-filter-store";
import { AxiosError } from "axios";

const FeasibilityQueryControl = ({
  completedFilter,
  createQueryData,
  onResetAllData,
}: {
  completedFilter: boolean;
  createQueryData: () => FeasibilityQueryData | null;
  onResetAllData: () => void;
}) => {
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
  const selectedInclusionCriteria = useSelectedCriteriaStore(
    (s) => s.selectedInclusionCriteria,
  );
  const clearSelectedCriteria = useSelectedCriteriaStore(
    (s) => s.clearSelectedCriteria,
  );
  const globalFilter = useGlobalFilterStore((s) => s.globalFilter);

  const clearRunningQuery = () => {
    abortController.current?.abort();
    abortController.current = null;
    stopQueryRunning();
    setQueryResult(null);
    setErrorMessageResult(null);
  };

  const toggleQuery = async () => {
    if (isQueryRunning) {
      // Stop Query
      clearRunningQuery();
      return;
    }
    // Start Query
    const queryData = createQueryData();
    if (!queryData) return;
    startQueryRunning();

    // abort old controller
    abortController.current?.abort();
    // create new controller
    const controller = new AbortController();
    abortController.current = controller;

    try {
      const [numberOfPatients, errorMessage] = await feasibilityQuery(
        queryData,
        controller,
      );

      setQueryResult(numberOfPatients);
      setErrorMessageResult(errorMessage);
    } catch (error) {
      if ((error as AxiosError).name !== "AbortError") {
        setErrorMessageResult("Unexpected error");
      }
    } finally {
      stopQueryRunning();
    }
  };

  const resetAllData = () => {
    abortController.current?.abort();
    abortController.current = null;
    clearSelectedCriteria();
    stopQueryRunning();
    setQueryResult(null);
    setErrorMessageResult(null);
    onResetAllData();
  };

  const isResetActived =
    selectedInclusionCriteria.criteria.length > 0 ||
    !!globalFilter.timeRange ||
    globalFilter.isEditing ||
    globalFilter.caseType !== null;

  useEffect(() => {
    clearRunningQuery();
  }, [selectedInclusionCriteria, globalFilter]);

  return (
    <div className="flex h-15 bg-white border-b-[1.5px] border-(--color-border)">
      <div className="flex w-full max-w-240 justify-between m-auto px-8">
        <div className="flex w-full h-12.5 items-center px-2">
          <span className="font-medium mr-2">Anzahl der Patienten: </span>
          <span>
            {isQueryRunning && <img src={loadingSpinnerIcon} />}
            {!isQueryRunning &&
              (queryResult !== null
                ? queryResult <= 3
                  ? "Das Ergebnis ist zu klein"
                  : queryResult
                : errorMessageResult || "-")}
          </span>
        </div>
        <ButtonContainer className="p-0">
          {/* Warning Modal */}
          <Button
            id="reset-query"
            type="secondary"
            label="ZURÜCKSETZEN"
            className="text-black"
            isActive={isResetActived}
            onClick={resetAllData}
          />
          <Button
            id="start-query"
            type="primary"
            label={!isQueryRunning ? "ABFRAGE STARTEN" : "ABFRAGE STOPPEN"}
            isActive={completedFilter}
            onClick={toggleQuery}
          />
        </ButtonContainer>
      </div>
    </div>
  );
};

export default FeasibilityQueryControl;
