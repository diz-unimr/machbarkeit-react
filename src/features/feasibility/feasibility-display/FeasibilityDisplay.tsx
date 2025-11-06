/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { AxiosError } from "axios";
import Card from "../../../components/layout/Card";
import UploadButton from "../../../components/ui/buttons/UploadButton";
import ButtonContainer from "../../../components/ui/buttons/ฺButtonContainer";
import type { MachbarkeitQueryData } from "../type";
import { Button, IconButton } from "../../../components/ui/buttons/Button";
import type { Criterion } from "../../ontology/type";
import {
  setConceptType,
  setQuantityType,
  setTimeRangeType,
} from "./CriterionRenderer";
import { useCharacteristicsStore } from "../../../store/characteristics-ui-store";

type FeasibilityDisplayProps = {
  characteristics: Array<Array<Criterion>>;
};
export default function FeasibilityDisplay({
  characteristics,
}: FeasibilityDisplayProps) {
  const convertToCharacteristicsDisplay = (x) => {};

  const deleteCharacteristics = useCharacteristicsStore(
    (state) => state.deleteCharacteristic
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json") {
      alert("Please select a JSON file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const uploadedCriteria: MachbarkeitQueryData = JSON.parse(
          e.target?.result as string
        );
        const isJsonDataValid =
          !!(
            uploadedCriteria.inclusionCriteria &&
            uploadedCriteria.inclusionCriteria!.length > 0
          ) ||
          (uploadedCriteria.exclusionCriteria &&
            uploadedCriteria.exclusionCriteria!.length > 0);
        if (isJsonDataValid) {
          convertToCharacteristicsDisplay(uploadedCriteria);
        } else {
          alert("Invalid JSON Format");
        }
      } catch (error) {
        alert((error as AxiosError).message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <section>
      <Card header="Ausgewählte Merkmale" headerClassName="justify-start">
        <div className="flex flex-col min-h-[150px] gap-5">
          <ButtonContainer>
            <UploadButton
              id="uplaod-query"
              label="ABFRAGE LADEN"
              onChange={handleFileUpload}
            />
            <Button
              id="save-query"
              type="secondary"
              label="ABFRAGE SPEICHERN"
              isActive={true}
            />
          </ButtonContainer>
          <div className="flex-1 flex-col min-h-[90px] p-5 border border-black border-dashed">
            {characteristics.map((cGroup, group_index) =>
              cGroup.map((cItem, item_index) => (
                <div
                  key={group_index + "-" + item_index}
                  className="flex relative"
                >
                  <div
                    className={"flex w-full justify-between border"}
                    style={{ borderColor: cItem.color }}
                  >
                    {/* left */}
                    <div
                      className="flex w-[clamp(40px,12%,70px)] px-0 py-2.5"
                      style={{ backgroundColor: cItem.color }}
                    />
                    {/* middle */}
                    <div className="flex-1 flex-col p-2 pl-[clamp(10px,5%,25px)]">
                      {/* criterion name */}
                      <div className="mb-2 font-bold">
                        {cItem.termCodes[0].display}
                      </div>
                      {(cItem.valueFilter || cItem.timeRestriction) && (
                        <div className="pl-1.5 mb-1.5 bg-[#adbcd7]">
                          {/* Concept Type */}
                          {cItem.valueFilter?.type === "concept" &&
                            setConceptType(cItem)}
                          {/* Quantity Type */}
                          {(cItem.valueFilter?.type === "quantity-comparator" ||
                            cItem.valueFilter?.type === "quantity-range") &&
                            setQuantityType(cItem)}
                          {/* TimeRange Type */}
                          {cItem.timeRestriction && setTimeRangeType(cItem)}
                        </div>
                      )}
                    </div>
                    {/* right */}
                    <div
                      className="flex justify-center w-[clamp(10px,7%,50px)] px-0 py-2.5"
                      style={{ backgroundColor: cItem.color }}
                    >
                      <IconButton
                        id={"deleteBtn-" + group_index + "-" + item_index}
                        iconPath="./delete.svg"
                        onClick={() =>
                          deleteCharacteristics(
                            group_index,
                            item_index,
                            cItem.id
                          )
                        }
                      ></IconButton>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </section>
  );
}
