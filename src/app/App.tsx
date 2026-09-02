/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import "@/app/App.css";
import SplitView from "@/components/layout/SplitView";
import DataSelectionContainer from "@/features/data-selection/DataSelectionContainer";
import FeasibilityContainer from "@/features/feasibility/feasibility-builder/FeasibilityContainer";
import login from "./services/loginService";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    login().catch(console.error);
  }, []);

  return (
    <>
      <main>
        <SplitView
          leftChild={({ toggleLeftPanel }) => (
            <DataSelectionContainer onToggle={toggleLeftPanel} />
          )}
          rightChild={<FeasibilityContainer />}
        />
      </main>
    </>
  );
}

export default App;
