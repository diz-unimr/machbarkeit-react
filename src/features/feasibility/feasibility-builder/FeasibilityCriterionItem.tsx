/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import {
  useSelectedCriteriaStore,
  type FilterProps,
} from "@/app/store/selected-criteria-store";
import useGlobalFilterStore from "@/app/store/global-filter-store";
import type { CriterionNode } from "./type";
import ConceptOption from "@features/filters/controls/ConceptOption";
import QuantityOption from "@features/filters/controls/QuantityOption";
import TimeRangeOption from "@features/filters/controls/TimeRangeOption";
import { Button, TertiaryButton } from "@components/ui/buttons/Button";
import closeIcon from "@assets/close-icon.svg";
import warningIcon from "@assets/warning-icon.svg";
import globalFilterIcon from "@assets/global-filter-icon.svg";
import localFilterIcon from "@assets/local-filter-icon.svg";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import type { TimeRangeType } from "@features/filters/controls/type";
import ArrowButton from "@/components/ui/buttons/ArrowButton";

type DragProps = {
  setNodeRef: (el: HTMLElement | null) => void;
  attributes?: Partial<DraggableAttributes>;
  listeners?: SyntheticListenerMap;
  style: React.CSSProperties;
  isDragging: boolean;
};

type FeasibilityCriterionItemProps = {
  index: number;
  item: CriterionNode;
  logic?: string;
  dragProps?: DragProps;
};

const FeasibilityCriterionItem = ({
  index,
  item,
  logic,
  dragProps = {
    setNodeRef: () => {},
    attributes: {},
    listeners: {},
    style: {},
    isDragging: false,
  },
}: FeasibilityCriterionItemProps) => {
  const startEditing = useSelectedCriteriaStore((s) => s.startEditing);
  const stopEditing = useSelectedCriteriaStore((s) => s.stopEditing);
  const removeCriterion = useSelectedCriteriaStore((s) => s.removeCriterion);
  const toggleLogic = useSelectedCriteriaStore((s) => s.toggleLogic);
  const updateCriterionFilter = useSelectedCriteriaStore(
    (s) => s.updateCriterionFilter,
  );
  const globalFilter = useGlobalFilterStore((s) => s.globalFilter);

  const isOr = logic === "OR";
  const [localFilter, setLocalFilter] = useState<
    TimeRangeType["timeRestriction"] | null
  >(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(
    !!(item.isExpanded || item.criterion.filterType),
  );
  const [isFilterCompleted, setIsFilterCompleted] = useState<boolean>(true);

  const formatTimeRangeLabel = (
    filterValue: TimeRangeType["timeRestriction"] | null,
  ) => {
    if (!filterValue) return null;

    const after = filterValue.afterDate
      ? new Date(filterValue.afterDate)
      : null;
    const before = filterValue.beforeDate
      ? new Date(filterValue.beforeDate)
      : null;
    // set date string
    const afterDate = after?.toLocaleDateString("de-DE");
    const beforeDate = before?.toLocaleDateString("de-DE");

    if (after && before) {
      if (after.getTime() === before.getTime()) return "Am " + afterDate;
      if (after.getTime() < before.getTime())
        return "Von " + afterDate + " bis " + beforeDate;
    }

    if (after && !before) return "Nach " + afterDate;
    if (before && !after) return "Vor " + beforeDate;

    return null;
  };

  const handleTimeRangeFilter = (
    data: {
      timeRange: TimeRangeType["timeRestriction"] | null;
      isLocalFilter: boolean;
    } | null,
  ) => {
    stopEditing("inclusionCriteria", item.uid);

    // if (!data) return;
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

  const currentTimeRestriction =
    (item.criterion.timeRestrictionAllowed || item.isEditing) &&
    item.criterion.timeRestriction
      ? item.criterion.timeRestriction
      : null;
  const timeRangeLabel = formatTimeRangeLabel(currentTimeRestriction);

  useEffect(() => {
    if (item.criterion.timeRestriction) {
      setIsExpanded(true);
    }
  }, [item.criterion.timeRestriction]);

  return (
    <div ref={dragProps.setNodeRef} className="relative">
      <li
        style={{
          ...dragProps.style,
          transform: dragProps.style?.transform ?? undefined,
          opacity: 1,
          zIndex: dragProps.isDragging ? 10 : 5,
        }}
        {...dragProps.attributes}
        {...(dragProps.listeners ?? {})}
        className="relative flex flex-col w-full backface-hidden origin-center will-change-transform"
      >
        <div
          style={{
            borderColor: item.criterion.color?.btnColor,
            zIndex: 5,
          }}
          className="relative flex border rounded-sm bg-white text-sm cursor-grab active:cursor-grabbing overflow-hidden h-fit"
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-12"
            style={{ backgroundColor: item.criterion.color?.btnColor }}
            aria-hidden="true"
          />
          <div className="flex flex-col min-w-0 w-full p-3 pl-16">
            <div className="flex flex-col w-full gap-3">
              <div
                className="flex w-fit items-start gap-3 hover:underline"
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                <ArrowButton
                  id={item.uid}
                  mode="rotate-left"
                  isExpanded={isExpanded}
                  hasChildren={true}
                  className="mt-0.5!"
                />
                <p className="w-fit mt-0.5 font-bold text-gray-800 whitespace-nowrap cursor-pointer">
                  {item.criterion.termCodes?.[0]?.code}
                </p>

                <p className="w-fit mt-0.5 font-normal text-gray-800 cursor-pointer">
                  {item.criterion.display}
                </p>
              </div>

              {!isExpanded && item.isEditing && (
                <div className="flex gap-2 p-1 bg-[#FEF5E2]">
                  <img src={warningIcon} className="inline w-4 mr-1" />
                  <p className=" text-[#804909]">
                    Bitte bestätigen Sie den Filter
                  </p>
                </div>
              )}
            </div>
            <div
              aria-hidden={!isExpanded}
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
                                <span className="font-medium">
                                  {timeRangeLabel}
                                </span>
                              ) : null}
                            </>
                          ) : (
                            <>
                              <img src={globalFilterIcon} /> Globaler Zeitraum:
                              <span className="font-medium">
                                {timeRangeLabel}
                              </span>
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
          </div>
          <div
            className="flex w-10 shrink-0 justify-center items-start pt-3"
            style={{ backgroundColor: item.criterion.color?.btnColor }}
          >
            <button
              type="button"
              className="m-0! p-0!"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                removeCriterion(index, item.uid, "inclusionCriteria");
              }}
            >
              <img src={closeIcon} width="18px" />
            </button>
          </div>
        </div>
      </li>
      {logic ? (
        <div
          className={`z-100 pt-2 ${isOr ? "absolute -translate-y-1/2" : "flex relative"}`}
        >
          <button
            key={"logic-" + index}
            type="button"
            className="flex w-[clamp(50px,5vmax,65px)] items-center justify-center border border-gray-400 bg-white text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-100 transition-colors"
            style={{ borderRadius: "14px" }}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              toggleLogic(index);
            }}
          >
            {isOr ? "ODER" : "UND"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default FeasibilityCriterionItem;
