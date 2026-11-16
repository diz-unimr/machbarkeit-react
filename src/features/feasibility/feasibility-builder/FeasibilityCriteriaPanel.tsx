/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import useCriteriaDnD from "./hooks/useCriteriaDnD";
import FeasibilityCriteriaSortableList from "./FeasibilityCriteriaSortableList";
import type { CriterionNode, SelectedCriteria } from "./types";
import CollapsiblePanel from "@/components/ui/CollapsiblePanel";
import Card from "@/components/ui/Card";

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
    <div className="flex h-full min-h-0 flex-col">
      <p className="shrink-0 p-2 text-lg font-medium">Einschlusskriterien</p>
      <Card className="flex-1 min-h-0">
        <div
          className={`flex flex-1 min-h-0 flex-col overflow-y-auto ${dropZoneClasses(
            "inclusionCriteria",
          )} ${
            selectedCriteria.criteria.length === 0
              ? "items-center justify-center"
              : ""
          }`}
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
      </Card>
    </div>
  );
};

export default FeasibilityCriteriaPanel;
