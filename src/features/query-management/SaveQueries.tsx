/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import ActionsButton from "@components/buttons/ActionsButton";
import CollapsiblePanel from "@/components/CollapsiblePanel";
import type { QueryJob } from "@features/query-management/type";
import { TableHeader, TableRow, TableCell } from "@components/QueryTable";
import QueryDetails from "./QueryDetails";

type SavedQueryProps = {
  queryJobs: QueryJob[];
};

const SavedQuery = ({ queryJobs }: SavedQueryProps) => {
  const [expandedQueryId, setExpandedQueryId] = useState<string | null>(null);
  const [isSavedQueriesExpanded, setIsSavedQueriesExpanded] =
    useState<boolean>(true);

  const gridColumns =
    "grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] items-center";

  return (
    <CollapsiblePanel
      label="Gespeicherte Abfragen"
      isPanelExpanded={isSavedQueriesExpanded}
      onToggleCriteriaPanel={() => setIsSavedQueriesExpanded((prev) => !prev)}
    >
      <div className="min-h-0 flex-1 flex flex-col gap-3">
        <TableHeader gridClass={gridColumns}>
          <TableCell className="text-left font-medium">ID</TableCell>
          <TableCell className="font-medium">Name</TableCell>
          <TableCell className="font-medium">Erstelldatum</TableCell>
          <TableCell className="font-medium">Letzte Änderung</TableCell>
          <TableCell className="font-medium">Aktionen</TableCell>
        </TableHeader>
        <div
          className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-white"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="flex flex-col gap-2">
            {queryJobs.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                Keine Abfragen vorhanden.
              </div>
            ) : (
              queryJobs.map((queryJob) => {
                const isExpanded = expandedQueryId === queryJob.id;

                return (
                  <div
                    key={queryJob.id}
                    className={
                      isExpanded
                        ? "overflow-hidden rounded-lg border border-blue-300"
                        : ""
                    }
                  >
                    <TableRow
                      gridClass={gridColumns}
                      isExpanded={isExpanded}
                      onClick={() =>
                        setExpandedQueryId((currentId) =>
                          currentId === queryJob.id ? null : queryJob.id,
                        )
                      }
                    >
                      <TableCell className="break-words text-left">
                        {queryJob.id}
                      </TableCell>

                      <TableCell className="break-words">
                        {queryJob.name}
                      </TableCell>

                      <TableCell className="break-words">
                        {queryJob.createdAt}
                      </TableCell>

                      <TableCell className="break-words">
                        {queryJob.createdAt}
                      </TableCell>

                      <TableCell>
                        <div onClick={(event) => event.stopPropagation()}>
                          <ActionsButton
                            actions={["run", "edit", "delete"]}
                            queryId={queryJob.id}
                          />
                        </div>
                      </TableCell>
                    </TableRow>

                    {isExpanded && (
                      <div className="bg-blue-50 p-2">
                        <QueryDetails
                          expandedQueryId={expandedQueryId}
                          queryJob={queryJob}
                        />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </CollapsiblePanel>
  );
};

export default SavedQuery;

/* 

        <div className="flex shrink-0 items-center rounded-md bg-[#FAFAFA] px-4 py-2 text-center">
          <div className="min-w-0 flex-1 text-left font-medium">Name</div>
          <div className={`w-38 ${headerClass}`}>Erstelldatum</div>
          <div className={`w-38 ${headerClass}`}>Änderungsdatum</div>
          <div className={`w-32 ${headerClass}`}>Aktionen</div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto">
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
            <div className="min-w-0 flex-1 text-left">Asthma-Abfrage1</div>
            <div className="w-38 shrink-0">16.06.2026</div>
            <div className="w-38 shrink-0">18.07.2026</div>
            <div className="w-32 shrink-0">
              <ActionsButton queryId="3" />
            </div>
          </div>
        </div>
*/
