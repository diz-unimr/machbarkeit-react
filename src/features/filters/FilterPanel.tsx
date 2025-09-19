/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { CancelButton, SubmitButton } from "../../components/ui/buttons/Button";
import Card from "../../components/ui/Card";
import ButtonContainer from "../../components/ui/ฺButtonContainer";
import type { Criterion } from "../ontology/type";
import Filtercard from "./FilterCard";

type FilterPanelProps = {
  criteria: Criterion[];
  onClick: () => void;
};
export default function FilterPanel({ criteria, onClick }: FilterPanelProps) {
  return (
    <div className="flex relative z-100 w-[clamp(500px,80%,700px)] mx-auto my-0">
      <div className="flex justify-center w-full absolute max-h-[850px] -top-5">
        <Card className="w-full h-full border-none">
          <h1 className="p-2.5 mb-5 font-bold border-b-2 border-solid border-[#5a78ae]">
            Einschränkungen der ausgewählten Merkmale
          </h1>
          {criteria.map((criterion, index) => (
            <Filtercard key={index} id={String(index)} criterion={criterion} />
          ))}
          <div className="flex gap-3.5 items-center justify-end">
            <ButtonContainer>
              <CancelButton id="cancel" label="ABBRECHEN" onClick={onClick} />
              <SubmitButton id="submit" label="HINZUFÜGEN" />
            </ButtonContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
