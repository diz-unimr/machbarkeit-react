/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import TreePanel from "./TreePanel";
import TreeNode from "./TreeNode";
import { type Criterion, type Module } from "@app/types/ontologyType";
import { useEffect, useState } from "react";
import useOntology from "@app/hooks/useOntology";
import InputTextField from "@components/ui/inputs/InputTextField";

type OntologyTreePanelProps = {
  activeModule: Module | null;
  onClick: (criteria: Criterion[] | null) => void;
};

const OntologyTreePanel = ({ activeModule }: OntologyTreePanelProps) => {
  const [textInput, setTextInput] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const { ontologyResult, isLoading } = useOntology(
    activeModule?.id ?? null,
    debouncedSearch,
  );

  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedSearch(textInput!.trim()),
      1000,
    );
    return () => clearTimeout(handler);
  }, [textInput]);

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <div className="flex flex-col flex-1 min-h-0 w-full h-full p-3 gap-4 overflow-hidden">
        <InputTextField
          id="search-text"
          label="Code oder Suchbegriff eingeben"
          value={textInput ?? ""}
          resultStatus={
            ontologyResult.status ? ontologyResult.status : undefined
          }
          onChange={setTextInput}
          onClearText={() => {
            setDebouncedSearch("");
            setTextInput("");
          }}
        />
        <div className="flex flex-col flex-1 min-h-0 gap-4 overflow-hidden">
          {ontologyResult.status !== 400 ? (
            isLoading ? (
              <p className="flex items-center justify-center h-full">
                loading...
              </p>
            ) : !ontologyResult.criteria ||
              ontologyResult.criteria.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                {textInput.trim() !== "" ? (
                  <span>
                    Der Suchbegriff{" "}
                    <span className="font-medium">{'"' + textInput + '"'}</span>{" "}
                    wurde im Modul{" "}
                    <span className="font-medium">{activeModule?.name}</span>{" "}
                    nicht gefunden.
                  </span>
                ) : (
                  "Keine daten"
                )}
              </div>
            ) : (
              <>
                <p
                  className="text-lg font-bold"
                  style={{ color: activeModule?.color.btnColor }}
                >
                  {activeModule?.name}
                </p>
                <div className="flex-1 min-h-0 overflow-hidden">
                  <TreePanel>
                    {activeModule &&
                      ontologyResult.criteria &&
                      ontologyResult.criteria.map((criterion) => (
                        <TreeNode
                          key={criterion.id}
                          criterion={criterion}
                          searchTerm={debouncedSearch}
                        />
                      ))}
                  </TreePanel>
                </div>
              </>
            )
          ) : undefined}
        </div>
      </div>
    </div>
  );
};

export default OntologyTreePanel;
