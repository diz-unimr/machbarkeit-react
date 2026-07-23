/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState, type ReactNode } from "react";
import ArrowButton from "@/components/ui/buttons/ArrowButton";
import Card from "@/components/ui/Card";
import accordionArrow from "@assets/accordion-arrow.svg";

type QueryManagementPanelProps = {
  headerName: string;
  children: ReactNode;
};
const QueryManagementPanel = ({
  headerName,
  children,
}: QueryManagementPanelProps) => {
  const [expandedPanel, setExpandedPanel] = useState<boolean>(true);

  return (
    <div
      className={`min-h-0 transition-all
                    duration-1000 ${expandedPanel ? "flex-1" : "min-h-18"}`}
    >
      <Card className="h-full flex-1" bodyClassName="overflow-hidden">
        <div className="flex gap-4">
          <ArrowButton
            id="query-jobs-btn"
            image={accordionArrow}
            mode="rotate-right"
            isExpanded={expandedPanel}
            onClick={() => setExpandedPanel((prev) => !prev)}
          />
          <p className="text-lg font-medium">{headerName}</p>
        </div>
        <div
          className={`
                    transition-all
                    duration-1000
                    ease-in-out
                    ${expandedPanel ? "flex-1 flex min-h-0 opacity-100" : "h-0 opacity-0"}
                `}
        >
          {children}
        </div>
      </Card>
    </div>
  );
};

export default QueryManagementPanel;
