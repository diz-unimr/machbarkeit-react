/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import Papa from "papaparse";
import InputTextField from "@components/ui/inputs/InputTextField";
import { type Attribute } from "@features/data-selection/attribute-list/type";
import { useEffect, useState, type DragEvent } from "react";
import TreePanel from "@features/data-selection/feature-container/ontology/TreePanel";
import { ArrowButton } from "@components/ui/buttons/ArrowButton";
import { DRAG_DATA_FORMATS } from "@app/constants/dragTypes";

function AttributeList() {
  const [metadata, setMetadata] = useState<Attribute[]>([]);
  const [expandedIndexes, setExpandedIndex] = useState<Set<number>>(new Set());
  const [mouseOverIndex, setMouseOverIndex] = useState<number | null>(null);
  const [checkboxItems, setCheckboxItem] = useState<Map<string, Attribute>>(
    new Map()
  );

  const moduleName = ["Diagnose", "Fall", "Labor", "Person"];

  const keyOf = (a: Attribute) => a.kdsModule + "-" + a.attributeName;

  const [textInput, setTextInput] = useState<string>("");

  const toggleExpansion = (index: number) => {
    setExpandedIndex((prev) => {
      const next = new Set(prev); // clone set() for reactive
      if (next.has(index)) {
        next.delete(index);
      } else next.add(index);
      return next;
    });
  };

  const handleTextChange = (text: string) => {
    setTextInput(text);
  };

  const toggleCheckbox = (attribute: Attribute) => {
    const key = keyOf(attribute);
    setCheckboxItem((items) => {
      const currentItems = new Map(items);
      if (currentItems.has(key)) {
        currentItems.delete(key);
      } else currentItems.set(key, attribute);
      return currentItems;
    });
  };

  const getTooltipPosition = (index: number) => {
    setMouseOverIndex(index);
  };

  const handleAttributeDragStart = (
    event: DragEvent<HTMLDivElement>,
    attribute: Attribute
  ) => {
    event.dataTransfer.setData(
      DRAG_DATA_FORMATS.ATTRIBUTE,
      JSON.stringify(attribute)
    );
    event.dataTransfer.effectAllowed = "copy";
  };

  const handleAttributeDragEnd = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
  };

  useEffect(() => {
    Papa.parse<Attribute>("/diz_metadaten.csv", {
      download: true,
      header: true,
      complete: ({ data }) => {
        const parsedData =
          data?.filter(
            (attribute) =>
              attribute.kdsModule && attribute.attributeName?.trim().length
          ) ?? [];
        setMetadata(parsedData);
      },
    });
  }, []);

  return (
    <section
      id="attribute-list"
      className="flex flex-col h-full w-full gap-7 p-[14px]"
    >
      <InputTextField
        id="search-attribute"
        label="Attribut suchen"
        value={textInput}
        onChange={handleTextChange}
      />

      <TreePanel>
        {moduleName.map((module, index) => (
          <div key={index}>
            <a
              onClick={() => toggleExpansion(index)}
              className="flex items-center gap-2 w-fit cursor-pointer mb-2.5"
            >
              <ArrowButton
                id={String(index)}
                isExpanded={expandedIndexes.has(index)}
              />
              {module}
            </a>
            <div className={expandedIndexes.has(index) ? "block" : "hidden"}>
              {metadata
                .filter((attribute) => attribute.kdsModule === module)
                .map((attribute, attribute_index) => (
                  <div
                    key={`${module}-${attribute_index}`}
                    className="flex gap-2.5 pl-5 pb-2 items-start cursor-grab"
                    draggable
                    onDragStart={(event) =>
                      handleAttributeDragStart(event, attribute)
                    }
                    onDragEnd={handleAttributeDragEnd}
                  >
                    <input
                      id={"id-" + attribute_index}
                      type="checkbox"
                      onChange={() => toggleCheckbox(attribute)}
                    />
                    <div className="flex flex-col">
                      <p
                        onMouseOver={() => getTooltipPosition(attribute_index)}
                        onMouseOut={() => setMouseOverIndex(null)}
                      >
                        {attribute.attributeName}
                      </p>
                      <span
                        className={
                          "w-[350px] absolute z-1000 left-[105%] bg-white rounded-[5px] p-[10px] shadow-[0_2px_4px_-1px_#0003,0_4px_5px_#00000024,0_1px_10px_#0000001f] " +
                          (mouseOverIndex === attribute_index
                            ? "flex visible"
                            : "hidden")
                        }
                      >
                        {attribute.attributeDescription}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </TreePanel>
      {/* </div> */}

      {/* <Card header="ausgewählte Attributliste" className="min-h-[48%]">
        {moduleName
          .filter((module) =>
            [...checkboxItems.values()].some(
              (item) => item.kdsModule === module
            )
          )
          .map((module, module_index) => (
            <div key={module_index} className="flex flex-col">
              <div className="inline-block font-bold mb-2.5">{module}</div>
              {[...checkboxItems.values()]
                .filter((items) => items.kdsModule === module)
                .map((item, item_index) => (
                  <div key={item_index} className="flex gap-2.5 pl-5 pb-2">
                    {item.attributeName}
                  </div>
                ))}
            </div>
          ))}
      </Card> */}
    </section>
  );
}

export default AttributeList;
