/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState, type DragEvent } from "react";
import { DRAG_DATA_FORMATS } from "@/app/constants/dragTypes";
import Card from "@/components/ui/Card";
import type { Metadata } from "@/app/types/MetadataType";
import type {
  /* DropZone, */ SelectedAttribute,
} from "./feasibility-builder/type";
import generateId from "@/app/utils/generateUID";
import useCriteriaDnD from "./feasibility-builder/hooks/useCriteriaDnD";
import useMetadataStore from "@/app/store/metadata-store";
import ArrowButton from "@/components/ui/buttons/ArrowButton";
import accordionArrow from "@/assets/accordion-arrow.svg";

type DroppedAttribute = {
  uid: string;
  attribute: Metadata;
};

type AttributePanelProps = {
  isPanelExpanded: boolean;
  onToggleAttributePanel: () => void;
};

const AttributePanel = ({
  isPanelExpanded,
  onToggleAttributePanel,
}: AttributePanelProps) => {
  const selectedMetadata = useMetadataStore((state) => state.selectedMetadata);
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
    const attribute = JSON.parse(data) as Metadata;
    const newEntry: DroppedAttribute = { uid: generateId(), attribute };
    setAttributeList((prev) => [...prev, newEntry]);
  };

  const removeAttribute = (uid: string) => {
    setAttributeList((prev) => prev.filter((item) => item.uid !== uid));
  };
  return (
    <div className="flex flex-col p-4 pt-2">
      <div className="flex justify-between p-2">
        <p className="text-lg font-medium">Ausgewählte Attribute</p>
        <ArrowButton
          id="characteristic-btn"
          image={accordionArrow}
          mode="rotate-left"
          isExpanded={isPanelExpanded}
          onClick={onToggleAttributePanel}
        />
      </div>
      <div className={`min-h-0 ${isPanelExpanded ? "flex-1" : "hidden"}`}>
        <Card bodyClassName="bg-gray-50">
          <div
            className={`${dropZoneClasses("attribute")} ${attributeList.length === 0 ? "justify-center" : undefined}`}
            onDragOver={handleDragOver("attribute")}
            onDragLeave={handleDragLeave("attribute")}
            onDrop={handleAttributeDrop}
          >
            {selectedMetadata.length === 0 ? (
              <p className="text-sm text-gray-500">
                Attribute hierhin ziehen, um sie als Attributliste zu
                übernehmen.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {selectedMetadata.map((item) => (
                  <li
                    key={`${item.kdsModule}-${item.attributeName}`}
                    className="flex justify-between items-start rounded border border-gray-200 bg-white px-3 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.attributeName}
                      </p>
                      <p className="text-xs text-gray-500">{item.kdsModule}</p>
                    </div>
                    <button
                      type="button"
                      className="text-xs text-red-500 hover:underline"
                      onClick={() =>
                        removeAttribute(
                          `${item.kdsModule}-${item.attributeName}`,
                        )
                      }
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
    </div>
  );
};

export default AttributePanel;
