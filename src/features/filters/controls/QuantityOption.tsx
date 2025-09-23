/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import Card from "../../../components/ui/Card";
import DropDown from "../../../components/ui/dropdown/DropDown";
import type { Criterion } from "../../ontology/type";
import type { DropDownOption } from "../../../components/ui/dropdown/type";
import { useState } from "react";
import InputTextField from "../../../components/ui/InputTextField";

export default function QuantityOption({
  criterion,
}: {
  criterion: Criterion;
}) {
  const [selectedOption, setSelectedOption] = useState("no filter");
  const [selectedUnit, setSelectedUnit] = useState(
    criterion.filterOptions?.[0].display || ""
  );
  const [inputValue, setInputValue] = useState<number>(0);

  const handleSelectedOption = (option: string) => {
    setSelectedOption(option);
  };
  const handleInputValueChange = (value: string | number) => {
    console.log("value: ", value);
    setInputValue(value as number);
  };

  const handleSelectedUnit = (unit: string) => {
    console.log("unit: ", unit);
    setSelectedUnit(unit);
  };

  const dropDownOption: DropDownOption[] = [
    { code: "no filter", display: "kein Filter" },
    { code: "eq", display: "gleich" },
    { code: "lt", display: "kleine" },
    { code: "gt", display: "größer" },
    { code: "between", display: "zwischen" },
  ];

  const getInputOption = (option: string) => {
    switch (option) {
      case "no filter":
        return null;
      case "eq":
      case "lt":
      case "gt":
        return (
          <InputTextField
            id={option}
            label="Wert"
            type="number"
            value={inputValue}
            onChange={handleInputValueChange}
            width="w-[100px]"
          />
        );
      case "between":
        return (
          <>
            <InputTextField
              id={option}
              label="Min"
              type="number"
              value={inputValue}
              onChange={handleInputValueChange}
              width="w-[100px]"
            />
            <InputTextField
              id={option}
              label="Max"
              type="number"
              value={inputValue}
              onChange={handleInputValueChange}
              width="w-[100px]"
            />
          </>
        );
    }
  };
  return (
    <Card bodyClassName="h-full gap-3">
      <div>Geben Sie einen Wertebereich ein:</div>
      <div className="flex items-center gap-5 pt-1.5 overflow-x-auto">
        <DropDown options={dropDownOption} onSelect={handleSelectedOption} />
        <div className="flex gap-2.5 items-center">
          {getInputOption(selectedOption)}
          {selectedOption !== "no filter" && (
            <DropDown
              width="100px"
              options={criterion.filterOptions}
              onSelect={handleSelectedUnit}
            />
          )}
        </div>
      </div>
    </Card>
  );
}
