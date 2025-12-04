/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import type { DropDownOption } from "@components/ui/dropdown/type";

type DropDownProps = {
  size?: "sm" | "md";
  options: DropDownOption[] | null;
  onSelect: (selectedValue: string) => void;
};
export default function DropDown({
  size = "md",
  options,
  onSelect,
}: DropDownProps) {
  const [selectedValue, setSelectedValue] = useState("no filter");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
    setSelectedValue(event.target.value);
  };
  return (
    <div>
      <div className="flex items-center">
        <select
          className={`${size === "sm" ? "w-[95px] !text-[clamp(10px,1vw+0.3rem,12px)]" : "w-[110px]"}`}
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
