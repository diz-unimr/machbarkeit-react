/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import type { DropDownOption } from "@components/ui/dropdown/type";
import type { OptionCode } from "@features/filters/controls/TimeRangeOption";

type DropDownProps = {
  id?: string;
  size?: "sm" | "md";
  selectedOption?: OptionCode;
  options: DropDownOption[] | null;
  onSelect: (selectedValue: OptionCode) => void;
};

const DropDown = ({
  id,
  size = "md",
  selectedOption = "no filter",
  options,
  onSelect,
}: DropDownProps) => {
  const [selectedValue, setSelectedValue] =
    useState<OptionCode>(selectedOption);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value as OptionCode);
    setSelectedValue(event.target.value as OptionCode);
  };

  useEffect(() => {
    setSelectedValue(selectedOption);
  }, [selectedOption]);

  return (
    <div>
      <div className="flex items-center">
        <select
          className={`${size === "sm" ? "w-[95px] !text-[clamp(10px,1vw+0.3rem,12px)]" : "w-[110px]"}`}
          id={id ? "comparator-" + id : "comparator"}
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
};
export default DropDown;
