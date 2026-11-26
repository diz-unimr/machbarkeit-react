/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { resultTexts } from "@/app/constants/uiTexts";
import useFeasibilityQueryStore from "@/app/store/feasibility-query-store";
import loadingSpinnerIcon from "@assets/loading_spinner.svg";

const PatientCount = () => {
  const patientCount = useFeasibilityQueryStore((s) => s.patientCount);
  const errorMessageResult = useFeasibilityQueryStore(
    (s) => s.errorMessageResult,
  );
  const isQueryRunning = useFeasibilityQueryStore((s) => s.isQueryRunning);

  return (
    <div className="flex flex-col h-12.5 items-center px-3">
      <span className="font-medium mr-2">{resultTexts.patientCount}</span>
      <span className="font-bold text-2xl">
        {isQueryRunning && <img src={loadingSpinnerIcon} />}
        {!isQueryRunning &&
          (patientCount !== null
            ? /* patientCount <= 3
                  ? resultTexts.insufficientResult
                  :  */ patientCount
            : errorMessageResult || "-")}
      </span>
    </div>
  );
};

export default PatientCount;
