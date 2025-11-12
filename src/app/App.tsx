/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import "@app/App.css";
import Splitter from "@components/ui/Splitter";
import DataSelectionContainer from "@features/data-selection/DataSelectionContainer";
import FeasibilityContainer from "@features/feasibility/feasibility-builder/FeasibilityContainer";

function App() {
  return (
    <>
      <main className="w-full h-full flex rounded-lg m-auto">
        <Splitter
          leftChild={({ toggleLeftPanel, isMinWidthReached }) => (
            <DataSelectionContainer
              onToggle={toggleLeftPanel}
              isMinWidthReached={isMinWidthReached}
            />
          )}
          rightChild={<FeasibilityContainer />}
        />
        {/* <div
          ref={containerRef}
          className="flex h-screen w-full overflow-hidden bg-gray-50"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <DataSelectionContainer />
          <div
            className="w-1 bg-gray-200 hover:bg-gray-400 cursor-col-resize"
            onMouseDown={handleMouseDown}
          ></div>
          <FeasibilityContainer />
        </div> */}
      </main>
    </>
  );
}

export default App;
