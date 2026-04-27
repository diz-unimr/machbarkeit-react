/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import ModulesPanel from "../modules/ModulesPanel";
import type { Module } from "@app/types/ontologyType";
import OntologyTreePanel from "../ontologies/OntologyTreePanel";

type OntologyContainerProps = {
  onSetPanelStatus: () => void;
  isOntologyContainerOpen: boolean;
};

const OntologyContainer = ({
  isOntologyContainerOpen,
}: OntologyContainerProps) => {
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex justify-between px-4 py-3">
        <p className="font-medium">Merkmale</p>
      </div>
      <div
        className="flex flex-col w-full flex-1 min-h-0 p-2 pb-3"
        style={{
          display: isOntologyContainerOpen ? "flex" : "none",
        }}
      >
        <ModulesPanel
          onHandleModules={(currentModule) => setActiveModule(currentModule)}
        />
        <OntologyTreePanel activeModule={activeModule} />
      </div>
    </div>
  );
};
export default OntologyContainer;
