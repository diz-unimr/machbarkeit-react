/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import ButtonContainer from "../../components/ui/ฺButtonContainer";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../components/ui/buttons/Button";
import OntologyButton from "../../components/ui/buttons/OntologyButton";
import UploadButton from "../../components/ui/buttons/UploadButton";
import InputTextField from "../../components/ui/InputTextField";
import OntologyTreePanel from "../ontology/OntologyTreePanel";
import Card from "../../components/ui/Card";
import type { MachbarkeitQueryData } from "./type";
import { AxiosError } from "axios";

function FeasibilityContainer() {
  const [isOntolygyTreeOpen, setIsOntolygyTreeOpen] = useState(false);

  const handleClick = () => {
    setIsOntolygyTreeOpen((isOntolygyTreeOpen) => !isOntolygyTreeOpen);
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
    <div
      id="feasibility-container"
      className="flex flex-col gap-5 h-full w-[60%] max-w-[1000px] p-5 overflow-y-auto"
    >
      {/* 3 sections */}
      {/* QueryControls */}
      <section
        id="query-controls"
        className="flex w-full justify-between items-center"
      >
        <div className="flex h-[56px] border border-[#9ea9b3] rounded-md w-[45%] items-center p-3">
          <p>
            Anzahl der Patienten: <span>-</span>
          </p>
        </div>
        <ButtonContainer>
          <PrimaryButton id="load-query" label="ZURÜCKSETZEN" isActive={true} />
          <PrimaryButton
            id="save-query"
            label="ABFRAGE STARTEN"
            isActive={false}
          />
        </ButtonContainer>
      </section>
      {/* CriteriaSelector */}
      <section>
        <Card header="Einschlusskriterien">
          <div className="flex gap-3 w-full justify-between ">
            <OntologyButton onClick={handleClick} />
            <div className="flex w-full max-w-[92%]">
              <InputTextField
                id="search-text"
                label="Code oder Suchbegriff eingeben"
                className="!mb-0"
              />
            </div>
          </div>
        </Card>
      </section>
      {isOntolygyTreeOpen && <OntologyTreePanel onClick={handleClick} />}
      {/* CriteriaBuilder */}
      <section>
        <Card header="Ausgewählte Merkmale" headerClassName="justify-start">
          <div className="flex flex-col min-h-[150px] gap-5">
            <div className="flex min-h-[100px] p-5 border border-black border-dashed"></div>
            <ButtonContainer>
              <UploadButton
                id="uplaod-query"
                label="ABFRAGE LADEN"
                onChange={handleFileUpload}
              />
              <SecondaryButton
                id="save-query"
                label="ABFRAGE SPEICHERN"
                isActive={false}
              />
            </ButtonContainer>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default FeasibilityContainer;
