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

type CodeSystem = "LOINC" | "SWISSLAB";

const OntologyTreePanel = ({ activeModule }: OntologyTreePanelProps) => {
  const [activeLabTab, setActiveLabTab] = useState<CodeSystem | null>(null);
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

  useEffect(() => {
    if (!activeModule) return;
    setActiveLabTab("SWISSLAB");
  }, [activeModule]);

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
        <div className="flex flex-col flex-1 min-h-0 gap-5 overflow-hidden">
          {ontologyResult.status !== 400 ? (
            isLoading ? (
              <p className="flex items-center justify-center h-full">
                loading...
              </p>
            ) : !ontologyResult.criteria ||
              ontologyResult.criteria.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                {textInput.trim() !== "" ? (
                  <div className="flex flex-col items-center">
                    <p>
                      Der Suchbegriff{" "}
                      <span className="font-medium">
                        {'"' + textInput + '"'}
                      </span>
                    </p>{" "}
                    <p>
                      wurde im Modul{" "}
                      <span className="font-medium">{activeModule?.name}</span>{" "}
                      nicht gefunden.
                    </p>
                  </div>
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
                {activeModule?.name === "Laboruntersuchung" && (
                  <div className="w-full flex mb-5 border-b border-gray-200 ">
                    <ul
                      className="w-full flex gap-5 m-5 justify-center text-sm font-medium text-center"
                      role="tablist"
                    >
                      {/* Tab: SWISSLAB */}
                      <li className="flex-1" role="presentation">
                        <div
                          onClick={() => setActiveLabTab("SWISSLAB")}
                          className={`inline-block w-full p-4 border-b-2 cursor-pointer ${
                            activeLabTab === "SWISSLAB"
                              ? "border-current"
                              : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
                          }`}
                          style={
                            activeLabTab === "SWISSLAB"
                              ? {
                                  color: activeModule?.color.btnColor,
                                  borderBottomColor:
                                    activeModule?.color.btnColor,
                                }
                              : {}
                          }
                          role="tab"
                          aria-selected={activeLabTab === "SWISSLAB"}
                        >
                          Swisslab-Codes
                        </div>
                      </li>
                      {/* Tab: LOINC */}
                      <li className="flex-1" role="presentation">
                        <div
                          onClick={() => setActiveLabTab("LOINC")}
                          className={`inline-block w-full p-4 border-b-2 cursor-pointer ${
                            activeLabTab === "LOINC"
                              ? "border-current"
                              : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
                          }`}
                          style={
                            activeLabTab === "LOINC"
                              ? {
                                  color: activeModule?.color.btnColor,
                                  borderBottomColor:
                                    activeModule?.color.btnColor,
                                }
                              : {}
                          }
                          role="tab"
                          aria-selected={activeLabTab === "LOINC"}
                        >
                          LOINC-Codes
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
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
