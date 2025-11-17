/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import ButtonContainer from "@components/ui/buttons/ฺButtonContainer";
import { Button } from "@components/ui/buttons/Button";
import Card from "@components/layout/Card";
import type { MachbarkeitQueryData } from "@features/feasibility/feasibility-builder/type";
import type { Criterion } from "@app/types/ontology";
import { AxiosError } from "axios";

function FeasibilityContainer() {
  const [isOntolygyTreeOpen, setIsOntolygyTreeOpen] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState<Criterion[]>([]);
  const [textInput, setTextInput] = useState("");

  const handleTextChange = (text: string | number) => {
    setTextInput(text as string);
  };

  const handleClick = (criteria: Criterion[] | null) => {
    if (criteria) {
      setSelectedCriteria(criteria);
    } else {
      setSelectedCriteria([]);
    }
    setIsOntolygyTreeOpen((isOntolygyTreeOpen) => !isOntolygyTreeOpen);
  };

  const handleFilter = () => {
    setSelectedCriteria([]);
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
    /* #F7F7F7 */
    <div className="flex-grow flex-col h-full bg-[#fafafa]">
      <div className="flex h-[60px] bg-white border-b-[1.5px] border-[var(--color-border)]">
        <div className="flex w-full max-w-[960px] justify-between m-auto px-8">
          <div className="flex w-full h-[50px] items-center px-2">
            <p>
              Anzahl der Patienten: <span>-</span>
            </p>
          </div>
          <ButtonContainer className="p-0">
            <Button
              id="reset-query"
              type="secondary"
              label="ZURÜCKSETZEN"
              isActive={true}
            />
            <Button
              id="save-query"
              type="primary"
              label="ABFRAGE STARTEN"
              isActive={true}
            />
          </ButtonContainer>
        </div>
      </div>
      {/* </div> */}
      <div
        id="feasibility-container"
        className="flex flex-col max-w-[960px] px-5 py-8 mx-auto overflow-y-auto"
      >
        <Card bodyClassName="p-0">
          <div className="flex justify-end items-center py-3 border-b-[1.5px] border-[var(--color-border)]">
            {/* <div className="flex gap-8 pr-5">
              <p className="font-medium text-sm text-gray-500">
                Abfragen Laden
              </p>
              <p className="font-medium text-sm text-gray-500">
                Abfragen Speichen
              </p>
            </div> */}
            <menu className="flex gap-8 pr-5">
              <li className="flex gap-7 m-auto">
                <div className="font-medium text-sm text-gray-500 cursor-pointer">
                  Abfragen Laden
                </div>
                <div className="font-medium text-sm text-gray-500 cursor-pointer">
                  Abfragen Speichen
                </div>
              </li>
            </menu>
            {/* <div className="flex h-[50px] w-[45%] items-center">
              <p>
                Anzahl der Patienten: <span>-</span>
              </p>
            </div>
            <ButtonContainer>
              <Button
                id="reset-query"
                type="primary"
                label="ZURÜCKSETZEN"
                isActive={true}
              />
              <Button
                id="save-query"
                type="primary"
                label="ABFRAGE STARTEN"
                isActive={false}
              />
            </ButtonContainer> */}
          </div>
          <div className="flex flex-col p-4 pt-2">
            <p className="text-lg font-medium p-2">Einschlusskriterien</p>
            <Card>
              <div></div>
            </Card>
            {/* <div className="flex flex-col w-full h-full min-h-[150px] gap-5">
              <ButtonContainer>
                <UploadButton
                  id="upload-query"
                  label="ABFRAGE LADEN"
                  onChange={handleFileUpload}
                />
                <Button
                  id="save-query"
                  type="secondary"
                  label="ABFRAGE SPEICHERN"
                  isActive={true}
                />
              </ButtonContainer>
              <div className="flex h-full min-h-[100px] p-5 border border-black border-dashed"></div>
            </div> */}
          </div>
          <div className="flex flex-col p-4 pt-2">
            <p className="text-lg font-medium p-2">Ausschlusskriterien</p>
            <Card>
              <div></div>
            </Card>
          </div>
          <div className="flex flex-col p-4 pt-2">
            <p className="text-lg font-medium p-2">Attributeliste</p>
            <Card>
              <div></div>
            </Card>
          </div>
        </Card>
        {/* 3 sections */}
        {/* QueryControls */}

        {/* <section
          id="query-controls"
          className="flex w-full justify-between items-center"
        >
          <div className="flex h-[50px] border border-[#9ea9b3] rounded-md w-[45%] items-center px-4">
            <p>
              Anzahl der Patienten: <span>-</span>
            </p>
          </div>
          <ButtonContainer>
            <Button
              id="load-query"
              type="primary"
              label="ZURÜCKSETZEN"
              isActive={true}
            />
            <Button
              id="save-query"
              type="primary"
              label="ABFRAGE STARTEN"
              isActive={false}
            />
          </ButtonContainer>
        </section> */}
        {/* CriteriaSelector */}
        {/* <section>
        <Card header="Einschlusskriterien">
          <div className="flex gap-3 w-full justify-between items-center">
            <OntologyButton
              onClick={() =>
                setIsOntolygyTreeOpen(
                  (isOntolygyTreeOpen) => !isOntolygyTreeOpen
                )
              }
            />
            <div className="flex w-full max-w-[92%]">
              <InputTextField
                id="search-text"
                label="Code oder Suchbegriff eingeben"
                value={textInput}
                type="search"
                onChange={handleTextChange}
              />
            </div>
          </div>
        </Card>
      </section> */}
        {/* {isOntolygyTreeOpen && <OntologyTreePanel onClick={handleClick} />}
        {selectedCriteria.length > 0 && (
          <FilterPanel criteria={selectedCriteria} onClick={handleFilter} />
        )} */}
        {/* CriteriaBuilder */}
        {/* <section>
          <Card header="Ausgewählte Merkmale" headerClassName="justify-start">
            <div className="flex flex-col min-h-[150px] gap-5">
              <ButtonContainer>
                <UploadButton
                  id="upload-query"
                  label="ABFRAGE LADEN"
                  onChange={handleFileUpload}
                />
                <Button
                  id="save-query"
                  type="secondary"
                  label="ABFRAGE SPEICHERN"
                  isActive={true}
                />
              </ButtonContainer>
              <div className="flex min-h-[100px] p-5 border border-black border-dashed"></div>
            </div>
          </Card>
        </section> */}
      </div>
    </div>
  );
}

export default FeasibilityContainer;
