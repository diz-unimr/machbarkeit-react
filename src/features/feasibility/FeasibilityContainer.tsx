/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import ButtonContainer from "../../components/ui/buttons/ฺButtonContainer";
import { Button, DeleteButton } from "../../components/ui/buttons/Button";
import OntologyButton from "../../components/ui/buttons/OntologyButton";
import UploadButton from "../../components/ui/buttons/UploadButton";
import InputTextField from "../../components/ui/inputs/InputTextField";
import OntologyTreePanel from "../ontology/OntologyTreePanel";
import FilterPanel from "../filters/FilterPanel";
import Card from "../../components/layout/Card";
import type { MachbarkeitQueryData } from "./type";
import type { Criterion } from "../ontology/type";
import { AxiosError } from "axios";
import { useCharacteristicsStore } from "../../store/characteristics-store";

export default function FeasibilityContainer() {
  const [isOntolygyTreeOpen, setIsOntolygyTreeOpen] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState<Criterion[] | null>(
    null
  );
  const [textInput, setTextInput] = useState("");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const characteristicsStore = useCharacteristicsStore(
    (state) => state.characteristics
  );
  const addCharacteristics = useCharacteristicsStore(
    (state) => state.addCharacteristics
  );
  const deleteCharacteristics = useCharacteristicsStore(
    (state) => state.deleteCharacteristic
  );
  const handleTextChange = (text: string | number) => {
    setTextInput(text as string);
  };

  const handleCriteria = (
    selectedCriteriaStore: Record<string, Criterion> | null
  ) => {
    if (selectedCriteriaStore) {
      setSelectedCriteria(Object.values(selectedCriteriaStore));
      setIsFilterPanelOpen(true);
    } else {
      setSelectedCriteria(null);
    }
    setIsOntolygyTreeOpen((isOntolygyTreeOpen) => !isOntolygyTreeOpen);
  };

  const handleFilter = () => {
    addCharacteristics();
    setSelectedCriteria(null);
    //clearSelectedItemsStore();
  };

  const deleteCharacteristic = (item: Criterion) => {
    deleteCharacteristics(item);
  };

  const clearSelectedItems = () => {
    //clearSelectedItemsStore();
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
        const isJsonDataValid =
          !!(
            uploadedCriteria.inclusionCriteria &&
            uploadedCriteria.inclusionCriteria!.length > 0
          ) ||
          (uploadedCriteria.exclusionCriteria &&
            uploadedCriteria.exclusionCriteria!.length > 0);
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

  useEffect(() => {
    if (!isOntolygyTreeOpen) {
      //clearCheckedItemsStore();
    }
  }, [isOntolygyTreeOpen]);

  return (
    <div
      id="feasibility-container"
      className="flex flex-col h-full w-[90%] max-w-[960px] p-5 overflow-y-auto"
    >
      {/* 3 sections */}
      {/* QueryControls */}
      <section
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
      </section>
      {/* CriteriaSelector */}
      <section>
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
      </section>
      {/* OmtologyTree panel */}
      {isOntolygyTreeOpen && (
        <OntologyTreePanel
          onSelectCriteria={handleCriteria}
          onCancel={() => setIsOntolygyTreeOpen(false)}
        />
      )}
      {/* Filter panel */}
      {isFilterPanelOpen && selectedCriteria && selectedCriteria.length && (
        <FilterPanel
          criteria={selectedCriteria}
          onClick={handleFilter}
          onCancel={clearSelectedItems}
        />
      )}
      {/* CriteriaBuilder */}
      <section>
        <Card header="Ausgewählte Merkmale" headerClassName="justify-start">
          <div className="flex flex-col min-h-[150px] gap-5">
            <ButtonContainer>
              <UploadButton
                id="uplaod-query"
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
            <div className="flex flex-col min-h-[100px] p-5 border border-black border-dashed">
              {Object.values(characteristicsStore).map((item, index) => (
                <div key={index} className="flex">
                  <p>{item.display}</p>
                  <DeleteButton
                    id={"delete-characteristic-" + index}
                    onClick={() => deleteCharacteristic(item)}
                  ></DeleteButton>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
