/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import ArrowButton from "@components/ui/buttons/ArrowButton";
import accordionArrow from "@assets/accordion-arrow.svg";
import Card from "@components/ui/Card";
import useCriteriaDnD from "./hooks/useCriteriaDnD";
import FeasibilityCriteriaSortableList from "./FeasibilityCriteriaSortableList";
import type { SelectedCriteria } from "./type";

type FeasibilityCriteriaPanelProps = {
  label: string;
  selectedCriteria: SelectedCriteria;
  isPanelExpanded: boolean;
  onToggleCriteriaPanel: () => void;
};

const FeasibilityCriteriaPanel = ({
  label,
  selectedCriteria,
  isPanelExpanded,
  onToggleCriteriaPanel,
}: FeasibilityCriteriaPanelProps) => {
  const {
    dropZoneClasses,
    handleDragOver,
    handleDragLeave,
    handleCriteriaDrop,
  } = useCriteriaDnD();

  return (
    <div
      className="flex flex-col gap-4 overflow-hidden"
      style={{
        height: isPanelExpanded ? "100%" : "fit-content",
        borderBottom: !isPanelExpanded
          ? "1.5px solid var(--color-border)"
          : undefined,
      }}
    >
      <div className="flex justify-between">
        <p className="text-lg font-medium p-2">{label}</p>
        <ArrowButton
          id="characteristic-btn"
          image={accordionArrow}
          mode="rotate-left"
          isExpanded={isPanelExpanded}
          onClick={onToggleCriteriaPanel}
        />
      </div>
      <div className={`min-h-0 ${isPanelExpanded ? "flex-1" : "hidden"}`}>
        <Card
          className="flex flex-col flex-1 h-full" /* min-h-0 */
          bodyClassName="bg-gray-50 flex flex-col flex-1 min-h-0 overflow-hidden"
        >
          <div
            className={`"h-full" ${dropZoneClasses("inclusionCriteria")} ${
              selectedCriteria.criteria.length === 0 ? "justify-center" : ""
            } flex-1 overflow-y-auto`}
            onDragOver={handleDragOver("inclusionCriteria")}
            onDragLeave={handleDragLeave("inclusionCriteria")}
            onDrop={handleCriteriaDrop("inclusionCriteria")}
          >
            {selectedCriteria.criteria.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">
                Merkmale hierher ziehen, um sie als {label} zu übernehmen.
              </p>
            ) : (
              <div className="flex flex-col">
                <FeasibilityCriteriaSortableList
                  selectedCriteria={selectedCriteria}
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

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
            className={`${dropZoneClasses("exclusionCriteria")} ${exclusionCriteria.length === 0 ? "justify-center" : undefined}`}
            onDragOver={handleDragOver("exclusionCriteria")}
            onDragLeave={handleDragLeave("exclusionCriteria")}
            onDrop={handleCriteriaDrop("exclusionCriteria")}
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
                      onClick={() => removeCriterion("exclusionCriteria", item.uid)}
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

export default FeasibilityCriteriaPanel;
