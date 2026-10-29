/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import useQueries from "@features/query-management/hooks/useQueries";
import ActionsButton from "@components/buttons/ActionsButton";
import { queryJobStatusMessages } from "@app/constants/httpStatusMessages";
import CollapsiblePanel from "@/components/CollapsiblePanel";

const QueryJobs = () => {
  const { queryJobs } = useQueries();
  const [isQueryJobsExpanded, setIsQueryJobsExpanded] = useState<boolean>(true);

  const headerClass = "min-w-0 font-medium"; // shrink-0 font-medium
  const gridColumns =
    "grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] items-center";

  useEffect(() => {
    console.log(queryJobs);
  });
  return (
    <CollapsiblePanel
      label="Abfrageverlauf"
      isPanelExpanded={isQueryJobsExpanded}
      onToggleCriteriaPanel={() => setIsQueryJobsExpanded((prev) => !prev)}
    >
      <div className="min-h-0 flex-1 flex flex-col gap-3 overflow-hidden">
        {/* Header */}
        <div
          className={`${gridColumns}  shrink-0 gap-2 rounded-md bg-[#FAFAFA] px-4 py-3 pr-[28px] text-center`}
        >
          <div className="min-w-0 text-left font-medium">ID</div>
          <div className={`${headerClass}`}>Name</div>
          <div className={`${headerClass}`}>Status</div>
          <div className={`${headerClass}`}>Erstelldatum</div>
          <div className={`${headerClass}`}>Aktionen</div>
        </div>

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
              queryJobs.map((queryJob) => (
                <div
                  key={queryJob.id}
                  className={`${gridColumns} cursor-pointer items-center rounded-md px-4 py-2 text-center transition-colors hover:bg-gray-50 gap-2 px-3 py-2 text-center`}
                >
                  <div className="min-w-0 wrap-break-word text-left">
                    {queryJob.id}
                  </div>
                  <div className="min-w-0 break-words">{queryJob.name}</div>
                  <div
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl border px-3 py-1 text-sm font-medium ${
                      queryJobStatusMessages[queryJob.status]?.className ??
                      queryJobStatusMessages.default.className
                    }`}
                  >
                    {queryJobStatusMessages[queryJob.status]?.label ??
                      queryJobStatusMessages.default.label}
                  </div>
                  <div className="min-w-0 break-words">
                    {queryJob.createdAt}
                  </div>

                  <div className="flex min-w-0 justify-center">
                    <ActionsButton queryId={queryJob.id} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </CollapsiblePanel>
  );
};

export default QueryJobs;
