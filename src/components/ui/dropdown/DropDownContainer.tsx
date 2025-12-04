/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion } from "@app/types/ontology";
import DropDown from "@components/ui/dropdown/DropDown";
import type { DropDownOption } from "@components/ui/dropdown/type";

type DropDownContainerProps = {
  children?: React.ReactNode;
  selectedOption: string;
  dropDownOption: DropDownOption[];
  unitOptions?: Criterion["filterOptions"];
  size?: "sm" | "md";
  onSelectOption: (option: string) => void;
  onSelectUnit?: (unit: string) => void;
};
export default function DropDownContainer({
  children,
  selectedOption = "no filter",
  dropDownOption,
  unitOptions,
  size = "md",
  onSelectOption,
  onSelectUnit,
}: DropDownContainerProps) {
  return (
    <div className="flex items-center gap-3 pt-1.5 overflow-x-auto">
      <DropDown
        size={size}
        options={dropDownOption}
        onSelect={onSelectOption}
      />
      <div className="flex gap-2.5 items-center">
        {children}
        {unitOptions && onSelectUnit && selectedOption !== "no filter" && (
          <DropDown size={size} options={unitOptions} onSelect={onSelectUnit} />
        )}
      </div>
    </div>
  );
}
