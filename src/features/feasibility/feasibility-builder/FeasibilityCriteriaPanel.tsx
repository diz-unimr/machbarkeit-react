/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { ArrowButton } from "@components/ui/buttons/ArrowButton";
import accordionArrow from "@assets/accordion-arrow.svg";
import Card from "@components/layout/Card";
import type { Criterion } from "@app/types/ontology";
import type { DropZone } from "./FeasibilityContainer";
import { useState, type DragEvent } from "react";
import { DRAG_DATA_FORMATS } from "@app/constants/dragTypes";
import TimeRangeOption from "@features/filters/controls/TimeRangeOption";
import ConceptOption from "@features/filters/controls/ConceptOption";
import QuantityOption from "@features/filters/controls/QuantityOption";
import CloseIcon from "@assets/close-icon.svg";

type FeasibilityCriteriaPanelProps = {
  label: string;
  isExpanded: boolean;
  criteria: DroppedCriterion[];
  onSetPanelStatus: () => void;
  onSetCriteria: React.Dispatch<React.SetStateAction<DroppedCriterion[]>>;
};

type DroppedCriterion = {
  uid: string;
  criterion: Criterion;
  isExpanded: boolean;
  filterMode: "shared" | "individual";
};

export default function FeasibilityCriteriaPanel({
  label,
  isExpanded,
  criteria,
  onSetPanelStatus,
  onSetCriteria,
}: FeasibilityCriteriaPanelProps) {
  const [activeZone, setActiveZone] = useState<DropZone | null>(null);

  const generateId = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `drop-${Date.now()}-${Math.random()}`;

  const dropZoneClasses = (zone: DropZone) =>
    `flex flex-col gap-3 min-h-[160px] border-2 border-dashed rounded-md px-4 py-5 transition-colors ${
      activeZone === zone
        ? "border-blue-500 bg-blue-50"
        : "border-[var(--color-border)] bg-white"
    }`;

  const handleDragOver =
    (zone: DropZone) => (event: DragEvent<HTMLDivElement>) => {
      console.log(event);
      console.log(event.dataTransfer.types);
      const expectedType =
        zone === "attribute"
          ? DRAG_DATA_FORMATS.ATTRIBUTE
          : DRAG_DATA_FORMATS.CRITERION;
      if (event.dataTransfer.types.includes(expectedType)) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        setActiveZone(zone);
      } else {
        event.dataTransfer.dropEffect = "none";
      }
    };
  const handleCriteriaDrop =
    (zone: Exclude<DropZone, "attribute">) =>
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setActiveZone(null);
      const data = event.dataTransfer.getData(DRAG_DATA_FORMATS.CRITERION);
      event.dataTransfer.clearData(DRAG_DATA_FORMATS.CRITERION);
      if (!data) return;
      const criterion = JSON.parse(data) as Criterion;
      const newEntry: DroppedCriterion = {
        uid: generateId(),
        criterion,
        isExpanded: false,
        filterMode: "shared",
      };
      onSetCriteria((criteria) => [...criteria, newEntry]);
      /* if (zone === "inclusion") {
        setInclusionCriteria((prev) => [...prev, newEntry]);
      } else {
        setExclusionCriteria((prev) => [...prev, newEntry]);
      } */
    };

  const handleDragLeave =
    (zone: DropZone) => (event: DragEvent<HTMLDivElement>) => {
      const related = event.relatedTarget as Node | null;
      if (!related || !event.currentTarget.contains(related)) {
        setActiveZone((current) => (current === zone ? null : current));
      }
    };

  const removeCriterion = (
    zone: Exclude<DropZone, "attribute">,
    uid: string
  ) => {
    onSetCriteria((prev) => prev.filter((item) => item.uid !== uid));
  };

  const toggleExpand = (zone: string, item: DroppedCriterion) => {
    console.log(zone, item);

    onSetCriteria((prev) =>
      prev.map((c) =>
        c.uid === item.uid ? { ...c, isExpanded: !c.isExpanded } : c
      )
    );
  };

  const onSetFilterMode = (
    filterMode: DroppedCriterion["filterMode"],
    item: DroppedCriterion
  ) => {
    onSetCriteria((prev) =>
      prev.map((c) => (c.uid === item.uid ? { ...c, filterMode } : c))
    );
  };

  return (
    <div
      className="flex flex-col p-4 pt-2 border-b-[1.5px] border-[var(--color-border)] overflow-hidden"
      style={{
        /* flex: isExpanded ? "1 1 auto" : "0 0 auto", */
        minHeight: isExpanded ? "180px" : "60px",
        /* maxHeight: isExpanded ? "100%" : undefined, */
      }}
    >
      <div className="flex justify-between">
        <p className="text-lg font-medium p-2">{label}</p>
        <ArrowButton
          id="characteristic-btn"
          image={accordionArrow}
          mode="rotate-left"
          width="28"
          isExpanded={isExpanded}
          onClick={onSetPanelStatus}
        />
      </div>
      {isExpanded ? (
        <Card
          className="flex flex-col flex-1 min-h-0"
          bodyClassName="bg-gray-50 flex flex-col flex-1 min-h-0 overflow-hidden"
        >
          <div
            className={`${dropZoneClasses("inclusion")} ${
              criteria.length === 0 ? "justify-center" : ""
            } flex-1 overflow-y-auto`}
            onDragOver={handleDragOver("inclusion")}
            onDragLeave={handleDragLeave("inclusion")}
            onDrop={handleCriteriaDrop("inclusion")}
          >
            {criteria.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">
                Merkmale hierher ziehen, um sie als {label} zu übernehmen.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {criteria.map((item) => (
                  <li
                    key={item.uid}
                    className="flex flex-col rounded border border-gray-200 bg-white px-[16px] py-[10px] text-sm"
                  >
                    <div
                      className={`flex items-center justify-between ${item.isExpanded ? "pb-2 border-b-[1.5px] border-[var(--color-border)]" : undefined}`}
                    >
                      <div
                        className="flex gap-3 items-start hover:underline cursor-pointer"
                        onClick={() => toggleExpand("inclusion", item)}
                      >
                        <p className="font-medium text-gray-800 whitespace-nowrap">
                          {item.criterion.termCodes?.[0]?.code}
                        </p>
                        <p className="text-sx text-gray-500">
                          {item.criterion.display}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="!m-0 !p-0 text-sm font-medium text-red-500 hover:underline"
                        onClick={() => removeCriterion("inclusion", item.uid)}
                      >
                        <img src={CloseIcon} width="18px" />
                      </button>
                    </div>
                    {item.isExpanded ? (
                      item.criterion.children &&
                      item.criterion.children?.length > 0 ? (
                        <>
                          <div className="flex flex-col p-2">
                            <p className="font-semibold">Filter-Modus</p>
                            <div className="flex gap-3">
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name={`filter-mode-${item.uid}`}
                                  value="shared"
                                  checked={item.filterMode === "shared"}
                                  onChange={
                                    () => onSetFilterMode("shared", item)
                                    /* onFilterModeChange(
                                      item.uid,
                                      "shared",
                                      item.criterion
                                    ) */
                                  }
                                />
                                Gemeinsam
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  name={`filter-mode-${item.uid}`}
                                  value="individual"
                                  checked={item.filterMode === "individual"}
                                  onChange={
                                    () => onSetFilterMode("individual", item)
                                    /* onFilterModeChange(
                                      item.uid,
                                      "shared",
                                      item.criterion
                                    ) */
                                  }
                                />
                                Individuell
                              </label>
                            </div>
                          </div>
                          {item.filterMode === "shared" ? (
                            <div className="pl-2">
                              <TimeRangeOption onChange={() => {}} />
                            </div>
                          ) : (
                            <li className="flex flex-col gap-3 pl-2">
                              {item.criterion.children.map((c) => (
                                <div className="flex flex-col gap-3 border border-[var(--color-border)] rounded px-3 py-2 shadow-sm">
                                  <div className="flex gap-3">
                                    <p className="font-medium">
                                      {c.termCodes[0].code}
                                    </p>
                                    <p>{c.display}</p>
                                  </div>

                                  <TimeRangeOption onChange={() => {}} />
                                </div>
                              ))}
                            </li>
                          )}
                        </>
                      ) : (
                        <div className="p-2">
                          {item.criterion.filterType === "concept" ? (
                            <ConceptOption
                              criterion={item.criterion}
                              onChange={() => {}}
                            />
                          ) : item.criterion.filterType === "quantity" ? (
                            <QuantityOption
                              criterion={item.criterion}
                              onChange={() => {}}
                            />
                          ) : item.criterion.timeRestriction ? (
                            <TimeRangeOption onChange={() => {}} />
                          ) : undefined}
                        </div>
                      )
                    ) : (
                      <p></p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      ) : undefined}
    </div>
  );
}

{
  /* <div className="flex flex-col p-4 pt-2">
        <div className="flex justify-between">
          <p className="text-lg font-medium p-2">Ausschlusskriterien</p>
          <ArrowButton
            id="characteristic-btn"
            image={accordionArrow}
            mode="rotate-left"
            width="28"
            isExpanded={isExclusionCriteriaOpen}
            onClick={onSetPanelStatus}
          />
        </div>
        <Card bodyClassName="bg-gray-50">
          <div
            className={`${dropZoneClasses("exclusion")} ${exclusionCriteria.length === 0 ? "justify-center" : undefined}`}
            onDragOver={handleDragOver("exclusion")}
            onDragLeave={handleDragLeave("exclusion")}
            onDrop={handleCriteriaDrop("exclusion")}
          >
            {exclusionCriteria.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">
                Merkmale hierher ziehen, um sie als Ausschlusskriterien zu
                übernehmen.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {exclusionCriteria.map((item) => (
                  <li
                    key={item.uid}
                    className="flex justify-between items-center rounded border border-gray-200 bg-white px-3 py-2 text-sm"
                  >
                    <div className="flex gap-3 items-center">
                      <p className="font-medium text-gray-800">
                        {item.criterion.termCodes?.[0]?.code}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.criterion.display}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-red-500 hover:underline"
                      onClick={() => removeCriterion("exclusion", item.uid)}
                    >
                      Entfernen
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div> */
}
