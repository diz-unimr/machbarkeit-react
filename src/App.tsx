/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */
/* import { useState } from 'react' */

import "./App.css";
import AttributeList from "./features/attribute-list/AttributeList";

function App() {
  return (
    <>
      <div className="w-full h-full flex flex-col rounded-lg">
        <AttributeList />
      </div>
    </>
  );
}

export default App;
