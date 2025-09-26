/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion } from "../../../features/ontology/type";
import DropDown from "./DropDown";
import type { DropDownOption } from "./type";

type DropDownContainerProps = {
  children?: React.ReactNode;
  selectedOption: string;
  dropDownOption: DropDownOption[];
  unitOptions?: Criterion["filterOptions"];
  onSelectOption: (option: string) => void;
  onSelectUnit?: (unit: string) => void;
};
export default function DropDownContainer({
  children,
  selectedOption = "no filter",
  dropDownOption,
  unitOptions,
  onSelectOption,
  onSelectUnit,
}: DropDownContainerProps) {
  return (
    <div className="flex items-center gap-6.5 pt-1.5 overflow-x-auto">
      <DropDown options={dropDownOption} onSelect={onSelectOption} />
      <div className="flex gap-2.5 items-center">
        {children}
        {unitOptions && onSelectUnit && selectedOption !== "no filter" && (
          <DropDown
            width="100px"
            options={unitOptions}
            onSelect={onSelectUnit}
          />
        )}
      </div>
    </div>
  );
}
