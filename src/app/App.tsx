/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import "@app/App.css";
import Splitter from "@/components/Splitter";
import DataSelectionContainer from "@features/data-selection/DataSelectionContainer";
import FeasibilityContainer from "@features/feasibility/feasibility-builder/FeasibilityContainer";
import login from "./services/loginService";
import { useEffect, useState } from "react";
import QueryManagementPanel from "@/features/query-management/QueryManagementPanel";

function App() {
  const [isQueryManagementOpen, setIsQueryManagementOpen] = useState(false);
  useEffect(() => {
    login().catch(console.error);
  }, []);

  return (
    <>
      <main className="relative h-full min-h-0">
        <Splitter
          leftChild={({ toggleLeftPanel }) => (
            <DataSelectionContainer onToggle={toggleLeftPanel} />
          )}
          rightChild={
            <FeasibilityContainer
              onShowQueryManagement={() => setIsQueryManagementOpen(true)}
            />
          }
        />
        {isQueryManagementOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center
                     bg-gray-900/50 p-4"
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="query-management-title"
              className="flex max-h-[90dvh] w-full max-w-6xl flex-col
                       overflow-hidden rounded-xl bg-white shadow-2xl"
            >
              <QueryManagementPanel
                onClose={() => setIsQueryManagementOpen(false)}
              />
            </section>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
