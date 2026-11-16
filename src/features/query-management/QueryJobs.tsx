/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import { Clock } from "lucide-react";
import ActionsButton from "@components/ui/buttons/ActionsButton";
import type {
  QueryJob,
  QueryReference,
} from "@/features/query-management/types";
import { queryJobStatusMessages } from "@app/constants/httpStatusMessages";
import CollapsiblePanel from "@/components/ui/CollapsiblePanel";
import { TableCell, TableHeader, TableRow } from "@/components/ui/QueryTable";
import QueryDetails from "./QueryDetails";
import { formatDateTime } from "@/app/utils/formatDateTime";
import { commonTexts } from "@/app/constants/uiTexts";

type QueryJobsProps = {
  queryJobs: QueryJob[];
  onEdit: (queryReference: QueryReference) => void;
  onSave: (queryReference: QueryReference) => void;
};

const QueryJobs = ({ queryJobs, onEdit, onSave }: QueryJobsProps) => {
  const [isQueryJobsExpanded, setIsQueryJobsExpanded] = useState<boolean>(true);
  const [expandedQueryId, setExpandedQueryId] = useState<string | null>(null);

  const gridColumns =
    "grid grid-cols-[minmax(0,2fr)_minmax(0,0.8fr)_minmax(0,1.2fr)_minmax(0,0.6fr)_minmax(0,1fr)] items-center";

  return (
    <CollapsiblePanel
      icon={<Clock size={24} strokeWidth={2.5} color="#0A4CC5" />}
      iconBg="#DBEAFE"
      title="Abfrageverlauf"
      subtitle="Alle bisherigen Abfragen"
      isPanelExpanded={isQueryJobsExpanded}
      onToggleCriteriaPanel={() => setIsQueryJobsExpanded((prev) => !prev)}
    >
      <div className="min-h-0 flex-1 flex flex-col gap-5 overflow-hidden">
        <div className="min-h-0 flex-1 flex flex-col gap-3 overflow-hidden">
          {/* Header */}
          <TableHeader gridClass={gridColumns}>
            <TableCell className="font-medium">Name</TableCell>
            <TableCell className="font-medium">Status</TableCell>
            <TableCell className="font-medium">Erstelldatum</TableCell>
            <TableCell className="font-medium">Ergebnis</TableCell>
            <TableCell className="font-medium">Aktionen</TableCell>
          </TableHeader>

          {/* Rows */}
          <div
            className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden"
            style={{ scrollbarGutter: "stable" }}
          >
            {/* Todo: isLoading... */}
            {queryJobs.length === 0 ? (
              <div className="flex h-full min-h-full flex-col gap-2 items-center justify-center">
                <p className="py-5 text-center text-gray-500">
                  {commonTexts.noQueries}
                </p>
              </div>
            ) : (
              queryJobs.map((queryJob) => {
                const isExpanded = expandedQueryId === queryJob.id;
                const { date, time } = formatDateTime(queryJob.date);

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
                      <TableCell className="wrap-break-word">
                        {queryJob.name.length > 0 ? queryJob.name : "-"}
                      </TableCell>

                      <TableCell
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl border px-3 py-1 text-sm font-medium ${
                          queryJobStatusMessages[queryJob.status]?.className ??
                          queryJobStatusMessages.default.className
                        }`}
                      >
                        {queryJobStatusMessages[queryJob.status].label}
                      </TableCell>

                      <TableCell className="wrap-break-word">
                        <div className="text-[#334155]">{date}</div>
                        <div className="text-xs text-[#64748B]">{time}</div>
                      </TableCell>

                      <TableCell className="wrap-break-word">
                        {queryJob.result ?? "-"}
                      </TableCell>

                      <TableCell>
                        <div onClick={(event) => event.stopPropagation()}>
                          <ActionsButton
                            actions={["restart", "save"]}
                            onEdit={onEdit}
                            onSave={onSave}
                            queryReference={{
                              type: "queryJob",
                              id: queryJob.id,
                              query: queryJob.query,
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>

                    {expandedQueryId === queryJob.id && (
                      <div className="bg-blue-50 p-2">
                        <QueryDetails
                          type="queryJob"
                          expandedQueryId={expandedQueryId}
                          queryDetails={queryJob}
                          date={date}
                          time={time}
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
