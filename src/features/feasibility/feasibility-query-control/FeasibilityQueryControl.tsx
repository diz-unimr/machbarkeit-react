/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button } from "@components/ui/buttons/Button";
import ButtonContainer from "@components/ui/buttons/ฺButtonContainer";
import type { FeasibilityQueryData } from "@features/feasibility/feasibility-builder/type";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import { useState } from "react";
import feasibilityQuery from "@app/services/feasibility-service";
import loadingSpinnerIcon from "@assets/loading_spinner.svg";

const FeasibilityQueryControl = ({
  completeFilter,
  createQueryData,
}: {
  completeFilter: boolean;
  createQueryData: () => FeasibilityQueryData | null;
}) => {
  const [abortController, setAbortController] =
    useState<AbortController | null>(new AbortController());
  const [isQueryRunning, setIsQueryRunning] = useState<boolean>(false);
  const [queryResult, setQueryResult] = useState<number | null>(null);
  const [errorMessageResult, setErrorMessageResult] = useState<string | null>(
    null
  );
  const { selectedInclusionCriteria } = useSelectedCriteriaStore();

  const startQuery = async () => {
    setIsQueryRunning(true);
    const queryData = createQueryData();

    // Start Query
    if (!queryData) return;
    const [numberOfPatients, errorMessage] = await feasibilityQuery(
      queryData,
      abortController!
    );
    setQueryResult(numberOfPatients);
    setErrorMessageResult(errorMessage);
    setIsQueryRunning(false);
    setAbortController(null);
  };

  return (
    <div className="flex h-[60px] bg-white border-b-[1.5px] border-[var(--color-border)]">
      <div className="flex w-full max-w-[960px] justify-between m-auto px-8">
        <div className="flex w-full h-[50px] items-center px-2">
          <div>
            <span className="font-medium mr-2">Anzahl der Patienten: </span>
            <span>
              {isQueryRunning ? <img src={loadingSpinnerIcon} /> : null}
              {queryResult !== null
                ? queryResult <= 3
                  ? "Das Ergebnis ist zu klein"
                  : queryResult
                : (errorMessageResult ?? "-")}
            </span>
          </div>
        </div>
        <ButtonContainer className="p-0">
          <Button
            id="reset-query"
            type="secondary"
            label="ZURÜCKSETZEN"
            isActive={true}
            onClick={() => {}}
          />
          <Button
            id="start-query"
            type="primary"
            label={!isQueryRunning ? "ABFRAGE STARTEN" : "ABFRAGE STOPPEN"}
            isActive={
              completeFilter && selectedInclusionCriteria.criteria.length > 0
            }
            onClick={startQuery}
          />
        </ButtonContainer>
      </div>
    </div>
  );
};

export default FeasibilityQueryControl;
