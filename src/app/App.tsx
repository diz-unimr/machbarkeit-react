/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import "@/app/App.css";
import SplitView from "@/components/layout/SplitView";
import DataSelectionPanel from "@/features/data-selection/DataSelectionPanel";
import FeasibilityPanel from "@/features/feasibility/feasibility-builder/FeasibilityPanel";
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
            <DataSelectionPanel onToggle={toggleLeftPanel} />
          )}
          rightChild={<FeasibilityPanel />}
        />
      </main>
    </>
  );
}

export default App;
