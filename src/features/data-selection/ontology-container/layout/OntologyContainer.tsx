/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import { ModulesPanel } from "../modules/ModulesPanel";
import type { Module } from "@app/types/ontologyType";
import OntologyTreePanel from "../ontology/OntologyTreePanel";

type OntologyContainerProps = {
  onSetPanelStatus: () => void;
  isOntologyContainerOpen: boolean;
};

export default function OntologyContainer({
  isOntologyContainerOpen,
}: OntologyContainerProps) {
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {" "}
      {/* border-b-[2px] border-[var(--color-border)] */}
      <div className="flex justify-between px-4 py-3">
        <p className="font-medium">Merkmale</p>
        {/* <ArrowButton
          id="characteristic-btn"
          image={accordionArrow}
          mode="rotate-left"
          width="28"
          isExpanded={isOntologyContainerOpen}
          onClick={onSetPanelStatus}
        /> */}
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
        <OntologyTreePanel activeModule={activeModule} onClick={() => {}} />
      </div>
    </div>
  );
}
