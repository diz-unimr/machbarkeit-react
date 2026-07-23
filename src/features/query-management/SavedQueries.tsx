/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import ActionsButton from "./ActionsButton";
import QueryManagementPanel from "./QueryManagementPanel";

const SavedQuery = () => {
  const headerClass = "shrink-0 font-medium";
  return (
    <QueryManagementPanel headerName="Gespeicherte Abfragen">
      <div className="min-h-0 flex-1 flex flex-col pt-4 gap-3">
        {/* Header */}
        <div className="flex shrink-0 items-center rounded-md bg-[#FAFAFA] px-4 py-2 text-center">
          <div className="min-w-0 flex-1 text-left font-medium">Name</div>
          <div className={`w-38 ${headerClass}`}>Erstelldatum</div>
          <div className={`w-38 ${headerClass}`}>Änderungsdatum</div>
          <div className={`w-32 ${headerClass}`}>Aktionen</div>
        </div>

        {/* Rows */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div id="1" className="flex items-center px-4 py-2 text-center">
            {/* Todo: isLoading... */}
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
            <div className="min-w-0 flex-1 text-left">Asthma-Abfrage</div>
            <div className="w-38 shrink-0">16.06.2026</div>
            <div className="w-38 shrink-0">18.07.2026</div>
            <div className="w-32 shrink-0">
              <ActionsButton queryId="3" />
            </div>
          </div>
        </div>
      </div>
    </QueryManagementPanel>
  );
};

export default SavedQuery;
