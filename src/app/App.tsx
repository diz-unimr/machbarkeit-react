/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import "@app/App.css";
import { Route, Routes } from "react-router-dom";
import Splitter from "@components/ui/Splitter";
import DataSelectionContainer from "@features/data-selection/DataSelectionContainer";
import FeasibilityContainer from "@features/feasibility/feasibility-builder/FeasibilityContainer";
import login from "./services/login-service";
import { useEffect } from "react";
import QueryManagementContainer from "@/features/query-management/QueryManagementContainer";

function App() {
  useEffect(() => {
    login().catch(console.error);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <main>
            <Splitter
              leftChild={({ toggleLeftPanel }) => (
                <DataSelectionContainer onToggle={toggleLeftPanel} />
              )}
              rightChild={<FeasibilityContainer />}
            />
          </main>
        }
      />

      <Route
        path="/queries-management"
        element={<QueryManagementContainer />}
      />
    </Routes>
  );
}

export default App;
