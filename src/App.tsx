/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */
/* import { useState } from 'react' */

import "./App.css";
import AttributeList from "./features/attribute-list/AttributeList";
import FeasibilityContainer from "./features/feasibility/FeasibilityContainer";

function App() {
  return (
    <>
      <div className="w-full h-full flex rounded-lg">
        <AttributeList />
        <FeasibilityContainer />
      </div>
    </>
  );
}

export default App;
