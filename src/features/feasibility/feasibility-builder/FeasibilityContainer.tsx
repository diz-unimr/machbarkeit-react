/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import ButtonContainer from "@components/ui/buttons/ฺButtonContainer";
import { Button } from "@components/ui/buttons/Button";
import Card from "@components/layout/Card";
import type { MachbarkeitQueryData } from "@features/feasibility/feasibility-builder/type";
import { AxiosError } from "axios";

function FeasibilityContainer() {
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
        // const text = e.target?.result as string;
        const isJsonDataValid =
          !!(
            uploadedCriteria.inclusionCriteria &&
            uploadedCriteria.inclusionCriteria!.length > 0
          ) ||
          (uploadedCriteria.exclusionCriteria &&
            uploadedCriteria.exclusionCriteria!.length > 0);
        // const data = JSON.parse(text);
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

  const convertToCharacteristicsDisplay = (x) => {};

  return (
    <div className="flex-grow flex-col h-full bg-[#fafafa]">
      <div className="flex h-[60px] bg-white border-b-[1.5px] border-[var(--color-border)]">
        <div className="flex w-full max-w-[960px] justify-between m-auto px-8">
          <div className="flex w-full h-[50px] items-center px-2">
            <p>
              Anzahl der Patienten: <span>-</span>
            </p>
          </div>
          <ButtonContainer className="p-0">
            <Button
              id="reset-query"
              type="secondary"
              label="ZURÜCKSETZEN"
              isActive={true}
            />
            <Button
              id="save-query"
              type="primary"
              label="ABFRAGE STARTEN"
              isActive={true}
            />
          </ButtonContainer>
        </div>
      </div>
      {/* </div> */}
      <div
        id="feasibility-container"
        className="flex flex-col max-w-[960px] px-5 py-8 mx-auto overflow-y-auto"
      >
        <Card bodyClassName="p-0">
          <div className="flex justify-end items-center py-3 border-b-[1.5px] border-[var(--color-border)]">
            <menu className="flex gap-8 pr-5">
              <li className="flex gap-7 m-auto">
                <div className="font-medium text-sm text-gray-500 cursor-pointer">
                  Abfragen Laden
                </div>
                <div className="font-medium text-sm text-gray-500 cursor-pointer">
                  Abfragen Speichen
                </div>
              </li>
            </menu>
          </div>
          <div className="flex flex-col p-4 pt-2">
            <p className="text-lg font-medium p-2">Einschlusskriterien</p>
            <Card>
              <div></div>
            </Card>
          </div>
          <div className="flex flex-col p-4 pt-2">
            <p className="text-lg font-medium p-2">Ausschlusskriterien</p>
            <Card>
              <div></div>
            </Card>
          </div>
          <div className="flex flex-col p-4 pt-2">
            <p className="text-lg font-medium p-2">Attributeliste</p>
            <Card>
              <div></div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default FeasibilityContainer;
