/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import type { Criterion } from "@app/types/ontologyType";
import type { ConceptType } from "@features/filters/controls/type";

type ConceptOptionProps = {
  criterion: Criterion;
  onChange: (
    filterValue: ConceptType["valueFilter"] | null,
    completeFilter?: boolean
  ) => void;
};
type Concept = ConceptType["valueFilter"]["selectedConcepts"][number];

const ConceptOption = ({ criterion, onChange }: ConceptOptionProps) => {
  const [selectedValues, setSelectedValue] = useState<Concept[] | []>([]);

  const handleChange = (concept: Concept, checked: boolean) => {
    const newSelectedValues = checked
      ? [...selectedValues, concept]
      : selectedValues.filter((v) => v.code !== concept.code);

    setSelectedValue(newSelectedValues);

    const valueFilter = {
      selectedConcepts: newSelectedValues,
      type: "concept",
    };

    onChange(valueFilter);
  };

  useEffect(() => {
    const selected =
      (criterion.valueFilter as ConceptType["valueFilter"] | undefined)
        ?.selectedConcepts ?? [];

    setSelectedValue(selected);
  }, [criterion]);

  return (
    <div className="flex flex-col gap-1">
      {criterion.filterOptions?.map((option) => (
        <div key={option.code} className="flex gap-2">
          <input
            type="checkbox"
            value={option.code}
            checked={selectedValues.some((v) => v.code === option.code)}
            onChange={(e) => handleChange(option, e.target.checked)}
          />
          <label>{option.display}</label>
        </div>
      ))}
    </div>
  );
};

export default ConceptOption;
