/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import useQueries from "@app/hooks/useQueries";
import ActionsButton from "./ActionsButton";
import { queryJobStatusMessages } from "@app/constants/httpStatusMessage";
import QueryManagementPanel from "./QueryManagementPanel";

const QueryJobs = () => {
  const { queryJobs } = useQueries();

  const headerClass = "shrink-0 font-medium";

  return (
    <QueryManagementPanel headerName="Abfrageverlauf">
      <div className="min-h-0 flex-1 flex flex-col pt-4 gap-3">
        {/* Header */}
        <div className="flex shrink-0 items-center rounded-md bg-[#FAFAFA] px-4 py-2 text-center">
          <div className="min-w-0 flex-1 text-left font-medium">Name</div>
          <div className={`w-38 ${headerClass}`}>Status</div>
          <div className={`w-52 ${headerClass}`}>Erstelldatum</div>
          <div className={`w-32 ${headerClass}`}>Aktionen</div>
        </div>

        {/* Rows */}
        <div className="flex-1 min-h-0 overflow-y-auto">
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
                  className="flex items-center px-4 py-2 text-center"
                >
                  <div className="min-w-0 flex-1 text-left">
                    {queryJob.name}
                  </div>
                  <div
                    className={`w-38 shrink-0 ${queryJobStatusMessages[queryJob.status]?.className ?? queryJobStatusMessages.default.className} font-bold`}
                  >
                    {queryJobStatusMessages[queryJob.status]?.label ??
                      queryJobStatusMessages.default.label}
                  </div>
                  <div className="w-52 shrink-0">{queryJob.createdAt}</div>

                  <div className="w-32 shrink-0">
                    <ActionsButton queryId={queryJob.id} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </QueryManagementPanel>
  );
};

export default QueryJobs;
