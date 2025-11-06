/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import OntologyTreePanel from "../ontology/OntologyTreePanel";
import FilterPanel from "../filters/FilterPanel";
import type { Criterion } from "../ontology/type";
import { useCharacteristicsStore } from "../../store/characteristics-ui-store";
import { useItemsStore } from "../../store/checked-items-store";
import FeasibilityDisplay from "./feasibility-display/FeasibilityDisplay";
import FeasibilityQueryControl from "./FeasibilityQueryControl";
import FeasibilityBuilder from "./FeasibilityBuilder";

export default function FeasibilityContainer() {
  const [isOntolygyTreeOpen, setIsOntolygyTreeOpen] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const selectedItems = useItemsStore((state) => state.selectedItems);
  const clearItemsStore = useItemsStore((state) => state.clearItems);
  const characteristicsUI = useCharacteristicsStore(
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
      setIsFilterPanelOpen(true);
    }
    setIsOntolygyTreeOpen((isOntolygyTreeOpen) => !isOntolygyTreeOpen);
  };

  const handleFilter = () => {
    setIsFilterPanelOpen((prev) => !prev);
    clearItems();
  };

  const clearItems = () => {
    clearItemsStore();
  };

  const toggleOntologyTree = () => {
    setIsOntolygyTreeOpen((isOntolygyTreeOpen) => !isOntolygyTreeOpen);
  }

  /* const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }; */

  useEffect(() => {
    console.log("characteristicsUI: ", characteristicsUI);
    if (!isFilterPanelOpen && Object.values(selectedItems).length) {
      clearItemsStore();
    }
  }, [isOntolygyTreeOpen, isFilterPanelOpen]);

  return (
    <div
      id="feasibility-container"
      className="flex flex-col h-full w-[90%] max-w-[960px] p-5 overflow-y-auto"
    >
      {/* 3 sections */}
      {/* QueryControls */}
      <FeasibilityQueryControl />
      {/* CriteriaSelector */}
      <FeasibilityBuilder toggleOntologyButton={toggleOntologyTree} />
      {/* OntologyTree panel */}
      {isOntolygyTreeOpen && (
        <OntologyTreePanel
          onSelectCriteria={handleCriteria}
          onCancel={() => setIsOntolygyTreeOpen(false)}
        />
      )}
      {/* Filter panel */}
      {isFilterPanelOpen && Object.values(selectedItems).length && (
        <FilterPanel
          selectedCriteria={Object.values(selectedItems)}
          onSubmit={handleFilter}
          onCancel={clearItems}
        />
      )}
      {/* CriteriaDisplay */}
      <FeasibilityDisplay characteristics={characteristicsUI} />
    </div>
  );
}
