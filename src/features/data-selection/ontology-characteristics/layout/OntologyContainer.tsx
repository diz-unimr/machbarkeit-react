/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import ModulesPanel from "../modules/ModulesPanel";
import type { Module } from "@app/types/ontologyType";
import OntologyTreePanel from "../ontologies/OntologyTreePanel";
import DataSelectionPanel from "../../DataSelectionPanel";
import Card from "@/components/ui/Card";

type OntologyContainerProps = {
  onSetPanelStatus: () => void;
  isOntologyContainerOpen: boolean;
};

const OntologyContainer = ({
  onSetPanelStatus,
  isOntologyContainerOpen,
}: OntologyContainerProps) => {
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  return (
    <DataSelectionPanel
      label="Merkmale"
      onToggle={onSetPanelStatus}
      isExpanded={isOntologyContainerOpen}
    >
      <Card className="h-full">
        <ModulesPanel
          onHandleModules={(currentModule) => setActiveModule(currentModule)}
        />
        <OntologyTreePanel activeModule={activeModule} onClick={() => {}} />
      </Card>
    </DataSelectionPanel>
  );
};
export default OntologyContainer;

{
  /* <div
      className={`flex flex-col flex-1 min-h-0 ${isOntologyContainerOpen ? "max-h-[80%]" : "max-h-15"} mb-5`}
      style={{
        height: isOntologyContainerOpen ? "100%" : "fit-content",
        borderBottom: !isOntologyContainerOpen
          ? "1.5px solid var(--color-border)"
          : undefined,
      }}
    >
      <div className="flex py-3 justify-between">
        <p className="font-medium">Merkmale</p>
        <ArrowButton
          id="characteristic-btn"
          image={accordionArrow}
          mode="rotate-left"
          isExpanded={isOntologyContainerOpen}
          onClick={onSetPanelStatus}
        />
      </div>
      <div
        className="flex flex-col w-full flex-1 min-h-0 pb-3"
        style={{
          display: isOntologyContainerOpen ? "flex" : "none",
        }}
      >
        <ModulesPanel
          onHandleModules={(currentModule) => setActiveModule(currentModule)}
        />
        <OntologyTreePanel activeModule={activeModule} onClick={() => {}} />
      </div>
    </div> */
}
