/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import DropDownContainer from "../../../components/ui/dropdown/DropDownContainer";
import type { DropDownOption } from "../../../components/ui/dropdown/type";
import DatePicker from "../../../components/ui/inputs/DatePicker";
import type { TimeRangeType } from "./type";

type OptionCode = "no filter" | "at" | "before" | "after" | "between";
type SelectedDate = {
  afterDate: string;
  beforeDate: string;
};

export default function TimeRangeOption({
  onChange,
}: {
  onChange: (timeRange: TimeRangeType | null) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<OptionCode>("no filter");
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    afterDate: "",
    beforeDate: "",
  });

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
              onChange={(date) =>
                setSelectedDate((prev) => ({ ...prev, afterDate: date }))
              }
            />
            <DatePicker
              id={option}
              label="bis"
              value={selectedDate.beforeDate}
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
        : { timeRestriction };
    }
  };

  useEffect(() => {
    onChange(handleTimeRange(selectedDate, selectedOption));
  }, [onChange, selectedDate, selectedOption]);

  return (
    <>
      <DropDownContainer
        selectedOption={selectedOption}
        dropDownOption={dropDownOption}
        onSelectOption={(option) => setSelectedOption(option as OptionCode)}
      >
        {getInputOption(selectedOption)}
      </DropDownContainer>
    </>
  );
}
