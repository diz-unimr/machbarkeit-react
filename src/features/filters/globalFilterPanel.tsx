/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import Card from "@components/ui/Card";
import TimeRangeOption from "./controls/TimeRangeOption";
import { ArrowButton } from "@components/ui/buttons/ArrowButton";
import { useState } from "react";
import { useGlobalFilterStore } from "@app/store/selectedCriteria/global-filter-store";
import { useFilterValidationStore } from "@app/store/filter-validation-store";
import type { TimeRangeType } from "./controls/type";
import { Button } from "@components/ui/buttons/Button";
import formatTimeRangeLabel from "@app/utils/formatTimeRangeLabel";

export type GlobalFilterName = "timeRange" | "caseType";

type GlobalFilterPanelProps = {
  // onSetValidity: (data: { id: string; isValid: boolean }) => void;
  onHandleGlobalFilterChange: (
    filterName: GlobalFilterName,
    value: string | (TimeRangeType["timeRestriction"] | null),
    completeFilter?: boolean
  ) => void;
};

export default function GlobalFilterPanel({
  // onSetValidity,
  onHandleGlobalFilterChange,
}: GlobalFilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const { globalFilter } = useGlobalFilterStore();
  const [isGlobalFilterEditing, setIsGlobalFilterEditing] =
    useState<boolean>(false);
  const [isFilterComplete, setIsFilterCompleted] = useState<boolean>(true);
  const handleGlobalTimeRangeChange = (timeRange: {
    filterValue: TimeRangeType["timeRestriction"] | null;
  }) => {
    onHandleGlobalFilterChange("timeRange", timeRange.filterValue);
  };
  const updateValidityItem = useFilterValidationStore(
    (s) => s.updateValidityItem
  );

  return (
    <div
      style={{
        borderBottom: !isExpanded
          ? "1.5px solid var(--color-border)"
          : undefined,
      }}
    >
      <div className="flex justify-between">
        <p className="text-lg font-medium p-2">Global Filter</p>
        <ArrowButton
          id="global-filter-btn"
          mode="rotate-left"
          width="28"
          isExpanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      {isExpanded && (
        <Card>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <p className="mt-2 mr-2 text-end font-medium whitespace-nowrap">
                Globaler Zeitraum :
              </p>
              {isGlobalFilterEditing ? (
                <div className="flex flex-col overflow-x-auto">
                  <TimeRangeOption
                    timeRestrictionData={globalFilter.timeRange} //data from file just on first time
                    onValidityChange={(isValid) => {
                      setIsFilterCompleted(isValid);
                      updateValidityItem({
                        id: "global-time-range",
                        isValid,
                      });
                    }}
                    onCompleteChange={handleGlobalTimeRangeChange}
                  />
                  <Button
                    id={"global-btn"}
                    label="Globaler Filter bestätigen"
                    type="tertiary"
                    className="!m-0 !mt-2 text-white bg-[var(--btn-bg)] hover:text-[#213547]"
                    isActive={isFilterComplete}
                    onClick={() => {
                      setIsGlobalFilterEditing((prev) => !prev);
                    }}
                  />
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="mt-2">
                    {formatTimeRangeLabel(globalFilter.timeRange)}
                  </div>
                  <Button
                    id={"global-btn"}
                    label="Globaler Filter bearbeiten"
                    type="tertiary"
                    className="!m-0 !mt-2"
                    onClick={() => {
                      setIsGlobalFilterEditing((prev) => !prev);
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-5">
              <p className="font-medium whitespace-nowrap">Fallart :</p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="all"
                  value="all"
                  checked={true}
                  onChange={() => {}}
                />
                Kein Filter
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="inpatient"
                  value="inpatient"
                  checked={false}
                  onChange={() => {}}
                />
                Stationär
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="outpatient"
                  value="outpatient"
                  checked={false}
                  onChange={() => {}}
                />
                Ambulant
              </label>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
