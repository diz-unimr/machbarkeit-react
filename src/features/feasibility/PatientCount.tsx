/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { resultTexts } from "@/app/constants/uiTexts";
import { useFeasibilityQuery } from "@/app/hooks/useFeasibilityQuery";
import loadingSpinnerIcon from "@assets/loading_spinner.svg";

const PatientCount = () => {
  const { isQueryRunning, queryResult, errorMessageResult } =
    useFeasibilityQuery();

  return (
    <div className="flex flex-col h-12.5 items-center px-3">
      <span className="font-medium mr-2">{resultTexts.patientCount}</span>
      <span className="font-bold text-2xl">
        {isQueryRunning && <img src={loadingSpinnerIcon} />}
        {!isQueryRunning &&
          (queryResult !== null
            ? /* queryResult <= 3
                  ? resultTexts.insufficientResult
                  :  */ queryResult
            : errorMessageResult || "-")}
      </span>
    </div>
  );
};

export default PatientCount;
