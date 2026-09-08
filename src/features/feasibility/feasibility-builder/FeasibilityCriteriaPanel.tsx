/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import ArrowButton from "@/components/ui/buttons/ArrowButton";
import accordionArrow from "@/assets/accordion-arrow.svg";
import Card from "@/components/ui/Card";
import useCriteriaDnD from "./hooks/useCriteriaDnD";
import FeasibilityCriteriaSortable from "./FeasibilityCriteriaSortable";
import type { CriterionNode, SelectedCriteria } from "./type";

type FeasibilityCriteriaPanelProps = {
  label: string;
  selectedCriteria: SelectedCriteria;
  isPanelExpanded: boolean;
  onToggleCriteriaPanel: () => void;
  onToggleCriterionItem: (item: CriterionNode) => void;
  onRemoveCriterion: (uid: string) => void;
};

const FeasibilityCriteriaPanel = ({
  label,
  selectedCriteria,
  isPanelExpanded,
  onToggleCriteriaPanel,
  onRemoveCriterion,
}: FeasibilityCriteriaPanelProps) => {
  const {
    dropZoneClasses,
    handleDragOver,
    handleDragLeave,
    handleCriteriaDrop,
  } = useCriteriaDnD();

  const removeCriterion = (
    // zone: Exclude<DropZone, "attribute">,
    uid: string,
  ) => {
    onRemoveCriterion(uid);
  };

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        height: isPanelExpanded ? "80%" : "fit-content",
        borderBottom: !isPanelExpanded
          ? "1.5px solid var(--color-border)"
          : undefined,
      }}
    >
      <div className="flex justify-between p-2">
        <p className="text-lg font-medium">{label}</p>
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
                <FeasibilityCriteriaSortable
                  selectedCriteria={selectedCriteria}
                  onRemove={(uid) => removeCriterion(uid)}
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FeasibilityCriteriaPanel;
