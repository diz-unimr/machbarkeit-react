/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button, TertiaryButton } from "@/components/ui/buttons/Button";
import globalFilterIcon from "@assets/global-filter-icon.svg";
import localFilterIcon from "@assets/local-filter-icon.svg";
import ConceptOption from "./controls/ConceptOption";
import QuantityOption from "./controls/QuantityOption";
import TimeRangeOption from "./controls/TimeRangeOption";
import {
  useSelectedCriteriaStore,
  type FilterProps,
} from "@/app/store/selected-criteria-store";
import type { CriterionNode } from "../feasibility/feasibility-builder/type";
import type { TimeRangeType } from "./controls/type";
import formatTimeRangeLabel from "@/app/utils/formatTimeRangeLabel";
import { useState } from "react";
import useGlobalFilterStore from "@/app/store/global-filter-store";

type LocalFilterProps = {
  isExpanded: boolean;
  item: CriterionNode;
  currentTimeRestriction: TimeRangeType["timeRestriction"] | null;
};

const LocalFilterPanel = ({
  isExpanded,
  item,
  currentTimeRestriction,
}: LocalFilterProps) => {
  const startEditing = useSelectedCriteriaStore((s) => s.startEditing);
  const stopEditing = useSelectedCriteriaStore((s) => s.stopEditing);
  const updateCriterionFilter = useSelectedCriteriaStore(
    (s) => s.updateCriterionFilter,
  );

  const globalFilter = useGlobalFilterStore((s) => s.globalFilter);
  const [isFilterCompleted, setIsFilterCompleted] = useState<boolean>(true);
  const [localFilter, setLocalFilter] = useState<
    TimeRangeType["timeRestriction"] | null
  >(null);
  const timeRangeLabel = formatTimeRangeLabel(currentTimeRestriction);

  const handleTimeRangeFilter = (
    data: {
      timeRange: TimeRangeType["timeRestriction"] | null;
      isLocalFilter: boolean;
    } | null,
  ) => {
    stopEditing("inclusionCriteria", item.uid);

    const timeRange = data?.timeRange ?? null;
    const isLocalFilter = data?.isLocalFilter ?? false;

    const filterInfo: FilterProps = {
      uid: item.uid,
      filterType: "timeRange",
      filterValue: {
        ...timeRange,
      },
      isLocalFilter: timeRange ? isLocalFilter : undefined,
    };

    updateCriterionFilter(filterInfo);
  };

  return (
    <div
      /* aria-hidden={!isExpanded} */
      style={{ display: isExpanded ? "block" : "none" }}
      className={`p-2 pb-0 mt-3 ${isExpanded && "border-t-[1.5px] border-(--color-border)"}`}
    >
      {item.criterion.filterType === "concept" ? (
        <ConceptOption
          criterion={item.criterion}
          onChange={(value) => {
            if (value === null) {
              startEditing("inclusionCriteria", item.uid);
            } else {
              stopEditing("inclusionCriteria", item.uid);
            }
            updateCriterionFilter({
              uid: item.uid,
              filterType: "concept",
              filterValue: value,
            });
          }}
        />
      ) : item.criterion.filterType === "quantity" ? (
        <QuantityOption
          criterion={item.criterion}
          size="sm"
          onChange={() => {}}
        />
      ) : item.criterion.timeRestrictionAllowed ? (
        <div className="flex flex-col gap-3">
          {item.criterion.timeRestriction && (
            <div className="flex gap-3 bg-[#ccddff]">
              <div
                className={`flex w-full gap-2 items-center justify-between px-2 py-1 text-xs rounded`}
              >
                <span className="flex gap-2">
                  {item.criterion.isLocalFilter || item.isEditing ? (
                    <>
                      <img src={localFilterIcon} /> Lokaler Zeitraum:
                      {!item.isEditing ? (
                        <span className="font-medium">{timeRangeLabel}</span>
                      ) : null}
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
                  label="Löschen"
                  className="text-xs font-normal text-red-600 hover:text-red-500"
                  onClick={() => {
                    handleTimeRangeFilter(null);
                  }}
                />
              </div>
            </div>
          )}

          {item.isEditing && (
            <TimeRangeOption
              id={item.uid}
              size="sm"
              timeRestrictionData={currentTimeRestriction ?? null}
              onValidityChange={(isValid) => {
                setIsFilterCompleted(isValid);
              }}
              onCompleteChange={(filterValue) => {
                setLocalFilter({
                  ...filterValue,
                });
              }}
            />
          )}
          <div className="flex flex-wrap pl-0.5 gap-4">
            {/* gap-10 */}
            {globalFilter.timeRange ? (
              item.criterion.isLocalFilter ? (
                <Button
                  id={item.criterion.id + "-btn"}
                  label="Auf globalen Filter zurücksetzen"
                  type="tertiary"
                  onClick={() => {
                    handleTimeRangeFilter({
                      timeRange: globalFilter.timeRange,
                      isLocalFilter: false,
                    });
                  }}
                />
              ) : !item.criterion.timeRestriction ? (
                <Button
                  id={item.criterion.id + "-global-btn"}
                  label="Globaler Filter setzen"
                  type="tertiary"
                  onClick={() => {
                    handleTimeRangeFilter({
                      timeRange: globalFilter.timeRange,
                      isLocalFilter: false,
                    });
                  }}
                />
              ) : null
            ) : null}
            {item.isEditing ? (
              /* Abbrechen and Bestätigen */
              <div className="flex gap-2">
                <Button
                  id={"clear-filter-btn"}
                  label="Abbrechen"
                  type="tertiary"
                  onClick={() => {
                    stopEditing("inclusionCriteria", item.uid);
                  }}
                />
                <Button
                  id={item.criterion.id + "-btn"}
                  label="Bestätigen"
                  type="tertiary"
                  isActive={isFilterCompleted}
                  onClick={() => {
                    handleTimeRangeFilter({
                      timeRange: localFilter,
                      isLocalFilter: true,
                    });
                  }}
                />
              </div>
            ) : item.criterion.isLocalFilter ? (
              <Button
                id={item.criterion.id + "-btn"}
                label="Lokaler Filter bearbeiten"
                type="tertiary"
                onClick={() => {
                  startEditing("inclusionCriteria", item.uid);
                }}
              />
            ) : (
              <Button
                id={item.criterion.id + "-btn"}
                label="Lokaler Filter setzen"
                type="tertiary"
                onClick={() => {
                  startEditing("inclusionCriteria", item.uid);
                }}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LocalFilterPanel;
