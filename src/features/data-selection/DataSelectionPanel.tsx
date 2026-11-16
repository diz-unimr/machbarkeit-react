/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import sidebarCollapse from "@assets/sidebar-arrow.svg";
import ArrowButton from "@components/ui/buttons/ArrowButton";
import type { Module } from "@/app/types/ontologyTypes";
import ModulesPanel from "./modules/ModulesPanel";
import OntologyTreePanel from "./ontologies/OntologyTreePanel";

type DataSelectionProps = {
  onToggle: (expandedState: boolean) => void;
};

const DataSelectionPanel = ({ onToggle }: DataSelectionProps) => {
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [isDataSelectionPanelExpanded, setIsDataSelectionPanelExpanded] =
    useState(true);

  const toggleContainer = () => {
    const expandedState = !isDataSelectionPanelExpanded;
    setIsDataSelectionPanelExpanded(expandedState);
    onToggle(expandedState);
  };

  return (
    <div className="flex flex-col h-full border-(--color-border)">
      <div className="flex h-15 justify-end px-2 py-3 border-b-[1.5px] border-(--color-border)">
        <ArrowButton
          id="sidebar-arrow"
          image={sidebarCollapse}
          width="20"
          mode="flip"
          isExpanded={isDataSelectionPanelExpanded}
          onClick={toggleContainer}
        />
      </div>
      {isDataSelectionPanelExpanded ? (
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex px-4 py-3">
            <p className="font-medium">Merkmale</p>
          </div>
          <div className="flex flex-col w-full flex-1 min-h-0 p-2 pb-3">
            <ModulesPanel
              onHandleModules={(currentModule) =>
                setActiveModule(currentModule)
              }
            />
            <OntologyTreePanel activeModule={activeModule} />
          </div>
        </div>
      ) : (
        <div className="flex px-4 py-3">
          <p className="font-medium">Merkmale</p>
        </div>
      )}
    </div>
  );
};
export default DataSelectionPanel;
