/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState, type DragEvent } from "react";
import ButtonContainer from "@components/ui/buttons/ฺButtonContainer";
import { Button } from "@components/ui/buttons/Button";
import Card from "@components/layout/Card";
import type { MachbarkeitQueryData } from "@features/feasibility/feasibility-builder/type";
import { AxiosError } from "axios";
import type { Criterion } from "@app/types/ontology";
import type { Attribute } from "@features/data-selection/attribute-list/type";
import { DRAG_DATA_FORMATS } from "@app/constants/dragTypes";

type DroppedCriterion = {
  uid: string;
  criterion: Criterion;
};

type DroppedAttribute = {
  uid: string;
  attribute: Attribute;
};

type DropZone = "inclusion" | "exclusion" | "attribute";

function FeasibilityContainer() {
  const [inclusionCriteria, setInclusionCriteria] = useState<
    DroppedCriterion[]
  >([]);
  const [exclusionCriteria, setExclusionCriteria] = useState<
    DroppedCriterion[]
  >([]);
  const [attributeList, setAttributeList] = useState<DroppedAttribute[]>([]);
  const [activeZone, setActiveZone] = useState<DropZone | null>(null);

  const generateId = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `drop-${Date.now()}-${Math.random()}`;

  const handleDragOver =
    (zone: DropZone) => (event: DragEvent<HTMLDivElement>) => {
      const expectedType =
        zone === "attribute"
          ? DRAG_DATA_FORMATS.ATTRIBUTE
          : DRAG_DATA_FORMATS.CRITERION;
      if (event.dataTransfer.types.includes(expectedType)) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        setActiveZone(zone);
      } else {
        event.dataTransfer.dropEffect = "none";
      }
    };

  const handleDragLeave =
    (zone: DropZone) => (event: DragEvent<HTMLDivElement>) => {
      const related = event.relatedTarget as Node | null;
      if (!related || !event.currentTarget.contains(related)) {
        setActiveZone((current) => (current === zone ? null : current));
      }
    };

  const handleCriteriaDrop =
    (zone: Exclude<DropZone, "attribute">) =>
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setActiveZone(null);
      const data = event.dataTransfer.getData(DRAG_DATA_FORMATS.CRITERION);
      event.dataTransfer.clearData(DRAG_DATA_FORMATS.CRITERION);
      if (!data) return;
      const criterion = JSON.parse(data) as Criterion;
      const newEntry: DroppedCriterion = { uid: generateId(), criterion };
      if (zone === "inclusion") {
        setInclusionCriteria((prev) => [...prev, newEntry]);
      } else {
        setExclusionCriteria((prev) => [...prev, newEntry]);
      }
    };

  const handleAttributeDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setActiveZone(null);
    const data = event.dataTransfer.getData(DRAG_DATA_FORMATS.ATTRIBUTE);
    event.dataTransfer.clearData(DRAG_DATA_FORMATS.ATTRIBUTE);
    if (!data) return;
    const attribute = JSON.parse(data) as Attribute;
    const newEntry: DroppedAttribute = { uid: generateId(), attribute };
    setAttributeList((prev) => [...prev, newEntry]);
  };

  const removeCriterion = (
    zone: Exclude<DropZone, "attribute">,
    uid: string
  ) => {
    if (zone === "inclusion") {
      setInclusionCriteria((prev) => prev.filter((item) => item.uid !== uid));
    } else {
      setExclusionCriteria((prev) => prev.filter((item) => item.uid !== uid));
    }
  };

  const removeAttribute = (uid: string) => {
    setAttributeList((prev) => prev.filter((item) => item.uid !== uid));
  };

  const dropZoneClasses = (zone: DropZone) =>
    `flex flex-col gap-3 min-h-[160px] border-2 border-dashed rounded-md px-4 py-5 transition-colors ${
      activeZone === zone
        ? "border-blue-500 bg-blue-50"
        : "border-[var(--color-border)] bg-white"
    }`;

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
              label="ZURAoCKSETZEN"
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
            <Card bodyClassName="bg-gray-50">
              <div
                className={`${dropZoneClasses("inclusion")} ${inclusionCriteria.length === 0 ? "justify-center" : undefined}`}
                onDragOver={handleDragOver("inclusion")}
                onDragLeave={handleDragLeave("inclusion")}
                onDrop={handleCriteriaDrop("inclusion")}
              >
                {inclusionCriteria.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center">
                    Merkmale hierher ziehen, um sie als Einschlusskriterien zu
                    übernehmen.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {inclusionCriteria.map((item) => (
                      <li
                        key={item.uid}
                        className="flex justify-between items-center rounded border border-gray-200 bg-white px-3 py-2 text-sm"
                      >
                        <div className="flex gap-3 items-center">
                          <p className="font-medium text-gray-800">
                            {item.criterion.termCodes?.[0]?.code}
                          </p>
                          <p className="text-sx text-gray-500">
                            {item.criterion.display}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="text-xs text-red-500 hover:underline"
                          onClick={() => removeCriterion("inclusion", item.uid)}
                        >
                          Entfernen
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          </div>
          <div className="flex flex-col p-4 pt-2">
            <p className="text-lg font-medium p-2">Ausschlusskriterien</p>
            <Card bodyClassName="bg-gray-50">
              <div
                className={`${dropZoneClasses("exclusion")} ${exclusionCriteria.length === 0 ? "justify-center" : undefined}`}
                onDragOver={handleDragOver("exclusion")}
                onDragLeave={handleDragLeave("exclusion")}
                onDrop={handleCriteriaDrop("exclusion")}
              >
                {exclusionCriteria.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center">
                    Merkmale hierher ziehen, um sie als Ausschlusskriterien zu
                    übernehmen.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {exclusionCriteria.map((item) => (
                      <li
                        key={item.uid}
                        className="flex justify-between items-center rounded border border-gray-200 bg-white px-3 py-2 text-sm"
                      >
                        <div className="flex gap-3 items-center">
                          <p className="font-medium text-gray-800">
                            {item.criterion.termCodes?.[0]?.code}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.criterion.display}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="text-xs text-red-500 hover:underline"
                          onClick={() => removeCriterion("exclusion", item.uid)}
                        >
                          Entfernen
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          </div>
          <div className="flex flex-col p-4 pt-2">
            <p className="text-lg font-medium p-2">Attributeliste</p>
            <Card bodyClassName="bg-gray-50">
              <div
                className={`${dropZoneClasses("attribute")} ${attributeList.length === 0 ? "justify-center" : undefined}`}
                onDragOver={handleDragOver("attribute")}
                onDragLeave={handleDragLeave("attribute")}
                onDrop={handleAttributeDrop}
              >
                {attributeList.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Attribute hierhin ziehen, um sie als Attributliste zu
                    übernehmen.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {attributeList.map((item) => (
                      <li
                        key={item.uid}
                        className="flex justify-between items-start rounded border border-gray-200 bg-white px-3 py-2 text-sm"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.attribute.attributeName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.attribute.kdsModule}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="text-xs text-red-500 hover:underline"
                          onClick={() => removeAttribute(item.uid)}
                        >
                          Entfernen
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default FeasibilityContainer;
