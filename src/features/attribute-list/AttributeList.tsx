/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */
/* import { useState } from 'react' */

import InputTextField from "../../components/ui/InputTextField"
import arrowCollapse from "../../assets/arrow-collapse.png"
import { useState } from "react"


function AttributeList() {
  const [moduleOpened, setModuleOpen] = useState(false)

  const isModuleOpen = () => {
    setModuleOpen(!moduleOpened)
  }

  return (
    <>
      <div className="flex flex-row flex-wrap w-[460px] h-full m-5">
        <div className="relative w-full !border !border-[#9ea9b3] !rounded-md shadow-[0_2px_4px_-1px_#0003,0_4px_5px_#00000024,0_1px_10px_#0000001f]">
            <div className="h-[clamp(45px,10%,60px)] flex justify-center items-center bg-[#5270a7] font-bold text-lg text-white">
                Attributliste
            </div>
            <div className="w-full h-[90%] flex flex-col p-5">
              <InputTextField id="attributeList"/>
              <div className="flex flex-col gap-2.5 overflow-y-auto overflow-x-hidden">
                <div>
                  <a onClick={isModuleOpen} className="flex items-center cursor-pointer mb-2.5">
                    <img src={arrowCollapse} className={`transition-all duration-500 ${moduleOpened ? "rotate-90" : "rotate-0"}`} />
                    Diagnose
                  </a>
                  <div className={`${moduleOpened ? "block" : "hidden"}`}>
                    <div className="flex gap-2.5 pl-5 pb-2">
                      <input type="checkbox"/>
                      <p>Diagnose 1</p>
                    </div>
                    <div className="flex gap-2.5 pl-5 pb-2">
                      <input type="checkbox"/>
                      <p>Diagnose 2</p>
                    </div>
                  </div>

                </div>
                
              </div>
            </div>
        </div>
      </div>
	</>     
  )
}

export default AttributeList