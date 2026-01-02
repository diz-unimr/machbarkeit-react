/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import "@app/App.css";
import Splitter from "@components/ui/Splitter";
import DataSelectionContainer from "@features/data-selection/DataSelectionContainer";
import FeasibilityContainer from "@features/feasibility/feasibility-builder/FeasibilityContainer";
// import { login } from "./services/loginService";

function App() {
  /* login(); */
  return (
    <>
      <main>
        <Splitter
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
