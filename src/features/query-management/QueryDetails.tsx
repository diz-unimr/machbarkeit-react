/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { QueryJob, SavedQuery } from "./types";
import { queryJobStatusMessages } from "@app/constants/httpStatusMessages";

type QueryDetails =
  | {
      type: "queryJob";
      expandedQueryId: string;
      queryDetails: QueryJob;
      date?: string;
      time?: string;
    }
  | {
      type: "savedQuery";
      expandedQueryId: string;
      queryDetails: SavedQuery;
      date?: string;
      time?: string;
    };

const QueryDetails = ({
  type,
  expandedQueryId,
  queryDetails,
  date,
  time,
}: QueryDetails) => {
  return (
    <>
      {expandedQueryId === queryDetails?.id && (
        <div>
          {/* Line between Row and Details */}
          <div className="mx-2 border-t border-blue-300" />

          {/* Abfrage-Details */}
          <div className="bg-blue-50 p-2">
            <div className="m-2">
              {/* Metadaten and Abfrage-Statement */}
              <section className="rounded-lg border border-blue-100 bg-white p-4 mt-2">
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {type === "queryJob" && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="wrap-break-word font-medium">
                          {queryDetails.name ?? "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium">
                          {queryJobStatusMessages[queryDetails.status]?.label ??
                            queryJobStatusMessages.default.label}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Ausführungsdatum
                        </p>
                        <span className="wrap-break-word font-medium">
                          {date}
                        </span>
                        <span> </span>
                        <span className="text-sm text-gray-800">{time}</span>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Dauer</p>
                        <p className="wrap-break-word font-medium">
                          {queryDetails.duration
                            ? queryDetails.duration + "Sekunden"
                            : "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Anzahl der Patienten
                        </p>
                        <p className="wrap-break-word font-medium">
                          {queryDetails.result || queryDetails.result === 0
                            ? queryDetails.result
                            : "-"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QueryDetails;
