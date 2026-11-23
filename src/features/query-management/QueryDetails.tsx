/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Attribute } from "./types";

type QueryDetailsProps<T extends { id: string }> = {
  expandedQueryId: string;
  queryDetails: T;
  attributes: Attribute<T>[];
};

const QueryDetails = <T extends { id: string }>({
  expandedQueryId,
  queryDetails,
  attributes,
}: QueryDetailsProps<T>) => {
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
                  {attributes
                    .filter((attribute) => attribute.name !== "Aktionen")
                    .map((attribute) => (
                      <div key={attribute.name}>
                        <p className="text-sm text-gray-500">
                          {attribute.name}
                        </p>
                        <div className="pl-2 wrap-break-word font-medium">
                          {attribute.renderDetail
                            ? attribute.renderDetail(queryDetails)
                            : attribute.render(queryDetails)}
                        </div>
                      </div>
                    ))}
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
