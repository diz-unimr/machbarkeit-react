/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import { Clock } from "lucide-react";
import ActionsButton from "@components/ui/buttons/ActionsButton";
import type {
  Attribute,
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

  const jobAttributes: Attribute<QueryJob>[] = [
    {
      name: "Name",
      showInRow: true,
      columnWidth: "minmax(0,2fr)",
      className: "min-w-0 max-w-[90%] truncate",
      render: (query: QueryJob) => query.name ?? `Abfrage ${query.id}`,
    },
    {
      name: "Status",
      showInRow: true,
      columnWidth: "minmax(0,0.8fr)",
      className: "",
      render: (queryJob: QueryJob) => {
        const messagesClassName = [
          queryJobStatusMessages[queryJob.status]?.borderColor,
          queryJobStatusMessages[queryJob.status]?.bgColor,
          queryJobStatusMessages[queryJob.status]?.textColor,
        ].join(" ");
        return (
          <div
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl border px-3 py-1 text-sm font-medium ${
              messagesClassName
            }`}
          >
            {queryJobStatusMessages[queryJob.status]?.label ??
              queryJobStatusMessages.default.label}
          </div>
        );
      },
      renderDetail: (queryJob: QueryJob) => (
        <div
          className={`${queryJobStatusMessages[queryJob.status]?.textColor}`}
        >
          {queryJobStatusMessages[queryJob.status]?.label ??
            queryJobStatusMessages.default.label}
        </div>
      ),
    },
    {
      name: "Ausführungsdatum",
      showInRow: true,
      columnWidth: "minmax(0,1.2fr)",
      className: "whitespace-nowrap",
      render: (queryJob: QueryJob) => {
        const { date, time } = formatDateTime(queryJob.date);
        return (
          <>
            <div>{date}</div>
            <div className="text-xs text-[#64748B]">{time}</div>
          </>
        );
      },
      renderDetail: (queryJob: QueryJob) => {
        const { date, time } = formatDateTime(queryJob.date);
        return (
          <>
            <span>{date}</span>{" "}
            <span className="text-xs text-[#64748B]">{time}</span>
          </>
        );
      },
    },
    {
      name: "Dauer",
      showInRow: false,
      columnWidth: "",
      render: (queryJob: QueryJob) =>
        queryJob.duration ? queryJob.duration + "Sekunden" : "-",
    },
    {
      name: "Anzahl der Patienten",
      showInRow: false,
      columnWidth: "",
      render: (queryJob: QueryJob) => queryJob.result ?? "-",
    },
    {
      name: "Aktionen",
      showInRow: true,
      columnWidth: "minmax(0,1fr)",
      className: "justify-center",
      render: (queryJob: QueryJob) => (
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
      ),
    },
  ];

  const rowAttributes = jobAttributes.filter(
    (attribute) => attribute.showInRow,
  );
  const gridClass = {
    gridTemplateColumns: rowAttributes
      .map((attribute) => attribute.columnWidth)
      .join(" "),
  };

  const handleSaveQuery = (id: string) => {
    console.log(id);
  };

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
          <TableHeader gridClass={gridClass}>
            {rowAttributes.map((jobAttribute) => (
              <TableCell key={jobAttribute.name}>{jobAttribute.name}</TableCell>
            ))}
          </TableHeader>

          {/* Rows */}
          <div
            className="min-h-0 min-w-0 pr-2 flex-1 overflow-y-auto overflow-x-hidden"
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
                      gridClass={gridClass}
                      isExpanded={isExpanded}
                      onClick={() =>
                        setExpandedQueryId((currentId) =>
                          currentId === queryJob.id ? null : queryJob.id,
                        )
                      }
                    >
                      {rowAttributes.map((attribute) => (
                        <TableCell
                          key={attribute.name}
                          className={attribute.className}
                        >
                          {attribute.render ? attribute.render(queryJob) : "-"}
                        </TableCell>
                      ))}
                    </TableRow>

                    {isExpanded && (
                      <div className="bg-blue-50 p-2">
                        <QueryDetails
                          expandedQueryId={expandedQueryId}
                          queryDetails={queryJob}
                          attributes={jobAttributes}
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
