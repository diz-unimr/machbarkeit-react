/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import { ModulesPanel } from "../modules/ModulesPanel";
import type { Module } from "@app/types/ontology";
import OntologyTreePanel from "../ontology/OntologyTreePanel";
import { ArrowButton } from "@components/ui/buttons/ArrowButton";
import accordionArrow from "@assets/accordion-arrow.svg";

type FeaturePanelProps = {
  onSetPanelStatus: () => void;
  isFeaturePanelOpen: boolean;
};

export default function FeaturePanel({
  onSetPanelStatus,
  isFeaturePanelOpen,
}: FeaturePanelProps) {
  const [activeModule, setActiveModule] = useState<Module | null>(null);

  return (
    <div className="flex flex-col border-b-[2px] border-[var(--color-border)]">
      <div className="flex justify-between px-4 py-3">
        <p className="font-medium">Merkmalen</p>
        <ArrowButton
          id="characteristic-btn"
          image={accordionArrow}
          mode="rotate-left"
          width="28"
          isExpanded={isFeaturePanelOpen}
          onClick={onSetPanelStatus}
        />
      </div>
      <div
        className="flex flex-col w-full h-[70vh] p-2"
        style={{
          display: isFeaturePanelOpen ? "flex" : "none",
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
