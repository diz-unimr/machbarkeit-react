/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button, TertiaryButton } from "@/components/buttons/Button";
import { buttonLabels } from "@/app/constants/uiTexts";
import globalFilterIcon from "@assets/global-filter-icon.svg";
import localFilterIcon from "@assets/local-filter-icon.svg";
import ConceptOption from "./controls/ConceptOption";
import TimeRangeOption from "./controls/TimeRangeOption";
import {
  useSelectedCriteriaStore,
  type SelectedValueFilterProps,
} from "@/app/store/selected-criteria-store";
import type { CriterionNode } from "../feasibility/feasibility-builder/type";
import type { ConceptType, TimeRangeType } from "./controls/type";
import formatTimeRangeLabel from "@/app/utils/formatTimeRangeLabel";
import useFilterStore from "@/app/store/filter-store";
import { useState } from "react";

type LocalFilterProps = {
  isDiagnosis: boolean;
  isExpanded: boolean;
  item: CriterionNode;
  currentTimeRestriction: TimeRangeType["timeRestriction"] | null;
};

const LocalFilterPanel = ({
  isDiagnosis,
  isExpanded,
  item,
  currentTimeRestriction,
}: LocalFilterProps) => {
  const updateValueFilter = useSelectedCriteriaStore(
    (s) => s.updateValueFilter,
  );
  const updateAttributeFilter = useSelectedCriteriaStore(
    (s) => s.updateAttributeFilter,
  );

  const globalFilter = useFilterStore((s) => s.globalFilter);
  const startEditing = useFilterStore((s) => s.startEditing);
  const stopEditing = useFilterStore((s) => s.stopEditing);

  const [isFilterCompleted, setIsFilterCompleted] = useState<boolean>(false); // isEditingTimeRange
  const [localFilter, setLocalFilter] = useState<
    TimeRangeType["timeRestriction"] | null
  >(null);

  const isEditingTimeRange = useFilterStore((s) =>
    s.editingFilters.some(
      (filter) =>
        filter.scope === "inclusionCriteria" &&
        filter.criterionUid === item.uid &&
        filter.filterName === "timeRestriction",
    ),
  );

  const timeRangeLabel = formatTimeRangeLabel(currentTimeRestriction);

  const handleTimeRangeFilter = (
    data: {
      timeRange: TimeRangeType["timeRestriction"] | null;
      isLocalFilter: boolean;
    } | null,
  ) => {
    const timeRange = data?.timeRange ?? null;
    const isLocalFilter = data?.isLocalFilter ?? false;

    const filterInfo: SelectedValueFilterProps = {
      uid: item.uid,
      filterType: "timeRange",
      selectedFilter: timeRange
        ? {
            ...timeRange,
          }
        : null,
      isLocalFilter: timeRange ? isLocalFilter : undefined,
    };

    updateValueFilter(filterInfo);
  };

  return (
    <div
      style={{ display: isExpanded ? "flex" : "none" }}
      className={`flex flex-col gap-3 p-2 pb-0 mt-3 ${isExpanded && "border-t-[1.5px] border-(--color-border)"}`}
    >
      {isDiagnosis
        ? item.criterion.attributeDefinitions?.map(
            (attributeDefinition) =>
              attributeDefinition.selectableConcepts && (
                <div
                  key={attributeDefinition.attributeCode.code}
                  className="flex flex-col gap-2"
                >
                  <div className="font-bold">
                    {attributeDefinition.attributeCode.display}
                  </div>
                  <div className="pl-3">
                    <ConceptOption
                      id={item.uid}
                      selectedFilters={
                        (
                          item.criterion.attributeFilters?.find(
                            (attr) =>
                              attr.attributeCode.code ===
                              attributeDefinition.attributeCode.code,
                          ) as ConceptType["valueFilter"] | null
                        )?.selectedConcepts
                      }
                      filterOptions={
                        attributeDefinition.selectableConcepts ?? []
                      }
                      optional={attributeDefinition.optional}
                      onChange={(value) => {
                        updateAttributeFilter({
                          uid: item.uid,
                          attributeCode: attributeDefinition.attributeCode,
                          selectedFilter: value,
                        });
                      }}
                    />
                  </div>
                </div>
              ),
          )
        : item.criterion.valueDefinition?.type === "concept" && (
            <ConceptOption
              id={item.uid}
              selectedFilters={
                (item.criterion.valueFilter as ConceptType["valueFilter"])
                  ?.selectedConcepts
              }
              filterOptions={item.criterion.valueDefinition?.values ?? []}
              onChange={(value) => {
                updateValueFilter({
                  uid: item.uid,
                  filterType: "concept",
                  selectedFilter: value,
                });
              }}
            />
          )}

      {item.criterion.timeRestrictionAllowed && (
        <div className="flex flex-col gap-1">
          <div className="font-bold pb-1">Zeitraum (optional)</div>

          {item.criterion.timeRestriction && (
            <div className="flex gap-3 bg-[#ccddff]">
              <div
                className={`flex w-full gap-2 items-center justify-between px-2 py-1 text-xs rounded`}
              >
                <span className="flex gap-2">
                  {item.criterion.isLocalFilter || isEditingTimeRange ? (
                    <>
                      <img src={localFilterIcon} /> Lokaler Zeitraum:
                      {!isEditingTimeRange && (
                        <span className="font-medium">{timeRangeLabel}</span>
                      )}
                    </>
                  ) : (
                    <>
                      <img src={globalFilterIcon} /> Globaler Zeitraum:
                      <span className="font-medium">{timeRangeLabel}</span>
                    </>
                  )}
                </span>

                <TertiaryButton
                  id={"delete-" + item.uid}
                  label={buttonLabels.delete}
                  className="text-xs font-normal text-red-600 hover:text-red-500"
                  onClick={() => {
                    handleTimeRangeFilter(null);
                    stopEditing({
                      scope: "inclusionCriteria",
                      criterionUid: item.uid,
                      filterName: "timeRestriction",
                    });
                  }}
                />
              </div>
            </div>
          )}

          {isEditingTimeRange && (
            <TimeRangeOption
              id={item.uid}
              size="sm"
              timeRestrictionData={currentTimeRestriction ?? null}
              onValidityChange={setIsFilterCompleted}
              onCompleteChange={(filterValue) => {
                setLocalFilter(filterValue ? { ...filterValue } : null);
              }}
            />
          )}

          <div className="flex flex-wrap pl-0.5 gap-4">
            {/* Globaler Filter */}
            {globalFilter.timeRestriction ? (
              item.criterion.isLocalFilter ? (
                <Button
                  id={item.criterion.id + "-btn"}
                  label={buttonLabels.resetToGlobalFilter}
                  type="tertiary"
                  onClick={() => {
                    handleTimeRangeFilter({
                      timeRange: globalFilter.timeRestriction,
                      isLocalFilter: false,
                    });
                    stopEditing({
                      scope: "inclusionCriteria",
                      criterionUid: item.uid,
                      filterName: "timeRestriction",
                    });
                  }}
                />
              ) : !item.criterion.timeRestriction ? (
                <Button
                  id={item.criterion.id + "-global-btn"}
                  label={buttonLabels.setGlobalFilter}
                  type="tertiary"
                  onClick={() => {
                    handleTimeRangeFilter({
                      timeRange: globalFilter.timeRestriction,
                      isLocalFilter: false,
                    });
                    stopEditing({
                      scope: "inclusionCriteria",
                      criterionUid: item.uid,
                      filterName: "timeRestriction",
                    });
                  }}
                />
              ) : null
            ) : null}

            {isEditingTimeRange ? (
              /* Abbrechen and Bestätigen */
              <div className="flex gap-2">
                <Button
                  id={`clear-filter-btn-${item.uid}`}
                  label={buttonLabels.cancel}
                  type="tertiary"
                  onClick={() => {
                    setLocalFilter(null);
                    stopEditing({
                      scope: "inclusionCriteria",
                      criterionUid: item.uid,
                      filterName: "timeRestriction",
                    });
                  }}
                />
                <Button
                  id={`confirm-filter-btn-${item.uid}`}
                  label={buttonLabels.confirm}
                  type="tertiary"
                  isActive={isFilterCompleted}
                  onClick={() => {
                    handleTimeRangeFilter({
                      timeRange: localFilter,
                      isLocalFilter: true,
                    });
                    stopEditing({
                      scope: "inclusionCriteria",
                      criterionUid: item.uid,
                      filterName: "timeRestriction",
                    });
                  }}
                />
              </div>
            ) : (
              /* Lokaler Filter */
              <Button
                id={`local-filter-btn-${item.uid}`}
                label={
                  item.criterion.isLocalFilter
                    ? buttonLabels.editLocalFilter
                    : buttonLabels.setLocalFilter
                }
                type="tertiary"
                onClick={() => {
                  setIsFilterCompleted(false);
                  startEditing({
                    scope: "inclusionCriteria",
                    criterionUid: item.uid,
                    filterName: "timeRestriction",
                  });
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalFilterPanel;
