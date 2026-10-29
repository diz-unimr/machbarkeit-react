/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import type { QueryJob } from "@features/query-management/type";
import ActionsButton from "@components/buttons/ActionsButton";
import { queryJobStatusMessages } from "@app/constants/httpStatusMessages";
import CollapsiblePanel from "@/components/CollapsiblePanel";
import { TableCell, TableHeader, TableRow } from "@/components/QueryTable";
import QueryDetails from "./QueryDetails";

type QueryJobsProps = {
  queryJobs: QueryJob[];
};

const QueryJobs = ({ queryJobs }: QueryJobsProps) => {
  const [isQueryJobsExpanded, setIsQueryJobsExpanded] = useState<boolean>(true);
  const [expandedQueryId, setExpandedQueryId] = useState<string | null>(null);

  const gridColumns =
    "grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] items-center";

  return (
    <CollapsiblePanel
      label="Abfrageverlauf"
      isPanelExpanded={isQueryJobsExpanded}
      onToggleCriteriaPanel={() => setIsQueryJobsExpanded((prev) => !prev)}
    >
      <div className="min-h-0 flex-1 flex flex-col gap-3 overflow-hidden">
        {/* Header */}
        <TableHeader gridClass={gridColumns}>
          <TableCell className="text-left font-medium">ID</TableCell>
          <TableCell className="font-medium">Name</TableCell>
          <TableCell className="font-medium">Status</TableCell>
          <TableCell className="font-medium">Erstelldatum</TableCell>
          <TableCell className="font-medium">Ergebnis</TableCell>
          <TableCell className="font-medium">Aktionen</TableCell>
        </TableHeader>

        {/* Rows */}
        <div
          className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-white"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="flex flex-col gap-2">
            {/* Todo: isLoading... */}
            {queryJobs.length === 0 ? (
              <div className="flex min-h-20 items-center justify-center">
                <p className="text-center">Keine Abfragen vorhanden.</p>
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

                      <TableCell
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl border px-3 py-1 text-sm font-medium ${
                          queryJobStatusMessages[queryJob.status]?.className ??
                          queryJobStatusMessages.default.className
                        }`}
                      >
                        {queryJobStatusMessages[queryJob.status].label}
                      </TableCell>

                      <TableCell className="break-words">
                        {queryJob.createdAt}
                      </TableCell>

                      <TableCell className="break-words">
                        {queryJob.resultMessage}
                      </TableCell>

                      <TableCell>
                        <div onClick={(event) => event.stopPropagation()}>
                          <ActionsButton
                            actions={["run", "edit", "save"]}
                            queryId={queryJob.id}
                          />
                        </div>
                      </TableCell>
                    </TableRow>

                    {expandedQueryId === queryJob.id && (
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

export default QueryJobs;
