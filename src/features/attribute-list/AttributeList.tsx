/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import InputTextField from "../../components/ui/InputTextField"
import arrowCollapse from "../../assets/arrow-collapse.png"
import { useState } from "react"
import AttributeListPanel from "./layout/AttributeListPanel"


function AttributeList() {
  const [moduleOpened, setModuleOpen] = useState(false)

  const isModuleOpen = () => {
    setModuleOpen(!moduleOpened)
  }

  return (
    <>
			<AttributeListPanel header="ausgewählte Attributliste">
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
			</AttributeListPanel>
      <AttributeListPanel header="ausgewählte Attributliste">
				Hello
			</AttributeListPanel>
	</>     
  )
}

export default AttributeList