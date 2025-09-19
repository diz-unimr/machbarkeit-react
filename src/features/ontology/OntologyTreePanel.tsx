/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import TreePanel from "./TreePanel";
import TreeNode from "./TreeNode";
import getModules from "../../api/moduleService";
import getOntology from "../../api/ontologyService";
import ButtonContainer from "../../components/ui/ฺButtonContainer";
import {
  Button,
  CancelButton,
  SubmitButton,
} from "../../components/ui/buttons/Button";
import { type Criterion, type Module } from "./type";
import { useState, useEffect, useRef } from "react";

function OntologyTreePanel({
  onClick,
}: {
  onClick: (criteria: Criterion[] | null) => void;
}) {
  const [modules, setModules] = useState<Module[]>([]); //default module
  const [ontology, setOntology] = useState<Criterion[]>([]); //ontology data
  const [activeModule, setActiveModule] = useState<Module | null>(null); //selected module
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState<Criterion[]>([]);
  /* const [selected, setSelected] = useState<boolean>(false); */
  const currentAbortController = useRef<AbortController | null>(null);

  const changeTab = (moduleId: string) => {
    // call ontology request per module id
    setActiveModule(modules.find((m) => m.id === moduleId) ?? null);
    fetchOntology(moduleId);
  };

  const handleCheckboxChange = (isChecked: boolean, criterion: Criterion) => {
    console.log(isChecked, criterion);
    if (isChecked) {
      setSelectedCriteria((prev) => [...prev, criterion]);
    } else {
      setSelectedCriteria((prev) => prev.filter((c) => c.id !== criterion.id));
    }
  };

  const fetchOntology = async (moduleId: string) => {
    // abort current request
    currentAbortController.current?.abort();
    // create new request
    currentAbortController.current = new AbortController();
    setIsLoading(true);
    const [data] = await getOntology(moduleId);
    if (!currentAbortController.current.signal.aborted) {
      setOntology(data || []);
      setIsLoading(false);
    }
  };

  /* const selectCriteria = () => {
    setSelected(true);
  }; */

  useEffect(() => {
    const fetchData = async () => {
      const modules = await getModules();
      setModules(modules || []);
      setActiveModule(modules?.[0] ?? null);

      if (modules?.[0]) {
        await fetchOntology(modules[0].id);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {modules.length > 0 && (
        <div className="flex relative max-w-full max-h-full -top-5 z-50">
          <div className="flex flex-col w-full min-h-[180px] absolute bg-white shadow-[0px_10px_15px_0px_#0003,0px_0px_25px_2px_#00000024,0px_0px_10px_0px_#0000001f] pointer-events-auto">
            {/* Module name */}

            <div className="flex w-full overflow-x-auto">
              <menu className="flex w-full p-3 mt-4 border-t-2 border-t-[#adbcd7] border-b-2 border-b-[#adbcd7]">
                <li className="flex gap-3 m-auto">
                  {modules?.map((module) => (
                    <Button
                      id={module.id}
                      key={module.id}
                      type="primary"
                      label={module.name}
                      color={module.color}
                      className="font-normal"
                      onClick={() => changeTab(module.id)}
                    />
                  ))}
                </li>
              </menu>
            </div>

            {/* Ontology display */}
            <div className="flex flex-col w-full h-[550px] p-[30px]">
              {isLoading ? (
                <p className="flex items-center justify-center h-full">
                  loading...
                </p>
              ) : (
                <>
                  <p className="mb-5 text-lg font-bold">{activeModule?.name}</p>
                  <TreePanel>
                    {ontology.map((criterion) => (
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
            <ButtonContainer className="p-5" bgContainer={activeModule?.color}>
              <CancelButton
                id="cancel"
                label="ABBRECHEN"
                color="white"
                isActive={true}
                className="w-[110px] text-white hover:text-black"
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
        </div>
      )}
    </>
  );
}

export default OntologyTreePanel;
