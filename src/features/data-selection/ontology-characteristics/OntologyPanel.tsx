/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import ModulesPanel from "./modules/ModulesPanel";
import type { Module } from "@/app/types/ontologyType";
import OntologyTreePanel from "./ontologies/OntologyTreePanel";
import CollapsiblePanel from "@/components/ui/CollapsiblePanel";
import Card from "@/components/ui/Card";

type OntologyProps = {
  onSetPanelStatus: () => void;
  isOntologyContainerOpen: boolean;
};

const OntologyPanel = ({
  onSetPanelStatus,
  isOntologyContainerOpen,
}: OntologyProps) => {
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  return (
    <CollapsiblePanel
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
    </CollapsiblePanel>
  );
};
export default OntologyPanel;
