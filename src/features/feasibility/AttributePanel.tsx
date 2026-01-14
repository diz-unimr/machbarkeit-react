/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState, type DragEvent } from "react";
import { DRAG_DATA_FORMATS } from "@/app/constants/dragTypes";
import Card from "@components/ui/Card";
import type { Attribute } from "../data-selection/attribute-list/type";
import type {
  /* DropZone, */ SelectedAttribute,
} from "./feasibility-builder/type";
import generateId from "@/app/utils/generateUID";
import useCriteriaDnD from "./feasibility-builder/hooks/useCriteriaDnD";

type DroppedAttribute = {
  uid: string;
  attribute: Attribute;
};

const AttributePanel = () => {
  // const [activeZone, setActiveZone] = useState<DropZone | null>(null);
  const [attributeList, setAttributeList] = useState<SelectedAttribute[]>([]);
  const {
    dropZoneClasses,
    handleDragOver,
    handleDragLeave,
    // handleCriteriaDrop,
  } = useCriteriaDnD();

  const handleAttributeDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // setActiveZone(null);
    const data = event.dataTransfer.getData(DRAG_DATA_FORMATS.ATTRIBUTE);
    event.dataTransfer.clearData(DRAG_DATA_FORMATS.ATTRIBUTE);
    if (!data) return;
    const attribute = JSON.parse(data) as Attribute;
    const newEntry: DroppedAttribute = { uid: generateId(), attribute };
    setAttributeList((prev) => [...prev, newEntry]);
  };

  const removeAttribute = (uid: string) => {
    setAttributeList((prev) => prev.filter((item) => item.uid !== uid));
  };
  return (
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
              Attribute hierhin ziehen, um sie als Attributliste zu übernehmen.
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
  );
};

export default AttributePanel;
