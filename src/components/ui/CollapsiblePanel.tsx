/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import React from "react";
import accordionArrow from "@assets/accordion-arrow.svg";
import ArrowButton from "./buttons/ArrowButton";
import Card from "./Card";

type CollapsibleProps = {
  icon?: React.ReactNode;
  iconBg?: string;
  children: React.ReactNode;
  title: string;
  subtitle: string;
  isPanelExpanded: boolean;
  onToggleCriteriaPanel: () => void;
};
const CollapsiblePanel = ({
  icon,
  iconBg,
  children,
  title,
  subtitle,
  isPanelExpanded,
  onToggleCriteriaPanel,
}: CollapsibleProps) => {
  return (
    <Card
      className={`flex flex-col min-h-0 overflow-hidden ${
        isPanelExpanded
          ? "flex-1"
          : "shrink-0 h-fit 1.5px solid var(--color-border)"
      }`}
    >
      <div className="flex justify-between mb-3 pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ backgroundColor: iconBg }}
          >
            {icon}
          </div>
          <div>
            <p className="text-lg font-semibold text-[#01014F]">{title}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        <ArrowButton
          id="characteristic-btn"
          image={accordionArrow}
          mode="rotate-left"
          isExpanded={isPanelExpanded}
          onClick={onToggleCriteriaPanel}
        />
      </div>
      <div
        className={`min-h-0 ${isPanelExpanded ? "flex flex-1 flex-col" : "hidden"}`}
      >
        {children}
      </div>
    </Card>
  );
};

export default CollapsiblePanel;
