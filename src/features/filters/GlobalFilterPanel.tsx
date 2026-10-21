/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import Card from "@/components/Card";
import TimeRangeOption from "./controls/TimeRangeOption";
import { useState } from "react";
import useFilterStore from "@/app/store/filter-store";
import type { TimeRangeType } from "./controls/type";
import { Button } from "@components/buttons/Button";
import formatTimeRangeLabel from "@app/utils/formatTimeRangeLabel";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import { buttonLabels, warningMessages } from "@/app/constants/uiTexts";

export type GlobalFilterName = "timeRestriction";
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
  const globalFilter = useFilterStore((s) => s.globalFilter);
  const editingFilters = useFilterStore((state) => state.editingFilters);
  const isGlobalFilterEditing =
    editingFilters?.some((filter) => filter.scope === "global") ?? false;
  const startEditing = useFilterStore((s) => s.startEditing);
  const stopEditing = useFilterStore((s) => s.stopEditing);
  const updateGlobalFilter = useFilterStore((s) => s.updateGlobalFilter);
  const [globalFilterTemp, setGlobalFilterTemp] = useState<
    TimeRangeType["timeRestriction"] | null
  >(null);
  const [isFilterComplete, setIsFilterCompleted] = useState<boolean>(true);

  const selectedInclusionCriteria = useSelectedCriteriaStore(
    (s) => s.selectedInclusionCriteria,
  );

  const cancelFilterChanges = () => {
    updateGlobalFilter("timeRestriction", globalFilter.timeRestriction ?? null);
    stopEditing({
      scope: "global",
      filterName: "timeRestriction",
    });
  };

  const hasLocalTimeRestrictionFilter = (): boolean => {
    const criteria = selectedInclusionCriteria.criteria;
    const hasAnyLocal = criteria.some(
      (c) =>
        c.criterion.timeRestrictionAllowed &&
        c.criterion.isLocalFilter === true,
    );
    return hasAnyLocal;
  };

  const handleGlobalFilterChange = (
    filterName: GlobalFilterName,
    value: TimeRangeType["timeRestriction"] | null,
  ) => {
    if (selectedInclusionCriteria.criteria.length === 0) {
      updateGlobalFilter(filterName, value);
      stopEditing({
        scope: "global",
        filterName: "timeRestriction",
      });
      return;
    }

    const hasLocalFilter = hasLocalTimeRestrictionFilter();

    onHandleWarning({
      filterName,
      value,
      hasLocalFilter,
      isDeleteAction: false,
    });
  };

  return (
    <Card
      className={`py-3 ${hasNoTimeRestriction ? "pointer-events-none select-none" : ""}`}
    >
      <div className="flex flex-col">
        <div className="flex gap-3">
          <p className="mr-2 text-end font-medium whitespace-nowrap">
            Globaler Zeitraum :
          </p>
          <div className="flex flex-col min-w-0 flex-1">
            {isGlobalFilterEditing ? (
              <TimeRangeOption
                timeRestrictionData={globalFilter.timeRestriction} //data from file just on first time
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
                {formatTimeRangeLabel(globalFilter.timeRestriction ?? null) ||
                  "Kein Filter"}
              </div>
            )}

            <div className="flex gap-10 pl-0.5">
              {(isGlobalFilterEditing || globalFilter.timeRestriction) && (
                <Button
                  id={"clear-filter-btn"}
                  label={buttonLabels.delete}
                  type="tertiary"
                  onClick={() => {
                    onHandleWarning({
                      filterName: "timeRestriction",
                      value: null,
                      hasLocalFilter: false,
                      isDeleteAction: true,
                    });
                  }}
                />
              )}
              {!hasNoTimeRestriction &&
                (isGlobalFilterEditing ? (
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
                        handleGlobalFilterChange(
                          "timeRestriction",
                          globalFilterTemp,
                        );
                      }}
                    />
                  </div>
                ) : (
                  <Button
                    id={"global-btn"}
                    label={
                      globalFilter.timeRestriction
                        ? buttonLabels.edit
                        : buttonLabels.setFilter
                    }
                    type="tertiary"
                    onClick={() => {
                      startEditing({
                        scope: "global",
                        filterName: "timeRestriction",
                      });
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
