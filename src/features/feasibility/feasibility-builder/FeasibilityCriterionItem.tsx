/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import type { CriterionNode } from "./type";
import closeIcon from "@assets/close-icon.svg";
import warningIcon from "@assets/warning-icon.svg";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import ArrowButton from "@/components/ui/buttons/ArrowButton";
import LocalFilterPanel from "@/features/filters/LocalFilterPanel";
import type { TimeRangeType } from "@/features/filters/controls/type";

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
  const removeCriterion = useSelectedCriteriaStore((s) => s.removeCriterion);
  const toggleLogic = useSelectedCriteriaStore((s) => s.toggleLogic);
  const [isExpanded, setIsExpanded] = useState<boolean>(
    !!(item.isExpanded || item.criterion.filterType),
  );
  const isOr = logic === "OR";

  const currentTimeRestriction: TimeRangeType["timeRestriction"] | null =
    (item.criterion.timeRestrictionAllowed || item.isEditing) &&
    item.criterion.timeRestriction
      ? item.criterion.timeRestriction
      : null;

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
            <LocalFilterPanel
              isExpanded={isExpanded}
              item={item}
              currentTimeRestriction={currentTimeRestriction}
            />
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
              <img
                src={closeIcon}
                style={{ width: "clamp(14px, 0.5rem + 1vw, 18px)" }}
              />
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
