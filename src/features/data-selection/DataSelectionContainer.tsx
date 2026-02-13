/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import sidebarCollapse from "@assets/sidebar-arrow.svg";
import ArrowButton from "@components/ui/buttons/ArrowButton";
import appIcon from "@assets/app-icon.svg";
import OntologyContainer from "./ontology-container/layout/OntologyContainer";

type DataSelectionProps = {
  onToggle: (expandedState: boolean) => void;
};

const DataSelectionContainer = ({ onToggle }: DataSelectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAttributeListPanelOpen, setIsAttributeListPanelOpen] =
    useState<boolean>(false);
  const [isOntologyContainerOpen, setIsOntologyContainerOpen] =
    useState<boolean>(true);

  const toggleOntologyContainer = () => {
    setIsOntologyContainerOpen((prev) => !prev);
    if (isAttributeListPanelOpen) setIsAttributeListPanelOpen(false);
  };

  const toggleContainer = () => {
    const expandedState = !isExpanded;
    setIsExpanded(expandedState);
    onToggle(expandedState);
  };

  return (
    <div className="flex flex-col h-full border-(--color-border)">
      <div className="flex h-[60px] justify-between px-2 py-3 border-b-[1.5px] border-(--color-border)">
        <div className="flex gap-3 items-start">
          <img src={appIcon} width={20} height={20} className="text-black" />
        </div>

        <ArrowButton
          id="sidebar-arrow"
          image={sidebarCollapse}
          width="20"
          height="20"
          mode="flip"
          isExpanded={isExpanded}
          onClick={toggleContainer}
        />
      </div>
      {isExpanded ? (
        <OntologyContainer
          onSetPanelStatus={toggleOntologyContainer}
          isOntologyContainerOpen={isOntologyContainerOpen}
        />
      ) : (
        <div className="px-3">
          <div className="font-medium">Merkmalen</div>
          {/* <div>Attributliste</div> */}
        </div>
      )}
    </div>
  );
};
export default DataSelectionContainer;
