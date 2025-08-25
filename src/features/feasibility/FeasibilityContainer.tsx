/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import { PrimaryButton, IconButton } from "../../components/ui/Button";
import InputTextField from "../../components/ui/InputTextField";
import OntologyTreePanel from "../ontology/OntologyTreePanel";
import Card from "../../components/ui/Card";

function FeasibilityContainer() {
  const [isOntolygyTreeOpen, setIsOntolygyTreeOpen] = useState(false);

  const handleClick = () => {
    setIsOntolygyTreeOpen(!isOntolygyTreeOpen);
  };

  return (
    <section
      id="feasibility-container"
      className="flex flex-col h-full w-[60%] max-w-[1000px] justify-between p-[20px] overflow-y-auto"
    >
      <div className="flex flex-col">
        {/* Feasibility output */}
        <div className="flex w-full justify-between items-center mb-5">
          <div className="flex h-[56px] border border-[#9ea9b3] rounded-md w-[45%] items-center p-3">
            <p>
              Anzahl der Patienten: <span>-</span>
            </p>
          </div>
          <div className="flex gap-2 w-[55%] justify-end">
            <PrimaryButton id="load-query" label="ZURÜCKSETZEN" />
            <PrimaryButton id="save-query" label="ABFRAGE STARTEN" />
          </div>
        </div>
        {/* Feasibility builder */}
        <div className="flex flex-col">
          {/* Search input */}
          {/* <div className="flex mb-5">
            <div className="flex flex-col w-full relativ border border-[#9ea9b3] rounded-md">
              <div className="flex w-full justify-center p-1 bg-[#5270a7] text-white text-lg font-medium">
                Einschlusskriterien
              </div>
              <div className="flex w-full justify-between p-4 pl-5 pr-5">
                <IconButton onClick={handleClick} />
                <div className="flex w-full max-w-[92%] text-[15px]">
                  <InputTextField
                    id="search-text"
                    label="Code oder Suchbegriff eingeben"
                  />
                </div>
              </div>
            </div>
          </div> */}
          <Card header="Einschlusskriterien">
            <div className="flex w-full justify-between ">
              <IconButton onClick={handleClick} />
              <div className="flex w-full max-w-[92%] text-[15px]">
                <InputTextField
                  id="search-text"
                  label="Code oder Suchbegriff eingeben"
                />
              </div>
            </div>
          </Card>
          {isOntolygyTreeOpen && <OntologyTreePanel />}
          {/* Display panel */}
          {/* <div className="flex flex-col w-fulsl relativ border border-[#9ea9b3] rounded-md">
            <div className="flex w-full p-2 pl-4 bg-[#5270a7] text-white text-lg font-medium">
              Ausgewählte Merkmale
            </div>
            <div className="flex min-h-[150px]">
              <div className="flex w-full m-5 p-5 border border-black border-dashed"></div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <PrimaryButton id="load-query" label="ABFRAGE LADEN" />
        <PrimaryButton id="save-query" label="ABFRAGE SPEICHERN" />
      </div>
    </section>
  );
}

export default FeasibilityContainer;
