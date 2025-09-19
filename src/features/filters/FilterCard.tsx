/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import { ArrowButton } from "../../components/ui/buttons/ArrowButton";
import { Button, DeleteButton } from "../../components/ui/buttons/Button";
import Card from "../../components/ui/Card";
import ConceptOption from "./controls/ConceptOption";
import QuantityOption from "./controls/QuantityOption";
import TimeRangeOption from "./controls/TimeRangeOption";
import type { Criterion } from "../ontology/type";

type FilterCardProps = {
  id: string;
  criterion: Criterion;
};
export default function Filtercard({ id, criterion }: FilterCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((prev) => {
      const isExpanded = !prev;
      return isExpanded;
    });
  };

  return (
    <Card className="h-full border-none m-5">
      <div className="flex gap-2.5 items-center justify-between mx-2.5 mb-4">
        <p className="font-medium">{criterion.display}</p>
        <DeleteButton id="delete" label="Löschen" />
      </div>
      <Card
        className="relativ overflow-hidden border-none !shadow-[0_3px_1px_-2px_#adbcd7,0_2px_2px_0_#adbcd7,0_1px_5px_0_#adbcd7] transition-[height] duration-800 ease-linear"
        bodyClassName="h-full py-1.5"
        height="56px"
        isExpanded={isExpanded}
      >
        <div className="flex justify-between items-center pb-1">
          <div className="flex gap-2 items-center">
            <ArrowButton
              id={id}
              key={id}
              isExpanded={isExpanded}
              hasChildren={true}
              onClick={toggleExpansion}
            />
            <p>{criterion.filterType === null ? "Zeitraum" : "Wertbereich"}</p>
          </div>
          <Button
            id="reset"
            label="ZURÜCKSETZEN"
            isActive={false}
            color="#ededed"
          />
        </div>
        {criterion.filterType === "concept" ? (
          <ConceptOption criterion={criterion} />
        ) : criterion.filterType === "quantity" ? (
          <QuantityOption criterion={criterion} />
        ) : (
          <TimeRangeOption criterion={criterion} />
        )}
      </Card>
    </Card>
  );
}
