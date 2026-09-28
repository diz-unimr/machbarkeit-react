/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Coding } from "@app/types/ontologyType";
import type { ConceptType } from "@features/filters/controls/type";
import { validationMessages } from "@/app/constants/uiTexts";

type ConceptValueFilter = ConceptType["valueFilter"];

type ConceptOptionProps = {
  id: string;
  selectedFilters?: Coding[];
  filterOptions: Coding[];
  onChange: (nextFilter: ConceptValueFilter | null) => void;
};
const ConceptOption = ({
  id,
  selectedFilters,
  filterOptions,
  onChange,
}: ConceptOptionProps) => {
  const selectedConcepts: Coding[] = selectedFilters ?? [];

  const handleToggle = (concept: Coding, checked: boolean) => {
    const nextConcepts = checked
      ? [...selectedConcepts, concept]
      : selectedConcepts.filter((c) => c.code !== concept.code);

    onChange(
      nextConcepts.length > 0
        ? {
            selectedConcepts: nextConcepts,
            type: "concept",
          }
        : null,
    );
  };

  const isInvalid = selectedConcepts.length === 0;

  return (
    <fieldset className="flex flex-col gap-1">
      {filterOptions.map((option) => {
        const inputId = `${id ?? "default"} - ${option.code}`;
        const isChecked = selectedConcepts.some((c) => c.code === option.code);

        return (
          <div key={inputId} className="flex gap-2">
            <input
              id={inputId}
              type="checkbox"
              checked={isChecked}
              onChange={(e) => handleToggle(option, e.target.checked)}
            />
            <label htmlFor={inputId}>{option.display}</label>
          </div>
        );
      })}
      {isInvalid && (
        <p className="mt-1 text-red-500">{validationMessages.minSelection}</p>
      )}
    </fieldset>
  );
};

export default ConceptOption;
