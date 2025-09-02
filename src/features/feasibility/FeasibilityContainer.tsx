/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import {
  PrimaryButton,
  SecondaryButton,
  ToggleOntologyButton,
} from "../../components/ui/Button";
import InputTextField from "../../components/ui/InputTextField";
import OntologyTreePanel from "../ontology/OntologyTreePanel";
import Card from "../../components/ui/Card";
import type { MachbarkeitQueryData } from "./type";
import { AxiosError } from "axios";

function FeasibilityContainer() {
  const [isOntolygyTreeOpen, setIsOntolygyTreeOpen] = useState(false);

  const handleClick = () => {
    setIsOntolygyTreeOpen(!isOntolygyTreeOpen);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json") {
      alert("Please select a JSON file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const uploadedCriteria: MachbarkeitQueryData = JSON.parse(
          e.target?.result as string
        );
        // const text = e.target?.result as string;
        const isJsonDataValid =
          !!(
            uploadedCriteria.inclusionCriteria &&
            uploadedCriteria.inclusionCriteria!.length > 0
          ) ||
          (uploadedCriteria.exclusionCriteria &&
            uploadedCriteria.exclusionCriteria!.length > 0);
        // const data = JSON.parse(text);
        if (isJsonDataValid) {
          convertToCharacteristicsDisplay(uploadedCriteria);
        } else {
          alert("Invalid JSON Format");
        }
      } catch (error) {
        alert((error as AxiosError).message);
      }
    };
    reader.readAsText(file);
  };

  const convertToCharacteristicsDisplay = (x) => {};

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
            <PrimaryButton id="load-query" isActive={true}>
              ZURÜCKSETZEN
            </PrimaryButton>
            <PrimaryButton id="save-query" isActive={false}>
              ABFRAGE STARTEN
            </PrimaryButton>
          </div>
        </div>
        {/* Feasibility builder */}
        <div className="flex flex-col gap-5">
          {/* Search input */}
          <Card header="Einschlusskriterien">
            <div className="flex gap-3 w-full justify-between ">
              <ToggleOntologyButton onClick={handleClick} />
              <div className="flex w-full max-w-[92%]">
                <InputTextField
                  id="search-text"
                  label="Code oder Suchbegriff eingeben"
                  className="!mb-0"
                />
              </div>
            </div>
          </Card>
          {isOntolygyTreeOpen && <OntologyTreePanel />}
          {/* Display panel */}
          <Card header="Ausgewählte Merkmale" headerClassName="justify-start">
            <div className="flex flex-col min-h-[150px] gap-5">
              <div className="flex items-center justify-end gap-2">
                <input
                  type="file"
                  id="upload"
                  accept="application/json"
                  hidden
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="upload"
                  className="h-[36px] px-[10px] py-[6px] rounded-md border border-[#0072DA] font-bold text-sm text-center cursor-pointer hover:bg-[#0072DA] hover:text-white active:brightness-110"
                >
                  ABFRAGE LADEN
                </label>
                <SecondaryButton
                  id="save-query"
                  className="!w-[180px] !border-[#0072DA] hover:border-transparent hover:bg-[#0072DA] hover:text-white"
                >
                  ABFRAGE SPEICHERN
                </SecondaryButton>
              </div>
              <div className="flex min-h-[100px] p-5 border border-black border-dashed"></div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default FeasibilityContainer;
