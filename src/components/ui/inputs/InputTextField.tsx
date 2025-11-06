/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import SearchIcon from "../icons/SearchIcon";
import { twMerge } from "tailwind-merge";

type InputTextFieldProp = {
  id: string;
  label: string;
  value?: string | number;
  type?: string;
  width?: string;
  className?: string;
  bodyClassName?: string;
  onChange: (text: string | number) => void;
};

export default function InputTextField({
  id,
  label,
  value,
  type,
  width,
  className,
  onChange,
}: InputTextFieldProp) {
  const [isFocused, setIsFocused] = useState(false);
  /* const [valueInput, setValueInput] = useState(0); */
  const rootClassName = twMerge(
    "flex flex-col justify-center h-[42px] w-full relative m-[3px]",
    width,
    className
  );

  return (
    <>
      <div className={rootClassName}>
        <div className="h-full relative">
          <div
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex h-full"
          >
            <input
              onChange={(e) => onChange(e.target.value)}
              id={id}
              type={type === "search" ? "text" : "number"}
              min={type === "number" ? 0 : undefined}
              value={value}
              placeholder=""
              className={`h-full w-full truncate !rounded-md !border !border-[#c0c7ce] outline-0  ${type === "search" ? "pl-9" : "pl-3"}`}
            />
            <label
              htmlFor={id}
              className={`flex items-center absolute left-0 px-1 cursor-auto transition-all duration-200 ${type === "search" ? "ml-10" : "ml-3"}
								${value!.toString().length > 0 || isFocused ? "-top-2.5 !text-xs font-semibold bg-white" : "h-full top-0"}`}
            >
              {label}
            </label>
          </div>
          {type === "search" && (
            <div className="flex h-full items-center absolute top-0 left-0 ml-3">
              <SearchIcon />
            </div>
          )}
          {type === "search" && value!.toString().length > 0 && (
            <p
              onClick={() => onChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2 text-slate-600 !bg-white cursor-pointer"
            >
              <CloseIcon />
            </p>
          )}
        </div>
      </div>
    </>
  );
}
