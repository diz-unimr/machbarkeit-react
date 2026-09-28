/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button, TertiaryButton } from "@/components/ui/buttons/Button";
import { buttonLabels } from "@/app/constants/uiTexts";
import globalFilterIcon from "@assets/global-filter-icon.svg";
import localFilterIcon from "@assets/local-filter-icon.svg";
import ConceptOption from "./controls/ConceptOption";
import QuantityOption from "./controls/QuantityOption";
import TimeRangeOption from "./controls/TimeRangeOption";
import {
  useSelectedCriteriaStore,
  type SelectedFilterProps,
} from "@/app/store/selected-criteria-store";
import type { CriterionNode } from "../feasibility/feasibility-builder/type";
import type { ConceptType, TimeRangeType } from "./controls/type";
import formatTimeRangeLabel from "@/app/utils/formatTimeRangeLabel";
import useGlobalFilterStore from "@/app/store/global-filter-store";
import { useState } from "react";
import type { Coding } from "@/app/types/ontologyType";

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

    const filterInfo: SelectedFilterProps = {
      uid: item.uid,
      filterType: "timeRange",
      selectedFilter: {
        ...timeRange,
      },
      isLocalFilter: timeRange ? isLocalFilter : undefined,
    };

    updateCriterionFilter(filterInfo);
  };

  const conceptOption = (
    index: number,
    filterOptions: Coding[],
    optional?: boolean,
  ) => {
    const valueFilter = item.criterion.valueFilter as
      | ConceptType["valueFilter"]
      | undefined;
    return (
      <ConceptOption
        key={`concept-${index}-${item.uid}`}
        id={`${index}-${item.uid}`}
        selectedFilters={valueFilter?.selectedConcepts}
        filterOptions={filterOptions}
        optional={optional}
        onChange={(nextConcepts) => {
          if (nextConcepts === null && !optional) {
            startEditing("inclusionCriteria", item.uid);
          } else {
            stopEditing("inclusionCriteria", item.uid);
          }
          updateCriterionFilter({
            uid: item.uid,
            filterType: "concept",
            selectedFilter: nextConcepts,
          });
        }}
      />
    );
  };

  const quantityOption = (unitOptions: Coding[]) => {
    return (
      <QuantityOption
        key={`quantity-${item.uid}`}
        id={item.uid}
        unitOptions={unitOptions}
        size="sm"
        onChange={() => {}}
      />
    );
  };

  return (
    <div
      /* aria-hidden={!isExpanded} */
      style={{ display: isExpanded ? "flex" : "none" }}
      className={`flex flex-col gap-3 p-2 pb-0 mt-3 ${isExpanded && "border-t-[1.5px] border-(--color-border)"}`}
    >
      {isDiagnosis &&
        item.criterion.attributeDefinitions?.map(
          (attributeDefinition, index) =>
            attributeDefinition.selectableConcepts && (
              <div className="flex flex-col gap-2">
                <div className="font-bold">
                  {attributeDefinition.attributeCode.display}
                </div>
                <div className="pl-3">
                  {conceptOption(
                    index,
                    attributeDefinition.selectableConcepts,
                    true,
                  )}
                </div>
              </div>
            ),
        )}

      {item.criterion.valueDefinitions
        ?.filter((valueDefinition) => valueDefinition.values)
        .map((valueDefinition, index) => {
          switch (valueDefinition.type) {
            case "concept":
              return conceptOption(
                index,
                valueDefinition.values,
                valueDefinition.optional,
              );
            case "quantity":
              return quantityOption(valueDefinition.values);

            default:
              return null;
          }
        })}

      {item.criterion.timeRestrictionAllowed && (
        <div className="flex flex-col gap-1">
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
                  label={buttonLabels.delete}
                  className="text-xs font-normal text-red-600 hover:text-red-500"
                  onClick={() => {
                    handleTimeRangeFilter(null);
                  }}
                />
              </div>
            </div>
          )}

          {item.isEditing && (
            <div>
              <div className="font-bold pb-1">Zeitraum (optional)</div>
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
            </div>
          )}
          <div className="flex flex-wrap pl-0.5 gap-4">
            {/* gap-10 */}
            {globalFilter.timeRange ? (
              item.criterion.isLocalFilter ? (
                <Button
                  id={item.criterion.id + "-btn"}
                  label={buttonLabels.resetToGlobalFilter}
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
                  label={buttonLabels.setGlobalFilter}
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
                  id={`clear-filter-btn-${item.uid}`}
                  label={buttonLabels.cancel}
                  type="tertiary"
                  onClick={() => {
                    stopEditing("inclusionCriteria", item.uid);
                  }}
                />
                <Button
                  id={`concirm-filter-btn-${item.uid}`}
                  label={buttonLabels.confirm}
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
                id={`edit-local-filter-btn-${item.uid}`}
                label={buttonLabels.editLocalFilter}
                type="tertiary"
                onClick={() => {
                  startEditing("inclusionCriteria", item.uid);
                }}
              />
            ) : (
              <Button
                id={`set-local-filter-btn-${item.uid}`}
                label={buttonLabels.setLocalFilter}
                type="tertiary"
                onClick={() => {
                  startEditing("inclusionCriteria", item.uid);
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
