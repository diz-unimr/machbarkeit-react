/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import DropDownContainer from "@components/ui/dropdown/DropDownContainer";
import type { DropDownOption } from "@components/ui/dropdown/type";
import DatePicker from "@components/ui/inputs/DatePicker";
import type { TimeRangeType } from "@features/filters/controls/type";
import { invalidBetweenMessage } from "@app/constants/constantText";

export type OptionCode = "no filter" | "at" | "before" | "after" | "between";
type SelectedDate = {
  afterDate?: string;
  beforeDate?: string;
};

type TimeRangeOptionProps = {
  id?: string;
  size?: "sm" | "md";
  timeRestrictionData?: TimeRangeType["timeRestriction"] | null;
  onValidityChange: (isValid: boolean) => void;
  onCompleteChange: (
    timeRange: TimeRangeType["timeRestriction"] | null
  ) => void;
};

const TimeRangeOption = ({
  id,
  size = "md",
  timeRestrictionData = null,
  onValidityChange,
  onCompleteChange,
}: TimeRangeOptionProps) => {
  const syncSelectedOption = (
    next: TimeRangeType["timeRestriction"] | null
  ) => {
    if (!next) {
      return "no filter";
    }
    let option: OptionCode = "no filter";
    const hasAfter = !!next.afterDate;
    const hasBefore = !!next.beforeDate;

    if (hasAfter && hasBefore) {
      option = next.afterDate === next.beforeDate ? "at" : "between";
    } else if (hasAfter) {
      option = "after";
    } else if (hasBefore) {
      option = "before";
    }
    return option;
  };

  const [selectedOption, setSelectedOption] = useState<OptionCode>(
    () => syncSelectedOption(timeRestrictionData) ?? "no filter"
  );
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    afterDate: timeRestrictionData?.afterDate ?? undefined,
    beforeDate: timeRestrictionData?.beforeDate ?? undefined,
  });
  const [isFilterCompleted, setIsFilterCompleted] = useState<boolean>(true);

  const dropDownOptions: DropDownOption[] = [
    { code: "no filter", display: "kein Filter" },
    { code: "at", display: "am" },
    { code: "before", display: "vor" },
    { code: "after", display: "nach" },
    { code: "between", display: "zwischen" },
  ];

  const getInputOption = (option: string) => {
    const selected = dropDownOptions.find((o) => o.code === option);
    switch (option) {
      case "no filter":
        return null;
      case "at":
        return (
          <DatePicker
            id={id ? option + "-" + id : option}
            label={selected?.display || ""}
            value={(selectedDate.afterDate || selectedDate.beforeDate) ?? ""}
            size={size}
            onChange={(date) =>
              setSelectedDate({
                afterDate: date,
                beforeDate: date,
              })
            }
          />
        );
      case "before":
        return (
          <DatePicker
            id={id ? option + "-" + id : option}
            label={selected?.display || ""}
            value={selectedDate.beforeDate ?? ""}
            size={size}
            onChange={(date) =>
              setSelectedDate({ afterDate: date, beforeDate: date })
            }
          />
        );
      case "after":
        return (
          <DatePicker
            id={id ? option + "-" + id : option}
            label={selected?.display || ""}
            value={selectedDate.afterDate ?? ""}
            size={size}
            onChange={(date) =>
              setSelectedDate({ afterDate: date, beforeDate: date })
            }
          />
        );
      case "between":
        return (
          <>
            <DatePicker
              id={id ? option + "-from-" + id : option + "-from"}
              label="von"
              value={selectedDate.afterDate ?? ""}
              size={size}
              onChange={(date) =>
                setSelectedDate((prev) => ({ ...prev, afterDate: date }))
              }
            />
            <DatePicker
              id={id ? option + "-to-" + id : option + "-to"}
              label="bis"
              value={selectedDate.beforeDate ?? ""}
              size={size}
              onChange={(date) =>
                setSelectedDate((prev) => ({ ...prev, beforeDate: date }))
              }
            />
          </>
        );
    }
  };

  const IsBetweenValid = (
    selectedDate: SelectedDate,
    selectedOption: string
  ) => {
    if (selectedOption !== "between") return true;
    const afterDate = new Date(selectedDate.afterDate || "");
    const beforeDate = new Date(selectedDate.beforeDate || "");
    const isValid =
      !isNaN(afterDate.getTime()) &&
      !isNaN(beforeDate.getTime()) &&
      afterDate < beforeDate;
    setIsFilterCompleted(isValid);
    return isValid;
  };

  const handleTimeRange = (
    selectedDate: SelectedDate,
    selectedOption: OptionCode
  ): {
    timeRestriction: TimeRangeType["timeRestriction"] | null;
    isValid: boolean;
  } => {
    let timeRestriction: TimeRangeType["timeRestriction"] | null = null;
    let isValid: boolean = true;
    switch (selectedOption) {
      case "no filter": {
        isValid = false;
        timeRestriction = null;
        break;
      }
      case "at": {
        if (selectedDate.afterDate || selectedDate.beforeDate) {
          timeRestriction = {
            afterDate: selectedDate.afterDate || selectedDate.beforeDate,
            beforeDate: selectedDate.afterDate || selectedDate.beforeDate,
          };
        } else {
          isValid = false;
          timeRestriction = null;
        }
        break;
      }
      case "before": {
        if (selectedDate.beforeDate) {
          timeRestriction = { beforeDate: selectedDate.beforeDate };
        } else {
          isValid = false;
          timeRestriction = null;
        }
        break;
      }
      case "after": {
        if (selectedDate.afterDate) {
          timeRestriction = { afterDate: selectedDate.afterDate };
        } else {
          isValid = false;
          timeRestriction = null;
        }
        break;
      }
      case "between": {
        if (selectedDate.afterDate && selectedDate.beforeDate) {
          isValid = IsBetweenValid(selectedDate, selectedOption);
          if (isValid) {
            timeRestriction = {
              afterDate: selectedDate.afterDate,
              beforeDate: selectedDate.beforeDate,
            };
          } else {
            timeRestriction = null;
          }
        } else {
          isValid = false;
          timeRestriction = null;
        }
        break;
      }
      default:
        timeRestriction = null;
    }
    return { timeRestriction, isValid };
  };

  useEffect(() => {
    const { timeRestriction, isValid } = handleTimeRange(
      selectedDate,
      selectedOption
    );

    onValidityChange(isValid);
    if (isValid) onCompleteChange(timeRestriction);
  }, [selectedDate, selectedOption]);

  return (
    <div className="flex flex-col overflow-x-auto">
      <DropDownContainer
        id={id}
        size={size}
        selectedOption={selectedOption}
        dropDownOptions={dropDownOptions}
        onSelectOption={(option: OptionCode) => setSelectedOption(option)}
      >
        {getInputOption(selectedOption)}
      </DropDownContainer>
      {!isFilterCompleted && selectedOption === "between" ? (
        <p className="text-xs text-red-500 m-1">{invalidBetweenMessage}</p>
      ) : null}
    </div>
  );
};

export default TimeRangeOption;
