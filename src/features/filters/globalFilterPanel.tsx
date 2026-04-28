/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import Card from "@components/ui/Card";
import TimeRangeOption from "./controls/TimeRangeOption";
// import ArrowButton from "@components/ui/buttons/ArrowButton";
// import warningIcon from "@assets/warning-icon.svg";
import { useState } from "react";
import useGlobalFilterStore from "@/app/store/global-filter-store";
import type { TimeRangeType } from "./controls/type";
import { Button } from "@components/ui/buttons/Button";
import formatTimeRangeLabel from "@app/utils/formatTimeRangeLabel";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";

export type GlobalFilterName = "timeRange" | "caseType";
export type globalFilterWarning = {
  filterName: GlobalFilterName;
  value: TimeRangeType["timeRestriction"] | null;
  hasLocalFilter: boolean;
  isDeleteAction: boolean;
};
type GlobalFilterPanelProps = {
  onHandleWarning: (warning: globalFilterWarning) => void;
};

const GlobalFilterPanel = ({ onHandleWarning }: GlobalFilterPanelProps) => {
  // const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const globalFilter = useGlobalFilterStore((s) => s.globalFilter);
  const startEditing = useGlobalFilterStore((s) => s.startEditing);
  const stopEditing = useGlobalFilterStore((s) => s.stopEditing);
  const updateGlobalFilter = useGlobalFilterStore((s) => s.updateGlobalFilter);
  const [globalFilterTemp, setGlobalFilterTemp] = useState<
    TimeRangeType["timeRestriction"] | null
  >(null);
  const [isFilterComplete, setIsFilterCompleted] = useState<boolean>(true);

  const selectedInclusionCriteria = useSelectedCriteriaStore(
    (s) => s.selectedInclusionCriteria,
  );

  const cancelFilterChanges = () => {
    updateGlobalFilter("timeRange", globalFilter.timeRange ?? null);
    stopEditing();
  };

  const checkTimeRangeConflicts = (): boolean => {
    const criteria = selectedInclusionCriteria.criteria;
    const hasAnyLocal = criteria.some(
      (c) =>
        (c.criterion.timeRestrictionAllowed &&
          c.criterion.isLocalFilter === true) ||
        c.isEditing === true,
    );
    return hasAnyLocal;
  };

  const handleGlobalFilterChange = (
    filterName: GlobalFilterName,
    value: TimeRangeType["timeRestriction"] | null,
  ) => {
    if (selectedInclusionCriteria.criteria.length === 0) {
      updateGlobalFilter(filterName, value);
      stopEditing();
      return;
    }

    const hasLocalFilter = checkTimeRangeConflicts();

    onHandleWarning({
      filterName,
      value,
      hasLocalFilter,
      isDeleteAction: false,
    });
  };

  return (
    <Card className="py-3">
      <div className="flex gap-3">
        <p className="mr-2 text-end font-medium whitespace-nowrap">
          Globaler Zeitraum :
        </p>
        <div className="flex flex-col min-w-0 flex-1">
          {globalFilter.isEditing ? (
            <TimeRangeOption
              timeRestrictionData={globalFilter.timeRange} //data from file just on first time
              onValidityChange={(isValid) => {
                setIsFilterCompleted(isValid);
              }}
              onCompleteChange={(timeRange) =>
                setGlobalFilterTemp({
                  ...timeRange,
                })
              }
            />
          ) : (
            <div className="pl-1">
              {formatTimeRangeLabel(globalFilter.timeRange ?? null)}
            </div>
          )}

          <div className="flex gap-10 pl-0.5">
            {(globalFilter.isEditing || globalFilter.timeRange) && (
              <Button
                id={"clear-filter-btn"}
                label="Löschen"
                type="tertiary"
                onClick={() => {
                  onHandleWarning({
                    filterName: "timeRange",
                    value: null,
                    hasLocalFilter: false,
                    isDeleteAction: true,
                  });
                }}
              />
            )}
            {globalFilter.isEditing ? (
              <div className="flex gap-2">
                <Button
                  id={"global-btn"}
                  label="Abbrechen"
                  type="tertiary"
                  onClick={cancelFilterChanges}
                />
                <Button
                  id={"global-btn"}
                  label="Bestätigen"
                  type="tertiary"
                  isActive={isFilterComplete}
                  onClick={() => {
                    handleGlobalFilterChange("timeRange", globalFilterTemp);
                  }}
                />
              </div>
            ) : (
              <Button
                id={"global-btn"}
                label={globalFilter.timeRange ? "Bearbeiten" : "Filter setzen"}
                type="tertiary"
                onClick={() => {
                  startEditing();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  /* return (
    <div
      style={{
        borderBottom: !isExpanded
          ? "1.5px solid var(--color-border)"
          : undefined,
      }}
    >
      <div className="flex justify-between p-2">
        <div className="flex gap-3">
          <p className="text-lg font-medium">Globaler Filter</p>
          {!isExpanded && globalFilter.isEditing && (
            <div className="flex gap-2 items-center p-1">
              <img src={warningIcon} className="inline w-4 mr-1" />
              <p className="text-sm text-[#804909]">
                Bitte bestätigen Sie den Filter
              </p>
            </div>
          )}
        </div>

        <ArrowButton
          id="global-filter-btn"
          mode="rotate-left"
          isExpanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      {isExpanded && (
        <Card>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <p className="mr-2 text-end font-medium whitespace-nowrap">
                Globaler Zeitraum :
              </p>
              <div className="flex flex-col">
                {globalFilter.isEditing ? (
                  <TimeRangeOption
                    timeRestrictionData={globalFilter.timeRange} //data from file just on first time
                    onValidityChange={(isValid) => {
                      setIsFilterCompleted(isValid);
                    }}
                    onCompleteChange={(timeRange) =>
                      setGlobalFilterTemp({
                        ...timeRange,
                      })
                    }
                  />
                ) : (
                  <div className="pl-1">
                    {formatTimeRangeLabel(globalFilter.timeRange ?? null)}
                  </div>
                )}

                <div className="flex gap-10 pl-0.5">
                  {(globalFilter.isEditing || globalFilter.timeRange) && (
                    <Button
                      id={"clear-filter-btn"}
                      label="Löschen"
                      type="tertiary"
                      onClick={() => {
                        onHandleWarning({
                          filterName: "timeRange",
                          value: null,
                          hasLocalFilter: false,
                          isDeleteAction: true,
                        });
                      }}
                    />
                  )}
                  {globalFilter.isEditing ? (
                    <div className="flex gap-2">
                      <Button
                        id={"global-btn"}
                        label="Abbrechen"
                        type="tertiary"
                        onClick={cancelFilterChanges}
                      />
                      <Button
                        id={"global-btn"}
                        label="Bestätigen"
                        type="tertiary"
                        isActive={isFilterComplete}
                        onClick={() => {
                          handleGlobalFilterChange(
                            "timeRange",
                            globalFilterTemp,
                          );
                        }}
                      />
                    </div>
                  ) : (
                    <Button
                      id={"global-btn"}
                      label={
                        globalFilter.timeRange ? "Bearbeiten" : "Filter setzen"
                      }
                      type="tertiary"
                      onClick={() => {
                        startEditing();
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <p className="font-medium whitespace-nowrap">Fallart :</p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="no filter"
                  value="no filter"
                  checked={globalFilter.caseType === "no filter"}
                  onChange={() => updateGlobalFilter("caseType", "no filter")}
                />
                Kein Filter
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="inpatient"
                  value="inpatient"
                  checked={globalFilter.caseType === "imp"}
                  onChange={() => updateGlobalFilter("caseType", "imp")}
                />
                Stationär
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="outpatient"
                  value="outpatient"
                  checked={globalFilter.caseType === "amb"}
                  onChange={() => updateGlobalFilter("caseType", "amb")}
                />
                Ambulant
              </label>
            </div>
          </div>
        </Card>
      )}
    </div>
  ); */
};

export default GlobalFilterPanel;
