/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect } from "react";
import { Button } from "@components/ui/buttons/Button";
import ButtonContainer from "@components/ui/buttons/ฺButtonContainer";
import type {
  FeasibilityQueryData,
  SelectedCriteria,
} from "@/features/feasibility/feasibility-builder/types";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import loadingSpinnerIcon from "@assets/loading_spinner.svg";
import useGlobalFilterStore from "@/app/store/filter-store";
import { buttonLabels, resultTexts } from "@/app/constants/uiTexts";
import { useFeasibilityQuery } from "@/app/hooks/useFeasibilityQuery";

const FeasibilityQueryControl = ({
  completedFilter,
  createQueryData,
  onResetAllData,
}: {
  completedFilter: boolean;
  createQueryData: (
    selectedCriteria: SelectedCriteria,
  ) => FeasibilityQueryData | null;
  onResetAllData: () => void;
}) => {
  const {
    isQueryRunning,
    queryResult,
    errorMessageResult,
    clearRunningQuery,
    startQuery,
    stopQuery,
  } = useFeasibilityQuery();

  const selectedInclusionCriteria = useSelectedCriteriaStore(
    (s) => s.selectedInclusionCriteria,
  );
  const clearSelectedCriteria = useSelectedCriteriaStore(
    (s) => s.clearSelectedCriteria,
  );
  const globalFilter = useGlobalFilterStore((s) => s.globalFilter);

  const toggleQuery = async () => {
    if (isQueryRunning) {
      // Stop Query
      stopQuery();
      return;
    }
    // Start Query
    const queryData = createQueryData(selectedInclusionCriteria);
    if (!queryData) return;
    startQuery(queryData);
  };

  const resetAllData = () => {
    clearRunningQuery();
    clearSelectedCriteria();
    onResetAllData();
  };

  const isResetActived =
    selectedInclusionCriteria.criteria.length > 0 ||
    !!globalFilter.timeRestriction;

  useEffect(() => {
    clearRunningQuery();
  }, []);

  return (
    <div className="flex h-15 bg-white border-b-[1.5px] border-(--color-border)">
      <div className="flex w-full max-w-240 justify-between m-auto px-8">
        <div className="flex w-full h-12.5 items-center px-2">
          <span className="font-medium mr-2">{resultTexts.patientCount}</span>
          <span>
            {isQueryRunning && <img src={loadingSpinnerIcon} />}
            {!isQueryRunning &&
              (queryResult !== null
                ? /* queryResult <= 3
                  ? resultTexts.insufficientResult
                  :  */ queryResult
                : errorMessageResult || "-")}
          </span>
        </div>
        <ButtonContainer className="p-0">
          {/* Warning Modal */}
          <Button
            id="reset-query"
            type="secondary"
            label={buttonLabels.reset.toLocaleUpperCase("de-DE")}
            className="text-black"
            isActive={isResetActived}
            onClick={resetAllData}
          />
          <Button
            id="start-query"
            type="primary"
            label={
              !isQueryRunning ? buttonLabels.startQuery : buttonLabels.stopQuery
            }
            isActive={completedFilter}
            onClick={toggleQuery}
          />
        </ButtonContainer>
      </div>
    </div>
  );
};

export default FeasibilityQueryControl;
