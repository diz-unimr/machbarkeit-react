/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import arrow from "../../assets/arrow-collapse.png";
import { ArrowButton, ModuleButton } from "../../components/ui/Button";

function OntologyTreePanel() {
  return (
    <div className="flex relative max-w-full max-h-full z-50 -top-[20px]">
      <div className="flex flex-col w-full min-h-[180px] absolute bg-white shadow-[0px_10px_15px_0px_#0003,0px_0px_25px_2px_#00000024,0px_0px_10px_0px_#0000001f] pointer-events-auto">
        <div>
          {/* Module name */}
          <div className="flex p-3 mt-4 border-t-2 border-t-[#adbcd7] border-b-2 border-b-[#adbcd7]">
            <div className="flex gap-3 m-auto">
              <ModuleButton id="person" label="Person" moduleName="person" />
              {/* e67e22 DA392B */}
              <ModuleButton id="fall" label="Fall" moduleName="fall" />
              {/* 8e44ad */}
              <ModuleButton
                id="diagnose"
                label="Diagnose"
                moduleName="diagnose"
              />
              {/* FE620F orange */}
              <ModuleButton
                id="prozedur"
                label="Prozedur"
                moduleName="prozedur"
              />
              <ModuleButton
                id="laboruntersuchung"
                label="Laboruntersuchung"
                moduleName="laboruntersuchung"
              />
            </div>
          </div>
          {/* Ontology display */}
          <div className="flex h-[550px] m-7">
            <div className="h-full overflow-y-auto">
              <div className="font-medium mt-3">Person</div>
              <div className="overflow-visible pl-3.5 pr-2.5">
                <li className="list-none">
                  <div className="flex gap-0.5 mt-1.5">
                    <button>
                      <img src={arrow} />
                    </button>
                    <div className="flex w-full">
                      <span className="text-[15px]">Geschlecht</span>
                    </div>
                  </div>
                  <ul>
                    <div className="overflow-visible pl-3.5 pr-2.5">
                      <li>
                        <div className="flex gap-0.5 mt-1.5">
                          <button>
                            <img src={arrow} />
                          </button>
                          <ArrowButton id={""} />
                          <div className="flex w-full">
                            <span className="text-[15px]">Geschlecht2</span>
                          </div>
                        </div>
                        <ul></ul>
                      </li>
                    </div>
                  </ul>
                </li>
              </div>
            </div>
          </div>
          {/* Button tab */}
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default OntologyTreePanel;
