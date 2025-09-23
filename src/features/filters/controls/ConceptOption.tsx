/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import Card from "../../../components/ui/Card";
import type { Criterion } from "../../ontology/type";
type ConceptOptionProps = {
  criterion: Criterion;
  onChange: (selectedValues: string[] | []) => void;
};

export default function ConceptOption({
  criterion,
  onChange,
}: ConceptOptionProps) {
  const [selectedValues, setSelectedValue] = useState<string[] | []>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newSelectedValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter((v) => v !== value);
    setSelectedValue(newSelectedValues);
    onChange(newSelectedValues);
  };

  return (
    <Card
      className="m-3 border-none !shadow-[0_3px_1px_-2px_#adbcd7,0_2px_2px_0_#adbcd7,0_1px_5px_0_#adbcd7]"
      bodyClassName="h-full"
    >
      <div className="font-medium">
        Geben Sie einen oder mehrere zulässige Werte an:
      </div>
      <div className="flex flex-col gap-1 p-4 pb-0">
        {criterion.filterOptions?.map((option) => (
          <div key={option.code} className="flex gap-2">
            <input
              type="checkbox"
              value={option.display}
              onChange={handleChange}
            />
            <label>{option.display}</label>
          </div>
        ))}
      </div>
    </Card>
  );
}
