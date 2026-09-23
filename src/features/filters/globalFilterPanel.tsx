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
import { buttonLabels, warningMessages } from "@/app/constants/uiTexts";

export type GlobalFilterName = "timeRange" | "caseType";
export type globalFilterWarning = {
  filterName: GlobalFilterName;
  value: TimeRangeType["timeRestriction"] | null;
  hasLocalFilter: boolean;
  isDeleteAction: boolean;
};
type GlobalFilterPanelProps = {
  hasNoTimeRestriction?: boolean;
  onHandleWarning: (warning: globalFilterWarning) => void;
};

const GlobalFilterPanel = ({
  hasNoTimeRestriction = false,
  onHandleWarning,
}: GlobalFilterPanelProps) => {
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
    <Card
      className={`py-3 ${hasNoTimeRestriction ? "opacity-50 pointer-events-none select-none" : ""}`}
    >
      <div className="flex flex-col">
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
                {formatTimeRangeLabel(globalFilter.timeRange ?? null) ||
                  "Kein Filter"}
              </div>
            )}

            <div className="flex gap-10 pl-0.5">
              {(globalFilter.isEditing || globalFilter.timeRange) && (
                <Button
                  id={"clear-filter-btn"}
                  label={buttonLabels.delete}
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
              {!hasNoTimeRestriction &&
                (globalFilter.isEditing ? (
                  <div className="flex gap-2">
                    <Button
                      id={"global-btn"}
                      label={buttonLabels.cancel}
                      type="tertiary"
                      onClick={cancelFilterChanges}
                    />
                    <Button
                      id={"global-btn"}
                      label={buttonLabels.confirm}
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
                    label={
                      globalFilter.timeRange
                        ? buttonLabels.edit
                        : buttonLabels.setFilter
                    }
                    type="tertiary"
                    onClick={() => {
                      startEditing();
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
        {hasNoTimeRestriction && (
          <span className="pt-2 text-xs text-red-600">
            {warningMessages.noTimeReference}
          </span>
        )}
      </div>
    </Card>
  );
};

export default GlobalFilterPanel;
