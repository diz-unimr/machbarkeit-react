/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion } from "@app/types/ontologyType";
import type { DropDownOption } from "@components/ui/dropdown/type";
import { useEffect, useState } from "react";
import InputTextField from "@components/ui/inputs/InputTextField";
import DropDownContainer from "@components/ui/dropdown/DropDownContainer";
import type { QuantityType } from "@features/filters/controls/type";
import { invalidBetweenMessage } from "@app/constants/constantText";
import type { OptionCode } from "./TimeRangeOption";

type QuantityOptionProps = {
  criterion: Criterion;
  size?: "sm" | "md";
  onChange: (
    filterValue: QuantityType["valueFilter"] | null,
    completeFilter?: boolean,
  ) => void;
};

type SelectedValue = {
  value: string;
  min: string;
  max: string;
};

const dropDownOptions: DropDownOption[] = [
  { code: "no filter", display: "Bitte wählen..." },
  { code: "eq", display: "gleich" },
  { code: "lt", display: "kleine" },
  { code: "gt", display: "größer" },
  { code: "between", display: "zwischen" },
];

const QuantityOption = ({
  criterion,
  size = "md",
  onChange,
}: QuantityOptionProps) => {
  const [selectedOption, setSelectedOption] = useState<OptionCode>("no filter");
  const [selectedUnit, setSelectedUnit] = useState(
    criterion.filterOptions?.[0].display || "",
  );
  const [selectedValue, setSelectedValue] = useState<SelectedValue>({
    value: "0",
    min: "0",
    max: "0",
  });
  const [isFilterCompleted, setIsFilterCompleted] = useState<boolean>(true);
  const [isFilterNull, setIsFilterNull] = useState<boolean>(true);

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
              setSelectedValue((prev) => ({ ...prev, value: value }))
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
                setSelectedValue((prev) => ({ ...prev, min: min }))
              }
              width="w-[100px]"
            />
            <InputTextField
              id={option}
              label="max"
              type="number"
              value={selectedValue["max"]}
              onChange={(max) =>
                setSelectedValue((prev) => ({ ...prev, max: max }))
              }
              width="w-[100px]"
            />
          </>
        );
    }
  };

  const handleQuantityChange = (
    selectedOption: OptionCode,
    selectedUnit: string,
    selectedValue: SelectedValue,
  ) => {
    if (criterion.filterOptions) {
      let valueFilter: QuantityType["valueFilter"] | null = null;
      if (selectedOption === "no filter") {
        setIsFilterCompleted(true);
        setIsFilterNull(true);
        return null;
      }
      setIsFilterNull(false);
      const invalidBetween =
        selectedOption === "between" &&
        selectedValue["min"] !== "" &&
        selectedValue["max"] !== "" &&
        Number(selectedValue["min"]) >= Number(selectedValue["max"]);

      if (invalidBetween) {
        setIsFilterCompleted(false);
        return null;
      } else {
        valueFilter = {
          unit: criterion.filterOptions?.filter(
            (option) => option.code === selectedUnit,
          )[0],
          comparator: selectedOption === "between" ? null : selectedOption,
          value:
            selectedOption === "between"
              ? null
              : Number(selectedValue["value"]),
          minValue:
            selectedOption === "between" ? Number(selectedValue["min"]) : null,
          maxValue:
            selectedOption === "between" ? Number(selectedValue["max"]) : null,
          type:
            selectedOption === "between"
              ? "quantity-range"
              : "quantity-comparator",
        };
        setIsFilterCompleted(true);
      }

      return valueFilter;
    }
  };

  useEffect(() => {
    const valueFilter = handleQuantityChange(
      selectedOption,
      selectedUnit,
      selectedValue,
    );
    onChange(valueFilter || null);
  }, [selectedOption, selectedUnit, selectedValue]);

  return (
    <div className="flex flex-col overflow-x-auto">
      <DropDownContainer
        selectedOption={selectedOption}
        dropDownOptions={dropDownOptions}
        unitOptions={criterion.filterOptions}
        size={size}
        onSelectOption={(option) => setSelectedOption(option)}
        onSelectUnit={(unit) => setSelectedUnit(unit)}
      >
        {getInputOption(selectedOption)}
      </DropDownContainer>
      {!isFilterCompleted && (
        <p className="text-xs text-red-500 m-1">{invalidBetweenMessage}</p>
      )}
      {isFilterNull && (
        <p className="mt-1 text-red-500">Wählen Sie mindestens einen Wert.</p>
      )}
    </div>
  );
};

export default QuantityOption;
