/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import useCriteriaDnD from "./hooks/useCriteriaDnD";
import FeasibilityCriteriaSortableList from "./FeasibilityCriteriaSortableList";
import type { CriterionNode, SelectedCriteria } from "./type";
import CollapsiblePanel from "@/components/CollapsiblePanel";

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

  const removeCriterion = (uid: string) => {
    onRemoveCriterion(uid);
  };

  return (
    <CollapsiblePanel
      label={label}
      isPanelExpanded={isPanelExpanded}
      onToggleCriteriaPanel={onToggleCriteriaPanel}
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
              onRemove={(uid) => removeCriterion(uid)}
            />
          </div>
        )}
      </div>
    </CollapsiblePanel>
  );
};

export default FeasibilityCriteriaPanel;
