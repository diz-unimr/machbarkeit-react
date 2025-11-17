/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import TreePanel from "./TreePanel";
import TreeNode from "./TreeNode";
import ButtonContainer from "@components/ui/buttons/ฺButtonContainer";
import { CancelButton, SubmitButton } from "@components/ui/buttons/Button";
import { type Criterion, type Module } from "@app/types/ontology";
import { useState } from "react";
import useOntology from "@app/hooks/useOntology";
import InputTextField from "@components/ui/inputs/InputTextField";

type OntologyTreePanelProps = {
  activeModule: Module | null;
  onClick: (criteria: Criterion[] | null) => void;
};

function OntologyTreePanel({ activeModule, onClick }: OntologyTreePanelProps) {
  const { ontology, isLoading } = useOntology(activeModule?.id ?? null);
  const [selectedCriteria, setSelectedCriteria] = useState<Criterion[]>([]);
  const [textInput, setTextInput] = useState<string>("");

  const handleTextChange = (text: string) => {
    setTextInput(text);
  };

  const handleCheckboxChange = (isChecked: boolean, criterion: Criterion) => {
    if (isChecked) {
      setSelectedCriteria((prev) => [...prev, criterion]);
    } else {
      setSelectedCriteria((prev) => prev.filter((c) => c.id !== criterion.id));
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0">
      <div className="flex flex-col flex-1 min-h-0 w-full h-full p-[14px] overflow-hidden">
        {isLoading ? (
          <p className="flex items-center justify-center h-full">loading...</p>
        ) : (
          <>
            <InputTextField
              id="search-text"
              label="Code oder Suchbegriff eingeben"
              value={textInput}
              onChange={handleTextChange}
            />
            <p className="my-5 text-lg font-bold">{activeModule?.name}</p>
            <TreePanel>
              {activeModule &&
                ontology[activeModule.id] &&
                ontology[activeModule.id].map((criterion) => (
                  <TreeNode
                    key={criterion.id}
                    criterion={criterion}
                    onCheckbox={handleCheckboxChange}
                  /> // criterion per module
                ))}
            </TreePanel>
          </>
        )}
      </div>
      <ButtonContainer bgContainer={activeModule?.color.btnColor}>
        <CancelButton
          id="cancel"
          label="ABBRECHEN"
          color="white"
          isActive={true}
          className="text-white hover:text-black"
          onClick={() => onClick(null)}
        />
        <SubmitButton
          id="submit"
          label="AUSWÄHLEN"
          color="white"
          isActive={selectedCriteria.length > 0}
          className="text-black"
          onClick={() => onClick(selectedCriteria)}
        />
      </ButtonContainer>
    </div>
  );
}

export default OntologyTreePanel;
