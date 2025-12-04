/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import DropDownContainer from "@components/ui/dropdown/DropDownContainer";
import type { DropDownOption } from "@components/ui/dropdown/type";
import DatePicker from "@components/ui/inputs/DatePicker";
import type { TimeRangeType } from "@features/filters/controls/type";

type OptionCode = "no filter" | "at" | "before" | "after" | "between";
type SelectedDate = {
  afterDate: string;
  beforeDate: string;
};

export default function TimeRangeOption({
  size = "md",
  onChange,
}: {
  size?: "sm" | "md";
  onChange: (
    timeRange: TimeRangeType["timeRestriction"] | null,
    completeFilter: boolean
  ) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<OptionCode>("no filter");
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    afterDate: "",
    beforeDate: "",
  });
  const [error, setError] = useState<string | null>(null);

  const dropDownOption: DropDownOption[] = [
    { code: "no filter", display: "kein Filter" },
    { code: "at", display: "am" },
    { code: "before", display: "vor" },
    { code: "after", display: "nach" },
    { code: "between", display: "zwischen" },
  ];

  const getInputOption = (option: string) => {
    const selected = dropDownOption.find((o) => o.code === option);
    switch (option) {
      case "no filter":
        return null;
      case "at":
        return (
          <DatePicker
            id={option}
            label={selected?.display || ""}
            value={selectedDate.afterDate || selectedDate.beforeDate}
            size={size}
            onChange={(date) =>
              setSelectedDate((prev) => ({
                ...prev,
                afterDate: date,
                beforeDate: date,
              }))
            }
          />
        );
      case "before":
        return (
          <DatePicker
            id={option}
            label={selected?.display || ""}
            value={selectedDate.beforeDate}
            size={size}
            onChange={(date) =>
              setSelectedDate((prev) => ({ ...prev, beforeDate: date }))
            }
          />
        );
      case "after":
        return (
          <DatePicker
            id={option}
            label={selected?.display || ""}
            value={selectedDate.afterDate}
            size={size}
            onChange={(date) =>
              setSelectedDate((prev) => ({ ...prev, afterDate: date }))
            }
          />
        );
      case "between":
        return (
          <>
            <DatePicker
              id={option}
              label="von"
              value={selectedDate.afterDate}
              size={size}
              onChange={(date) =>
                setSelectedDate((prev) => ({ ...prev, afterDate: date }))
              }
            />
            <DatePicker
              id={option}
              label="bis"
              value={selectedDate.beforeDate}
              size={size}
              onChange={(date) =>
                setSelectedDate((prev) => ({ ...prev, beforeDate: date }))
              }
            />
          </>
        );
    }
  };

  const handleTimeRange = (
    selectedDate: SelectedDate,
    selectedOption: string
  ) => {
    if (
      selectedOption === "no filter" ||
      (selectedDate.beforeDate === "" && selectedDate.afterDate === "")
    ) {
      return null;
    } else {
      const timeRestriction: TimeRangeType["timeRestriction"] = {
        afterDate:
          selectedOption === "at"
            ? selectedDate.afterDate || selectedDate.beforeDate || null
            : selectedOption === "after" || selectedOption === "between"
              ? selectedDate.afterDate || null
              : null,
        beforeDate:
          selectedOption === "at"
            ? selectedDate.afterDate || selectedDate.beforeDate || null
            : selectedOption === "before" || selectedOption === "between"
              ? selectedDate.beforeDate || null
              : null,
      };

      return timeRestriction.beforeDate === null &&
        timeRestriction.afterDate === null
        ? null
        : timeRestriction;
    }
  };

  useEffect(() => {
    const afterDate = new Date(selectedDate.afterDate);
    const beforeDate = new Date(selectedDate.beforeDate);
    let completeFilter = true;
    const invalidBetween =
      selectedOption === "between" &&
      (isNaN(afterDate.getTime()) ||
        isNaN(beforeDate.getTime()) ||
        afterDate >= beforeDate);

    if (invalidBetween) {
      completeFilter = false;
      setError("Der minimale Wert muss kleiner als der maximale Wert sein.");
      onChange(null, completeFilter);
      return;
    }

    setError(null);
    onChange(handleTimeRange(selectedDate, selectedOption), completeFilter);
  }, [selectedDate, selectedOption]);

  return (
    <div className="flex flex-col overflow-x-auto">
      <DropDownContainer
        size={size}
        selectedOption={selectedOption}
        dropDownOption={dropDownOption}
        onSelectOption={(option) => setSelectedOption(option as OptionCode)}
      >
        {getInputOption(selectedOption)}
      </DropDownContainer>
      {error ? <p className="text-xs text-red-500 m-1">{error}</p> : null}
    </div>
  );
}
