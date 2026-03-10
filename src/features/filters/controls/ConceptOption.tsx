/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import type { Criterion } from "@app/types/ontologyType";
import type { ConceptType } from "@features/filters/controls/type";

type ConceptOptionProps = {
  criterion: Criterion;
  onChange: (
    filterValue: ConceptType["valueFilter"] | null,
    completeFilter?: boolean,
  ) => void;
};
type Concept = ConceptType["valueFilter"]["selectedConcepts"][number];

const ConceptOption = ({ criterion, onChange }: ConceptOptionProps) => {
  const [selectedValues, setSelectedValue] = useState<Concept[] | []>(
    criterion.valueFilter
      ? (criterion.valueFilter as ConceptType["valueFilter"]).selectedConcepts
      : [],
  );

  const handleChange = (concept: Concept, checked: boolean) => {
    const newSelectedValues = checked
      ? [...selectedValues, concept]
      : selectedValues.filter((v) => v.code !== concept.code);

    setSelectedValue(newSelectedValues);

    const valueFilter = {
      selectedConcepts: newSelectedValues,
      type: "concept",
    };

    onChange(newSelectedValues.length > 0 ? valueFilter : null);
  };

  useEffect(() => {
    const selected =
      (criterion.valueFilter as ConceptType["valueFilter"] | undefined)
        ?.selectedConcepts ?? [];

    setSelectedValue(selected);
  }, [criterion]);

  useEffect(() => {
    if (selectedValues.length === 0) {
      onChange(null);
    }
  }, []);

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
      {selectedValues.length === 0 && (
        <p className="mt-1 text-red-500">Wählen Sie mindestens einen Wert.</p>
      )}
    </div>
  );
};

export default ConceptOption;
