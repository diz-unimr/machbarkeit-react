/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import sidebarCollapse from "@assets/sidebar-arrow.svg";
import { ArrowButton } from "@components/ui/buttons/ArrowButton";
import appIcon from "@assets/app-icon.svg";
import OntologyContainer from "./ontology-container/layout/OntologyContainer";
import { useState } from "react";
import AttributeListPanel from "./attribute-list/layout/AttributeListPanel";

type DataSelectionProps = {
  onToggle: (expandedState: boolean) => void;
};

export default function DataSelectionContainer({
  onToggle,
}: DataSelectionProps) {
  const [textInput, setTextInput] = useState<string | number>("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAttributeListPanelOpen, setIsAttributeListPanelOpen] =
    useState<boolean>(false);
  const [isOntologyContainerOpen, setIsOntologyContainerOpen] =
    useState<boolean>(true);

  const handleTextChange = (text: string | number) => {
    setTextInput(text);
  };

  const toggleOntologyContainer = () => {
    setIsOntologyContainerOpen((prev) => !prev);
    if (isAttributeListPanelOpen) setIsAttributeListPanelOpen(false);
  };

  const toggleAttributeListPanel = () => {
    setIsAttributeListPanelOpen((prev) => !prev);
    if (isOntologyContainerOpen) setIsOntologyContainerOpen(false);
  };

  const toggleContainer = () => {
    const expandedState = !isExpanded;
    setIsExpanded(expandedState);
    onToggle(expandedState);
  };

  // useEffect(() => {}, [isAttributeListPanelOpen, isOntologyContainerOpen]);

  return (
    <div className="flex flex-col h-full border-[var(--color-border)]">
      <div className="flex h-[60px] justify-between px-2 py-3 border-b-[1.5px] border-[var(--color-border)]">
        <div className="flex gap-3 items-start">
          <img src={appIcon} width={20} height={20} className="text-black" />
          {/* {isExpanded ? <p>Machbarkeitsabfrage</p> : undefined} */}
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
          <div>Merkmalen</div>
          <div>Attributliste</div>
        </div>
      )}
    </div>
  );
}
