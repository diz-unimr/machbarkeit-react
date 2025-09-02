/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { ModuleButton } from "../../components/ui/buttons/ModulesButton";
import { MODULES, ONTOLOGY } from "../../data";
import { TreePanel } from "../../components/ui/TreePanel";
import { TreeNode } from "../../components/ui/TreeNode";
import { type Criterion } from "./type";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../../components/ui/Button";

function OntologyTreePanel() {
  const [module, setModule] = useState(MODULES[0]); //default module
  const [ontology, setOntology] = useState([ONTOLOGY[0]] as Criterion[]); //ontology data

  const changeTab = (moduleId: string) => {
    console.log("Module ID:", moduleId);
    // call ontology request per module id
    setModule(MODULES.find((m) => m.id === moduleId)!);
    setOntology(ONTOLOGY.filter((c) => c.module_id === moduleId));
  };

  return (
    <div className="flex relative max-w-full max-h-full -top-5 z-50">
      <div className="flex flex-col w-full min-h-[180px] absolute bg-white shadow-[0px_10px_15px_0px_#0003,0px_0px_25px_2px_#00000024,0px_0px_10px_0px_#0000001f] pointer-events-auto">
        {/* Module name */}
        <div className="flex w-full overflow-x-auto">
          <menu className="flex w-full p-3 mt-4 border-t-2 border-t-[#adbcd7] border-b-2 border-b-[#adbcd7]">
            <li className="flex gap-3 m-auto">
              {MODULES.map((module) => (
                <ModuleButton
                  key={module.id}
                  module={module}
                  onClick={changeTab}
                />
              ))}
            </li>
          </menu>
        </div>

        {/* Ontology display */}
        <div className="flex flex-col w-full h-[550px] p-[30px]">
          <p className="mb-5 text-lg font-bold">{module.name}</p>
          <TreePanel>
            {ontology.map((criterion) => (
              <TreeNode key={criterion.id} criterion={criterion} /> // criterion per module
            ))}
          </TreePanel>
        </div>
        <div
          className="flex w-full gap-2 justify-end p-5"
          style={{ backgroundColor: module.color }}
        >
          <SecondaryButton
            id="cancel"
            className="!w-[110px] text-white hover:bg-white hover:text-black"
            /* bgColor="#3498DB" */
            isActive={true}
          >
            ABBRECHEN
          </SecondaryButton>
          <PrimaryButton
            id="submit"
            className="!w-[110px] !text-black"
            bgColor="white"
            isActive={true}
          >
            AUSWÄHLEN
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default OntologyTreePanel;
