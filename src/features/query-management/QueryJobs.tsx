/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import useQueries from "@app/hooks/useQueries";
import Card from "@/components/ui/Card";
import ActionsButton from "./ActionsButton";
import ArrowButton from "@/components/ui/buttons/ArrowButton";
import accordionArrow from "@assets/accordion-arrow.svg";
import { queryJobStatusMessages } from "@app/constants/httpStatusMessage";

const QueryJobs = () => {
  const [expandedPanel, setExpandedPanel] = useState<boolean>(true);
  const { queryJobs, savedQueries } = useQueries();

  return (
    <Card>
      <div className="flex gap-4">
        <ArrowButton
          id="query-jobs-btn"
          image={accordionArrow}
          mode="rotate-right"
          isExpanded={expandedPanel}
          onClick={() => setExpandedPanel((prev) => !prev)}
        />
        <p className="text-lg font-medium">Abfrageverlauf</p>
      </div>
      <div
        className={`
                    transition-all
                    duration-1000
                    ease-in-out
                    ${expandedPanel ? "visible max-h-80 opacity-100" : "invisible max-h-0 opacity-0"}
                `}
      >
        <div className="max-h-80 pt-4 overflow-y-auto">
          <div className="w-ful flex flex-col gap-2">
            {/* Header */}
            <div className="flex items-center rounded-md bg-[#FAFAFA] px-4 py-2 text-center">
              <div className="min-w-0 flex-1 text-left font-medium">Name</div>
              <div className="w-38 shrink-0 font-medium">Status</div>
              <div className="w-52 shrink-0 font-medium">Erstelldatum</div>
              <div className="w-32 shrink-0 font-medium">Aktionen</div>
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-2">
              {queryJobs.map((queryJob) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QueryJobs;
