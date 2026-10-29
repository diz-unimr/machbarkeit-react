/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import React from "react";
import accordionArrow from "@assets/accordion-arrow.svg";
import ArrowButton from "./buttons/ArrowButton";
import Card from "./Card";

type CollapsibleProps = {
  children: React.ReactNode;
  label: string;
  isPanelExpanded: boolean;
  onToggleCriteriaPanel: () => void;
};
const CollapsiblePanel = ({
  children,
  label,
  isPanelExpanded,
  onToggleCriteriaPanel,
}: CollapsibleProps) => {
  return (
    <div
      className="flex flex-col min-h-0 overflow-hidden"
      style={{
        height: isPanelExpanded ? "100%" : "fit-content",
        borderBottom: !isPanelExpanded
          ? "1.5px solid var(--color-border)"
          : undefined,
      }}
    >
      <div className="flex justify-between py-2 px-1">
        <p className="text-lg font-medium">{label}</p>
        <ArrowButton
          id="characteristic-btn"
          image={accordionArrow}
          mode="rotate-left"
          isExpanded={isPanelExpanded}
          onClick={onToggleCriteriaPanel}
        />
      </div>
      <div className={`min-h-0 ${isPanelExpanded ? "flex-1" : "hidden"}`}>
        <Card
          className="flex flex-col flex-1 h-full"
          bodyClassName="flex flex-col flex-1 min-h-0 overflow-hidden"
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

export default CollapsiblePanel;
