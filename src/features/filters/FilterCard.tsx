/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import { ArrowButton } from "../../components/ui/buttons/ArrowButton";
import { Button, DeleteButton } from "../../components/ui/buttons/Button";
import Card from "../../components/layout/Card";
import ConceptOption from "./controls/ConceptOption";
import QuantityOption from "./controls/QuantityOption";
import TimeRangeOption from "./controls/TimeRangeOption";
import type { Criterion } from "../ontology/type";
import type { ConceptType, QuantityType, TimeRangeType } from "./controls/type";

export type FilterDataProps = {
  selectedFilter: ConceptType | QuantityType | TimeRangeType | null;
  isCompleted: boolean;
};
type FilterCardProps = {
  id: string;
  criterionFilter: Criterion;
  onFilterChange: (filterData: FilterDataProps) => void;
};

export default function Filtercard({
  id,
  criterionFilter,
  onFilterChange,
}: FilterCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFilterCompleted, setIsFilterCompleted] = useState(true);

  const toggleExpansion = () => {
    setIsExpanded((prev) => {
      const isExpanded = !prev;
      return isExpanded;
    });
  };

  const getSelectedFilter = (
    selectedFilter: ConceptType | QuantityType | TimeRangeType | null,
    isCompleted?: boolean
  ) => {
    if (isCompleted === undefined) {
      isCompleted = true;
      setIsFilterCompleted(true);
    } else setIsFilterCompleted(isCompleted);
    onFilterChange({ selectedFilter, isCompleted });
  };

  useEffect(() => {
    console.log("criterion in FilterCard: ", criterionFilter);
  }, [criterionFilter]);

  return (
    <Card className="border-none m-5">
      <div className="flex gap-2.5 items-center justify-between mx-2.5 mb-4">
        <p className="font-medium">{criterionFilter.display}</p>
        <DeleteButton id="delete" label="Löschen" iconPath="./delete.png" />
      </div>
      <Card
        className="relativ overflow-hidden border-none !shadow-[0_3px_1px_-2px_#adbcd7,0_2px_2px_0_#adbcd7,0_1px_5px_0_#adbcd7] transition-[height] duration-800 ease-linear"
        bodyClassName="pt-1.5 pb-3"
        height="56px"
        isExpanded={isExpanded}
      >
        <div className="flex justify-between items-center pb-3">
          <div className="flex gap-2 items-center">
            <ArrowButton
              id={id}
              key={id}
              isExpanded={isExpanded}
              hasChildren={true}
              onClick={toggleExpansion}
            />
            <p>
              {criterionFilter.filterType === null ? "Zeitraum" : "Wertbereich"}
            </p>
          </div>
          <Button
            id="reset"
            label="ZURÜCKSETZEN"
            isActive={false}
            color="#ededed"
          />
        </div>
        <div className="flex flex-col gap-2 px-6 pb-0">
          {criterionFilter.filterType === "concept" ? (
            <ConceptOption
              criterionFilter={criterionFilter}
              onChange={getSelectedFilter}
            />
          ) : criterionFilter.filterType === "quantity" ? (
            <QuantityOption
              criterionFilter={criterionFilter}
              onChange={getSelectedFilter}
            />
          ) : (
            <TimeRangeOption
              criterionFilter={criterionFilter}
              onChange={getSelectedFilter}
            />
          )}
          {!isFilterCompleted && (
            <span className="flex pl-2 text-red-600 font-medium text-xs">
              "Der minimale Wert muss kleiner als der maximale Wert sein"
            </span>
          )}
        </div>
      </Card>
    </Card>
  );
}
