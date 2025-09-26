/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion } from "../../ontology/type";
import type { DropDownOption } from "../../../components/ui/dropdown/type";
import { useEffect, useState } from "react";
import InputTextField from "../../../components/ui/inputs/InputTextField";
import DropDownContainer from "../../../components/ui/dropdown/DropDownContainer";
import type { QuantityType } from "./type";

type QuantityOptionProps = {
  criterion: Criterion;
  onChange: (value: QuantityType | null) => void;
};

const dropDownOption: DropDownOption[] = [
  { code: "no filter", display: "kein Filter" },
  { code: "eq", display: "gleich" },
  { code: "lt", display: "kleine" },
  { code: "gt", display: "größer" },
  { code: "between", display: "zwischen" },
];

export default function QuantityOption({
  criterion,
  onChange,
}: QuantityOptionProps) {
  const [selectedOption, setSelectedOption] = useState("no filter");
  const [selectedUnit, setSelectedUnit] = useState(
    criterion.filterOptions?.[0].display || ""
  );
  const [selectedValue, setSelectedValue] = useState({
    value: 0,
    min: 0,
    max: 0,
  });

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
            label="wert"
            type="number"
            value={selectedValue["value"]}
            onChange={(value) =>
              setSelectedValue((prev) => ({ ...prev, value: value as number }))
            }
            width="w-[100px]"
          />
        );
      case "between":
        return (
          <>
            <InputTextField
              id={option}
              label="min"
              type="number"
              value={selectedValue["min"]}
              onChange={(min) =>
                setSelectedValue((prev) => ({ ...prev, min: min as number }))
              }
              width="w-[100px]"
            />
            <InputTextField
              id={option}
              label="max"
              type="number"
              value={selectedValue["max"]}
              onChange={(max) =>
                setSelectedValue((prev) => ({ ...prev, max: max as number }))
              }
              width="w-[100px]"
            />
          </>
        );
    }
  };

  useEffect(() => {
    if (criterion.filterOptions) {
      if (selectedOption === "no filter") {
        onChange(null);
        return;
      }

      onChange({
        valueFilter: {
          unit: criterion.filterOptions?.filter(
            (option) => option.code === selectedUnit
          )[0],
          comparator: selectedOption === "between" ? null : selectedOption,
          value: selectedOption === "between" ? null : selectedValue["value"],
          minValue: selectedOption === "between" ? selectedValue["min"] : null,
          maxValue: selectedOption === "between" ? selectedValue["max"] : null,
          type:
            selectedOption === "between"
              ? "quantity-range"
              : "quantity-comparator",
        },
      });
    }
  }, [
    criterion.filterOptions,
    onChange,
    selectedOption,
    selectedUnit,
    selectedValue,
  ]);

  return (
    <DropDownContainer
      selectedOption={selectedOption}
      dropDownOption={dropDownOption}
      unitOptions={criterion.filterOptions}
      onSelectOption={(option) => setSelectedOption(option)}
      onSelectUnit={(unit) => setSelectedUnit(unit)}
    >
      {getInputOption(selectedOption)}
    </DropDownContainer>
  );
}
