/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import type { DropDownOption } from "./type";

type DropDownProps = {
  width?: string;
  options: DropDownOption[] | null;
  onSelect: (selectedValue: string) => void;
};
export default function DropDown({ width, options, onSelect }: DropDownProps) {
  const [selectedValue, setSelectedValue] = useState("no filter");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
    setSelectedValue(event.target.value);
  };
  return (
    <div className="max-w-[130px]">
      <div className="flex items-center">
        <select
          style={{ width: width || "130px" }}
          id="comparator"
          name="comparator"
          value={selectedValue}
          onChange={handleChange}
        >
          {options?.map((option) => (
            <option key={option.code} value={option.code}>
              {option.display}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
