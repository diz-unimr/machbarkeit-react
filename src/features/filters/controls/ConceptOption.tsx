/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import type { Criterion } from "@app/types/ontology";
import type { ConceptType } from "@features/filters/controls/type";

type ConceptOptionProps = {
  criterion: Criterion;
  onChange: (concept: ConceptType | null) => void;
};
type Concept = ConceptType["valueFilter"]["selectedConcepts"][number];

export default function ConceptOption({
  criterion,
  onChange,
}: ConceptOptionProps) {
  const [selectedValues, setSelectedValue] = useState<Concept[] | []>([]);

  const handleChange = (concept: Concept, checked: boolean) => {
    const newSelectedValues = checked
      ? [...selectedValues, concept]
      : selectedValues.filter((v) => v.code !== concept.code);

    setSelectedValue(newSelectedValues);

    onChange({
      valueFilter: {
        type: "concept",
        selectedConcepts: newSelectedValues,
      },
    });
  };

  return (
    <div className="flex flex-col gap-1">
      {criterion.filterOptions?.map((option) => (
        <div key={option.code} className="flex gap-2">
          <input
            type="checkbox"
            value={option.code}
            onChange={(e) => handleChange(option, e.target.checked)}
          />
          <label>{option.display}</label>
        </div>
      ))}
    </div>
  );
}
