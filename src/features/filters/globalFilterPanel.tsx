/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import Card from "@components/ui/Card";
import TimeRangeOption from "./controls/TimeRangeOption";
import ArrowButton from "@components/ui/buttons/ArrowButton";
import { useEffect, useState } from "react";
import useGlobalFilterStore from "@/app/store/global-filter-store";
import useFilterValidationStore from "@app/store/filter-validation-store";
import type { TimeRangeType } from "./controls/type";
import { Button } from "@components/ui/buttons/Button";
import formatTimeRangeLabel from "@app/utils/formatTimeRangeLabel";

export type GlobalFilterName = "timeRange" | "caseType";
export type CaseType = "no filter" | "imp" | "amb";

type GlobalFilterPanelProps = {
  onHandleGlobalFilterChange: (
    filterName: GlobalFilterName,
    value: TimeRangeType["timeRestriction"] | null,
  ) => Promise<void>;
  actionTrigger: number;
};

const GlobalFilterPanel = ({
  onHandleGlobalFilterChange,
  actionTrigger,
}: GlobalFilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const globalFilter = useGlobalFilterStore((s) => s.globalFilter);
  const updateGlobalFilter = useGlobalFilterStore((s) => s.updateGlobalFilter);
  const [isGlobalFilterEditing, setIsGlobalFilterEditing] =
    useState<boolean>(false);
  const [globalFilterTemp, setGlobalFilterTemp] = useState<
    TimeRangeType["timeRestriction"] | null
  >(null);
  const [isFilterComplete, setIsFilterCompleted] = useState<boolean>(true);
  const updateValidityItem = useFilterValidationStore(
    (s) => s.updateValidityItem,
  );
  const deleteValidityItem = useFilterValidationStore(
    (s) => s.deleteValidityItem,
  );

  const cancelFilterChanges = () => {
    setIsGlobalFilterEditing(false);
    if (!globalFilter.timeRange) {
      deleteValidityItem("global-time-range");
      return;
    }
    updateValidityItem({
      id: "global-time-range",
      isValid: true,
    });
  };

  useEffect(() => {
    if (actionTrigger > 0) {
      setIsGlobalFilterEditing(false);
    }
  }, [actionTrigger]);

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
              <div className="flex flex-col">
                {isGlobalFilterEditing ? (
                  <div className="flex flex-col overflow-x-auto">
                    <TimeRangeOption
                      timeRestrictionData={globalFilter.timeRange} //data from file just on first time
                      onValidityChange={(isValid) => {
                        setIsFilterCompleted(isValid);
                        if (!isValid) {
                          updateValidityItem({
                            id: "global-time-range",
                            isValid,
                          });
                        }
                      }}
                      onCompleteChange={(timeRange) =>
                        setGlobalFilterTemp({
                          ...timeRange,
                          isLocalFilter: false,
                        })
                      }
                    />
                  </div>
                ) : (
                  <div className="mt-2 pl-1">
                    {formatTimeRangeLabel(globalFilter.timeRange)}
                  </div>
                )}

                <div className="flex gap-3 pl-0.5">
                  {(isGlobalFilterEditing || globalFilter.timeRange) && (
                    <Button
                      id={"clear-filter-btn"}
                      label="Löschen"
                      type="tertiary"
                      onClick={() => {
                        updateGlobalFilter("timeRange", null);
                        setIsGlobalFilterEditing(false);
                        deleteValidityItem("global-time-range");
                      }}
                    />
                  )}
                  {isGlobalFilterEditing ? (
                    <>
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
                        onClick={async () => {
                          updateValidityItem({
                            id: "global-time-range",
                            isValid: isFilterComplete,
                          });
                          await onHandleGlobalFilterChange(
                            "timeRange",
                            globalFilterTemp,
                          );
                          setIsGlobalFilterEditing(false);
                        }}
                      />
                    </>
                  ) : (
                    <Button
                      id={"global-btn"}
                      label={
                        globalFilter.timeRange ? "Bearbeiten" : "Filter setzen"
                      }
                      type="tertiary"
                      onClick={() => {
                        setIsGlobalFilterEditing((prev) => !prev);
                        updateValidityItem({
                          id: "global-time-range",
                          isValid: false,
                        });
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
  );
};

export default GlobalFilterPanel;
