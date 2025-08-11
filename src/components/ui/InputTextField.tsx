/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */
/* import { useState } from 'react' */

import { useState } from "react";

type InputTextFieldProp = {
	id: string;
}

function InputTextField({ id }: InputTextFieldProp) {
	const [isFocused, setIsFocused] = useState(false);
	const [textInput, setTextInput] = useState("");

	return (
		<>
			<div className="relative mb-5">

				<div className="h-[45px] relative">
					<div onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className="flex h-full">
						<input onChange={(e) => setTextInput(e.target.value)} id={id} type="text" value={textInput} placeholder="" className="h-full w-full truncate !rounded-lg !border !border-[#c0c7ce] outline-0 pl-8"/>
						<label htmlFor={id}
							className={`flex items-center absolute left-0 ml-10 cursor-auto transition-all duration-100
								${ (textInput.length > 0 || isFocused) ? "-top-2.5 text-sm font-bold bg-white" : "h-full top-0 ml-2"}`}>
							Attribut suchen
						</label>
					</div>
					<div className="flex h-full items-center absolute top-0 left-0 ml-2">
						<span>
							<svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" className="material-design-icon__svg">
								<path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
							</svg>
						</span>
					</div>
					{textInput.length > 0 &&
						<button onClick={() => setTextInput("")} className="absolute right-2 top-1/2 -translate-y-1/2 px-2 text-slate-600 !bg-white">
							<span aria-hidden="true" role="img" className="material-design-icon close-icon"><svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24" className="material-design-icon__svg"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg></span>
						</button>
					}
					
				</div>
			</div>
		</>
	)
}

export default InputTextField