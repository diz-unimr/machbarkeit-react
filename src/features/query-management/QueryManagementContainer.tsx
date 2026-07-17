/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import ArrowButton from "@/components/ui/buttons/ArrowButton";
import Card from "@/components/ui/Card";
import accordionArrow from "@assets/accordion-arrow.svg";
import ActionsButton from "./ActionsButton";

/* type QueryManagementContainerProps = {

}; */

const QueryManagementContainer = () => {
  const [expandedPanel, setExpandedPanel] = useState<string[]>([]);

  return (
    <div className="flex w-full h-screen p-6 overflow-hidden">
      <Card
        header="Abfrageverwaltung"
        headerClassName="text-2xl font-bold text-black border-b-1 border-gray-300"
      >
        <div className="flex flex-col p-5 overflow-hidden">
          <div className="flex flex-col gap-6">
            <Card>
              <div className="flex gap-4">
                <ArrowButton
                  id="query-jobs-btn"
                  image={accordionArrow}
                  mode="rotate-right"
                  isExpanded={expandedPanel.includes("query-jobs-btn")}
                  onClick={() =>
                    setExpandedPanel((prev) =>
                      prev.includes("query-jobs-btn")
                        ? prev.filter((id) => id !== "query-jobs-btn")
                        : [...prev, "query-jobs-btn"],
                    )
                  }
                />
                <p className="text-lg font-medium">Abfrageverlauf</p>
              </div>
              <div
                className={`
                    transition-all
                    duration-1000
                    ease-in-out
                    ${expandedPanel.includes("query-jobs-btn") ? "visible max-h-80 opacity-100" : "invisible max-h-0 opacity-0"}
                `}
              >
                <div className="max-h-80 pt-4 overflow-y-auto">
                  <div className="w-ful flex flex-col gap-2">
                    {/* Header */}
                    <div className="flex items-center rounded-md bg-[#FAFAFA] px-4 py-2 text-center">
                      <div className="min-w-0 flex-1 text-left font-medium">
                        Name
                      </div>

                      <div className="w-32 shrink-0 font-medium">Status</div>

                      <div className="w-38 shrink-0 font-medium">Datum</div>

                      <div className="w-32 shrink-0 font-medium">Actions</div>
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col gap-2">
                      <div
                        id="1"
                        className="flex items-center px-4 py-2 text-center"
                      >
                        <div className="min-w-0 flex-1 text-left">
                          COPD-Abfrage
                        </div>

                        <div className="w-32 shrink-0 text-green-600 font-bold">
                          Fertig
                        </div>

                        <div className="w-38 shrink-0">16.07.2026</div>

                        <div className="w-32 shrink-0">
                          <ActionsButton queryId="1" />
                        </div>
                      </div>

                      <div
                        id="2"
                        className="flex items-center px-4 py-2 text-center"
                      >
                        <div className="min-w-0 flex-1 text-left">
                          Asthma-Abfrage
                        </div>

                        <div className="w-32 shrink-0 text-yellow-400 font-bold">
                          Ausstehend
                        </div>

                        <div className="w-38 shrink-0">15.07.2026</div>

                        <div className="w-32 shrink-0">
                          <ActionsButton queryId="2" />
                        </div>
                      </div>

                      <div
                        id="3"
                        className="flex items-center px-4 py-2 text-center"
                      >
                        <div className="min-w-0 flex-1 text-left">
                          Asthma-Abfrage
                        </div>

                        <div className="w-32 shrink-0 text-red-600 font-bold">
                          Fehlgeschlagen
                        </div>

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
                      <div className="min-w-0 flex-1 text-left font-medium">
                        Name
                      </div>

                      <div className="w-32 shrink-0 font-medium">Status</div>

                      <div className="w-38 shrink-0 font-medium">Datum</div>

                      <div className="w-32 shrink-0 font-medium">Actions</div>
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col gap-2">
                      <div
                        id="1"
                        className="flex items-center px-4 py-2 text-center"
                      >
                        <div className="min-w-0 flex-1 text-left">
                          COPD-Abfrage
                        </div>

                        <div className="w-32 shrink-0 text-green-600 font-bold">
                          Fertig
                        </div>

                        <div className="w-38 shrink-0">16.07.2026</div>

                        <div className="w-32 shrink-0">
                          <ActionsButton queryId="1" />
                        </div>
                      </div>

                      <div
                        id="2"
                        className="flex items-center px-4 py-2 text-center"
                      >
                        <div className="min-w-0 flex-1 text-left">
                          Asthma-Abfrage
                        </div>

                        <div className="w-32 shrink-0 text-yellow-400 font-bold">
                          Ausstehend
                        </div>

                        <div className="w-38 shrink-0">15.07.2026</div>

                        <div className="w-32 shrink-0">
                          <ActionsButton queryId="2" />
                        </div>
                      </div>

                      <div
                        id="3"
                        className="flex items-center px-4 py-2 text-center"
                      >
                        <div className="min-w-0 flex-1 text-left">
                          Asthma-Abfrage
                        </div>

                        <div className="w-32 shrink-0 text-red-600 font-bold">
                          Fehlgeschlagen
                        </div>

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
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QueryManagementContainer;
