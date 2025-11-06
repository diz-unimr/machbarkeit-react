/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { CancelButton, SubmitButton } from "../../components/ui/buttons/Button";
import Card from "../../components/layout/Card";
import ButtonContainer from "../../components/ui/buttons/ฺButtonContainer";
import type { Criterion } from "../ontology/type";
import FilterCard from "./FilterCard";
import type { FilterDataProps } from "./FilterCard";
import { useCharacteristicsStore } from "../../store/characteristics-ui-store";
import { useEffect, useState } from "react";
import { useModulesStore } from "../../store/modules-store";

/* type selectedCriteriaFilterProps = Criterion & {
  index: string;
}; */

type FilterPanelProps = {
  selectedCriteria: Criterion[];
  onSubmit: () => void;
  onCancel: () => void;
};
export default function FilterPanel({
  selectedCriteria,
  onSubmit,
  onCancel,
}: FilterPanelProps) {
  const modules = useModulesStore((state) => state.modules);
  const addCharacteristics = useCharacteristicsStore(
    (state) => state.addCharacteristics
  );

  const [selectedCriteriaFilter, setSelectedCriteriaFilter] = useState<
    Criterion[]
  >([]);

  const handleFilterChange = (index: string, filterData: FilterDataProps) => {
    if (filterData.selectedFilter !== null && filterData.isCompleted) {
      setSelectedCriteriaFilter((prev) =>
        prev.map((criterion, criterion_index) =>
          String(criterion_index) === index
            ? {
                ...criterion,
                valueFilter:
                  filterData.selectedFilter &&
                  "valueFilter" in filterData.selectedFilter
                    ? filterData.selectedFilter.valueFilter
                    : undefined,
                timeRestriction:
                  filterData.selectedFilter &&
                  "timeRestriction" in filterData.selectedFilter
                    ? filterData.selectedFilter.timeRestriction
                    : undefined,
              }
            : criterion
        )
      );
    }
  };
  const submitFilter = () => {
    addCharacteristics(selectedCriteriaFilter);
    onSubmit();
  };

  useEffect(() => {
    const criteria = selectedCriteria.map((criterion) => {
      const moduleColor = modules.find(
        (module) => module.id === criterion.moduleId
      )?.color;
      console.log("moduleColor: ", moduleColor);
      return { ...criterion, color: moduleColor };
    });
    setSelectedCriteriaFilter(criteria);
  }, [selectedCriteria]);

  return (
    <div className="flex relative z-100 w-[clamp(500px,95%,750px)] mx-auto my-0">
      <div className="flex justify-center w-full absolute -top-5">
        <Card className="flex flex-col w-full max-h-[890px] border-none">
          <h1 className="p-2.5 mb-5 font-bold border-b-2 border-solid border-[#5a78ae]">
            Einschränkungen der ausgewählten Merkmale
          </h1>
          <div className="min-h-0 overflow-y-auto">
            {selectedCriteriaFilter.map((criterionFilter, index) => (
              <FilterCard
                key={index}
                id={String(index)}
                criterionFilter={criterionFilter}
                onFilterChange={(filterData) =>
                  handleFilterChange(String(index), filterData)
                }
              />
            ))}
          </div>
          <div className="flex gap-3.5 items-center justify-end mt-5 mr-5">
            <ButtonContainer>
              <CancelButton id="cancel" label="ABBRECHEN" onClick={onCancel} />
              <SubmitButton
                id="submit"
                label="HINZUFÜGEN"
                onClick={submitFilter}
              />
            </ButtonContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
