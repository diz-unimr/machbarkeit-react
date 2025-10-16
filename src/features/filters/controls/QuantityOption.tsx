/* eslint-disable react-hooks/exhaustive-deps */
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
  onChange: (value: QuantityType | null, warningMessage?: string) => void;
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

  const checkCompletedFilter = (
    selectedOption: string,
    valueFilter: QuantityType["valueFilter"]
  ) => {
    let warningMessage = undefined;
    if (
      selectedOption === "between" &&
      (valueFilter.maxValue === null ||
        valueFilter.minValue === null ||
        valueFilter.minValue >= valueFilter.maxValue)
    ) {
      warningMessage =
        "Der minimale Wert muss kleiner als der maximale Wert sein";
    }
    return warningMessage;
  };

  const handleQuantityFilter = () => {
    let warningMessage = undefined;
    if (selectedOption === "no filter") {
      return null;
    } else {
      const valueFilter: QuantityType["valueFilter"] = {
        unit: criterion.filterOptions?.filter(
          (option) => option.code === selectedUnit
        )[0] ?? { code: "", display: "" },
        comparator: selectedOption === "between" ? null : selectedOption,
        value: selectedOption === "between" ? null : selectedValue["value"],
        minValue: selectedOption === "between" ? selectedValue["min"] : null,
        maxValue: selectedOption === "between" ? selectedValue["max"] : null,
        type:
          selectedOption === "between"
            ? "quantity-range"
            : "quantity-comparator",
      };

      if (selectedOption === "between") {
        warningMessage = checkCompletedFilter(selectedOption, valueFilter);
      }

      return valueFilter.minValue === null &&
        valueFilter.maxValue === null &&
        valueFilter.value
        ? { valueFilter: null, warningMessage }
        : { valueFilter: { valueFilter }, warningMessage };
    }
  };

  useEffect(() => {
    if (criterion.filterOptions) {
      const valueFilterResult = handleQuantityFilter();
      if (!valueFilterResult) onChange(null, undefined);
      else
        onChange(
          valueFilterResult.valueFilter,
          valueFilterResult.warningMessage
        );
      /* onChange(
        selectedOption !== "no filter"
          ? {
              valueFilter: {
                unit: criterion.filterOptions?.filter(
                  (option) => option.code === selectedUnit
                )[0],
                comparator:
                  selectedOption === "between" ? null : selectedOption,
                value:
                  selectedOption === "between" ? null : selectedValue["value"],
                minValue:
                  selectedOption === "between" ? selectedValue["min"] : null,
                maxValue:
                  selectedOption === "between" ? selectedValue["max"] : null,
                type:
                  selectedOption === "between"
                    ? "quantity-range"
                    : "quantity-comparator",
              },
            }
          : null
      ); */
    }
  }, [selectedOption, selectedUnit, selectedValue]);

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
