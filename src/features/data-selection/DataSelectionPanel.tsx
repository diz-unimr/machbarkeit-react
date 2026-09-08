/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import sidebarCollapse from "@/assets/sidebar-arrow.svg";
import ArrowButton from "@/components/ui/buttons/ArrowButton";
import appIcon from "@/assets/app-icon.svg";
import OntologyContainer from "./ontology-characteristics/OntologyPanel";
import AttributeListPanel from "./attribute-list/AttributeListPanel";

type DataSelectionProps = {
  onToggle: (expandedState: boolean) => void;
};

const DataSelectionPanel = ({ onToggle }: DataSelectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAttributeListPanelOpen, setIsAttributeListPanelOpen] =
    useState<boolean>(false);
  const [isOntologyContainerOpen, setIsOntologyContainerOpen] =
    useState<boolean>(true);

  const toggleOntologyContainer = () => {
    setIsOntologyContainerOpen((prev) => !prev);
  };

  const toggleAttributeListPanel = () => {
    setIsAttributeListPanelOpen((prev) => !prev);
  };

  const toggleContainer = () => {
    const expandedState = !isExpanded;
    setIsExpanded(expandedState);
    onToggle(expandedState);
  };

  return (
    <div className="flex flex-col h-full border-(--color-border)">
      <div className="flex h-15 justify-between px-2 py-3 border-b-[1.5px] border-(--color-border)">
        <div className="flex gap-3 items-start">
          <img src={appIcon} width={20} height={20} className="text-black" />
        </div>
        <ArrowButton
          id="sidebar-arrow"
          image={sidebarCollapse}
          width="20"
          mode="flip"
          isExpanded={isExpanded}
          onClick={toggleContainer}
        />
      </div>
      {isExpanded ? (
        <div className="flex flex-1 flex-col min-h-0 mx-4 my-3">
          <OntologyContainer
            onSetPanelStatus={toggleOntologyContainer}
            isOntologyContainerOpen={isOntologyContainerOpen}
          />
          <AttributeListPanel
            onSetPanelStatus={toggleAttributeListPanel}
            isAttributeListPanelOpen={isAttributeListPanelOpen}
          />
        </div>
      ) : (
        <div className="flex px-4 py-3">
          {/* <p className="font-medium">Merkmale</p>
          <div className="font-medium">Attributliste</div> */}
        </div>
      )}
    </div>
  );
};

export default DataSelectionPanel;
