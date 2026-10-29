/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import type { QueryJob } from "./type";
import { queryJobStatusMessages } from "@app/constants/httpStatusMessages";
import { ChevronDown, ChevronUp, FileJson } from "lucide-react";

type QueryDetails = {
  expandedQueryId: string;
  queryJob: QueryJob;
};

const QueryDetails = ({ expandedQueryId, queryJob }: QueryDetails) => {
  const [isStatementExpanded, setIsStatementExpanded] = useState(false);

  return (
    <>
      {expandedQueryId === queryJob.id && (
        <div>
          {/* เส้นแบ่งระหว่าง Row กับ Details */}
          <div className="mx-2 border-t border-blue-300" />

          {/* Abfrage-Details */}
          <div className="bg-blue-50 p-2">
            <div className="m-2">
              {/* Metadaten และ Abfrage-Statement */}
              <section className="rounded-lg border border-blue-100 bg-white p-4 mt-2">
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-500">Abfrage-ID</p>
                    <p className="break-words font-medium">{queryJob.id}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="break-words font-medium">
                      {queryJob.name.length > 0 ? queryJob.name : "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">
                      {queryJobStatusMessages[queryJob.status]?.label ??
                        queryJobStatusMessages.default.label}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Erstelldatum</p>
                    <p className="break-words font-medium">
                      {queryJob.createdAt}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Dauer</p>
                    <p className="break-words font-medium">
                      {queryJob.resultDuration
                        ? queryJob.resultDuration + "Sekunden"
                        : "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Anzahl der Patienten
                    </p>
                    <p className="break-words font-medium">
                      {queryJob.resultMessage ? queryJob.resultMessage : "-"}
                    </p>
                  </div>
                </div>
              </section>

              {/* JSON Statement */}
              <section className="mt-4 overflow-hidden rounded-lg border border-blue-100 bg-white">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 p-3 text-left hover:bg-gray-50"
                  aria-expanded={isStatementExpanded}
                  onClick={() => setIsStatementExpanded((prev) => !prev)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600">
                      <FileJson className="h-5 w-5 text-blue-600" />
                    </span>

                    <div>
                      <h4 className="font-medium text-gray-800">
                        Abfrage-Statement
                      </h4>
                      <p className="text-sm text-gray-500">JSON</p>
                    </div>
                  </div>

                  {isStatementExpanded ? (
                    <ChevronUp className="h-5 w-5 text-blue-700" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-700" />
                  )}
                </button>

                {isStatementExpanded && (
                  <div className="border-t border-gray-200 bg-gray-950 p-4">
                    <pre className="max-h-96 overflow-auto whitespace-pre-wrap break-words font-mono text-sm text-gray-100">
                      {JSON.stringify(queryJob.query, null, 2)}
                    </pre>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QueryDetails;
