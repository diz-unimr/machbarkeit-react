/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import Card from "@/components/ui/Card";
import ActionsButton from "./ActionsButton";
import { useState } from "react";
import ArrowButton from "@/components/ui/buttons/ArrowButton";
import accordionArrow from "@assets/accordion-arrow.svg";

const SavedQuery = () => {
  const [expandedPanel, setExpandedPanel] = useState<string[]>([]);
  return (
    <Card>
      <div className="flex gap-4">
        <ArrowButton
          id="saved-query-btn"
          image={accordionArrow}
          mode="rotate-right"
          isExpanded={expandedPanel.includes("saved-query-btn")}
          onClick={() =>
            setExpandedPanel((prev) =>
              prev.includes("saved-query-btn")
                ? prev.filter((id) => id !== "saved-query-btn")
                : [...prev, "saved-query-btn"],
            )
          }
        />
        <p className="text-lg font-medium">Gespeicherte Abfragen</p>
      </div>
      <div
        className={`
                    transition-all
                    duration-1000
                    ease-in-out
                    ${expandedPanel.includes("saved-query-btn") ? "visible max-h-80 opacity-100" : "invisible max-h-0 opacity-0"}
                `}
      >
        <div className="max-h-80 pt-4 overflow-y-auto">
          <div className="w-ful flex flex-col gap-2">
            {/* Header */}
            <div className="flex items-center rounded-md bg-[#FAFAFA] px-4 py-2 text-center">
              <div className="min-w-0 flex-1 text-left font-medium">Name</div>
              <div className="w-38 shrink-0 font-medium">Erstelldatum</div>
              <div className="w-38 shrink-0 font-medium">Änderungsdatum</div>
              <div className="w-32 shrink-0 font-medium">Aktionen</div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-2">
              <div id="1" className="flex items-center px-4 py-2 text-center">
                <div className="min-w-0 flex-1 text-left">COPD-Abfrage</div>

                <div className="w-38 shrink-0">12.04.2026</div>

                <div className="w-38 shrink-0">16.07.2026</div>

                <div className="w-32 shrink-0">
                  <ActionsButton queryId="1" />
                </div>
              </div>

              <div id="2" className="flex items-center px-4 py-2 text-center">
                <div className="min-w-0 flex-1 text-left">Asthma-Abfrage</div>

                <div className="w-38 shrink-0">16.05.2026</div>

                <div className="w-38 shrink-0">15.07.2026</div>

                <div className="w-32 shrink-0">
                  <ActionsButton queryId="2" />
                </div>
              </div>

              <div id="3" className="flex items-center px-4 py-2 text-center">
                <div className="min-w-0 flex-1 text-left">Asthma-Abfrage</div>
                <div className="w-38 shrink-0">16.06.2026</div>
                <div className="w-38 shrink-0">18.07.2026</div>
                <div className="w-32 shrink-0">
                  <ActionsButton queryId="3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SavedQuery;
