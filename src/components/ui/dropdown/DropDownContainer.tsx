/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { DropDownOption } from "@/features/filters/controls/type";
import type { Coding } from "@app/types/ontologyType";
import DropDown from "@components/ui/dropdown/DropDown";
import type { OptionCode } from "@features/filters/controls/TimeRangeOption";

type DropDownContainerProps = {
  id?: string;
  children?: React.ReactNode;
  selectedOption: OptionCode;
  dropDownOptions?: DropDownOption[];
  unitOptions?: Coding[] | null;
  size?: "sm" | "md";
  onSelectOption: (option: OptionCode) => void;
  onSelectUnit?: (unit: string) => void;
};

const DropDownContainer = ({
  id,
  children,
  selectedOption,
  dropDownOptions,
  unitOptions,
  size = "md",
  onSelectOption,
  onSelectUnit,
}: DropDownContainerProps) => {
  const compareOptions: DropDownOption[] = [
    { code: "no filter", display: "Bitte wählen..." },
    { code: "eq", display: "gleich" },
    { code: "lt", display: "kleiner" },
    { code: "gt", display: "größer" },
    { code: "between", display: "zwischen" },
  ];

  return (
    <div className="flex items-center gap-3 pt-1.5">
      {/* overflow-x-auto */}
      <DropDown
        id={id}
        size={size}
        selectedOption={selectedOption}
        options={dropDownOptions || compareOptions}
        onSelect={onSelectOption}
      />
      <div className="flex gap-2.5 items-center">
        {children}
        {unitOptions && onSelectUnit && selectedOption !== "no filter" && (
          <DropDown
            id={id}
            size={size}
            // selectedUnit={selectedUnit}
            options={unitOptions}
            onSelect={onSelectUnit}
          />
        )}
      </div>
    </div>
  );
};
export default DropDownContainer;
