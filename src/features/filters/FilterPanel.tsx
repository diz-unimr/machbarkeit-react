/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { CancelButton, SubmitButton } from "../../components/ui/buttons/Button";
import Card from "../../components/layout/Card";
import ButtonContainer from "../../components/ui/buttons/ฺButtonContainer";
import type { Criterion } from "../ontology/type";
import Filtercard from "./FilterCard";
import type { ConceptType, QuantityType, TimeRangeType } from "./controls/type";

type FilterPanelProps = {
  criteria: Criterion[];
  onClick: () => void;
  onCancel: () => void;
};
export default function FilterPanel({
  criteria,
  onClick,
  onCancel,
}: FilterPanelProps) {
  const getFilter = (
    selectedFilter: ConceptType | QuantityType | TimeRangeType | null,
    warningMessage?: string
  ) => {

  };

  return (
    <div className="flex relative z-100 w-[clamp(500px,95%,750px)] mx-auto my-0">
      <div className="flex justify-center w-full absolute -top-5">
        <Card className="flex flex-col w-full max-h-[890px] border-none">
          <h1 className="p-2.5 mb-5 font-bold border-b-2 border-solid border-[#5a78ae]">
            Einschränkungen der ausgewählten Merkmale
          </h1>
          <div className="min-h-0 overflow-y-auto">
            {criteria.map((criterion, index) => (
              <Filtercard
                key={index}
                id={String(index)}
                criterion={criterion}
                onGetFilter={getFilter}
              />
            ))}
          </div>
          <div className="flex gap-3.5 items-center justify-end mt-5 mr-5">
            <ButtonContainer>
              <CancelButton id="cancel" label="ABBRECHEN" onClick={onCancel} />
              <SubmitButton id="submit" label="HINZUFÜGEN" onClick={onClick} />
            </ButtonContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
