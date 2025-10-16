/* eslint-disable react-hooks/exhaustive-deps */
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
  onChange: (timeRange: TimeRangeType | null, warningMessage?: string) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<OptionCode>("no filter");
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    afterDate: "",
    beforeDate: "",
  });
  /*  const [warningMessage, setWarningMessage] = useState<string | undefined>(
    undefined
  ); */

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

  const checkCompletedFilter = (
    selectedOption: string,
    timeRestriction: TimeRangeType["timeRestriction"]
  ) => {
    let warningMessage = undefined;
    if (
      selectedOption === "between" &&
      (timeRestriction.afterDate === null ||
        timeRestriction.beforeDate === null ||
        timeRestriction.afterDate >= timeRestriction.beforeDate)
    ) {
      warningMessage =
        "Der minimale Wert muss kleiner als der maximale Wert sein";
    }
    return warningMessage;
  };

  const handleTimeRangeFilter = (
    selectedDate: SelectedDate,
    selectedOption: string
  ) => {
    let warningMessage = undefined;
    if (selectedOption === "no filter") {
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

      if (selectedOption === "between") {
        warningMessage = checkCompletedFilter(selectedOption, timeRestriction);
      }

      return timeRestriction.beforeDate === null &&
        timeRestriction.afterDate === null
        ? { timeRestriction: null, warningMessage }
        : { timeRestriction: { timeRestriction }, warningMessage };
    }
  };

  useEffect(() => {
    const timeRangeResult = handleTimeRangeFilter(selectedDate, selectedOption);

    if (!timeRangeResult) {
      onChange(null, undefined);
    } else {
      onChange(timeRangeResult.timeRestriction, timeRangeResult.warningMessage);
    }
  }, [selectedDate, selectedOption]);

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
