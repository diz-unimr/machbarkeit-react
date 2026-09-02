/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import ArrowButton from "@/components/ui/buttons/ArrowButton";
import accordionArrow from "@/assets/accordion-arrow.svg";
import type { ReactNode } from "react";

type CollapsiblePanelProps = {
  label: string;
  onToggle: () => void;
  isExpanded: boolean;
  children: ReactNode;
};

const CollapsiblePanel = ({
  label,
  onToggle,
  isExpanded,
  children,
}: CollapsiblePanelProps) => {
  return (
    <div
      className={`flex flex-col flex-1 min-h-0 ${isExpanded ? "max-h-[85%]" : "max-h-15"}`}
      style={{
        height: isExpanded ? "100%" : "fit-content",
        borderBottom: !isExpanded
          ? "1.5px solid var(--color-border)"
          : undefined,
      }}
    >
      <div className="flex py-3 justify-between">
        <p className="text-lg font-medium">{label}</p>
        <ArrowButton
          id="characteristic-btn"
          image={accordionArrow}
          mode="rotate-left"
          isExpanded={isExpanded}
          onClick={onToggle}
        />
      </div>
      <div
        className="flex flex-col w-full flex-1 min-h-0 pb-3"
        style={{
          display: isExpanded ? "flex" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsiblePanel;
