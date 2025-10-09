/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import TreeNode from "./TreeNode";
import fetchModules from "../../services/moduleService";
import {
  fetchOntology,
} from "../../services/ontologyService";
import ButtonContainer from "../../components/ui/buttons/ฺButtonContainer";
import {
  Button,
  CancelButton,
  SubmitButton,
} from "../../components/ui/buttons/Button";
import { type Criterion, type Module } from "./type";
import { useState, useEffect } from "react";
import { useCheckedItemsStore } from "../../store/checked-items-store";
import { useSelectedItemsStore } from "../../store/selected-items-store";
import { useOntologyStore } from "../../store/ontology-store";
import { useModulesStore } from "../../store/modules-store";

export default function OntologyTreePanel({
  onClick,
}: {
  onClick: (criteria: Criterion[] | null) => void;
}) {
  const { modules, setModules } = useModulesStore();
  const { ontology, setOntology, flattenCriterion, setTree } =
    useOntologyStore();
  const [activeModule, setActiveModule] = useState<Module | null>(null); //selected module
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { checkedItems } = useCheckedItemsStore();
  const { selectedItems, setSelectedItems } = useSelectedItemsStore();

  const getOntology = async (moduleId: string) => {
    if (!ontology[moduleId]) {
      setIsLoading(true);
      const [data, statusMessage] = await fetchOntology(moduleId);
      if (data) {
        setOntology(data);
        setTree(data);
        setIsLoading(false);
      } else if (statusMessage === "canceled") {
        return;
      }
    } else setIsLoading(false);
  };

  const changeModuleTab = (moduleId: string) => {
    const activeModule =
      modules.find((module) => module.id === moduleId) ?? modules[0];
    setActiveModule(activeModule);
    getOntology(moduleId);
    if (ontology[moduleId] && !flattenCriterion[moduleId])
      setTree(ontology[moduleId]);
    console.log(flattenCriterion);
  };

  useEffect(() => {
    // get all modules and get ontology on mounted component
    if (modules?.length === 0) {
      (async () => {
        const modules = await fetchModules();
        if (modules) getOntology(modules[0].id);
        setModules(modules || []);
        setActiveModule(modules?.[0] ?? null);
      })();
    } else setActiveModule(modules[0]);
  }, []);

  return (
    <>
      {modules.length > 0 && (
        <div className="flex relative max-w-full max-h-full -top-5 z-50">
          <div className="flex flex-col w-full min-h-[180px] absolute bg-white shadow-[0px_10px_15px_0px_#0003,0px_0px_25px_2px_#00000024,0px_0px_10px_0px_#0000001f] pointer-events-auto">
            <div className="flex w-full overflow-x-auto">
              <menu className="flex w-full p-3 mt-4 border-t-2 border-t-[#adbcd7] border-b-2 border-b-[#adbcd7]">
                <li className="flex gap-3 m-auto">
                  {/* Modules name */}
                  {modules?.map((module) => (
                    <Button
                      id={module.id}
                      key={module.id}
                      type="primary"
                      label={module.name}
                      color={module.color}
                      className="font-normal"
                      onClick={() => changeModuleTab(module.id)}
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
                  <div className="flex flex-col h-full w-full overflow-y-auto overflow-x-hidden">
                    {activeModule &&
                      ontology[activeModule!.id]?.map((criterion) => (
                        <TreeNode key={criterion.id} criterion={criterion} /> // criterion per module
                      ))}
                  </div>
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
                isActive={Array.from(checkedItems).length > 0}
                className="text-black"
                onClick={() =>
                  onClick(
                    selectedItems.size > 0
                      ? Array.from(selectedItems.values())
                      : []
                  )
                }
              />
            </ButtonContainer>
          </div>
        </div>
      )}
    </>
  );
}
