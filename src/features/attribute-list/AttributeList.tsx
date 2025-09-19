/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import InputTextField from "../../components/ui/InputTextField";
import arrowCollapse from "../../assets/arrow-collapse.png";
import Card from "../../components/ui/Card";
import { ATTRIBUTES } from "../../data";
import { type Attribute } from "./type";
import { useState } from "react";
import TreePanel from "../ontology/TreePanel";

function AttributeList() {
  const [expandedIndexes, setExpandedIndex] = useState<Set<number>>(new Set());
  const [mouseOverIndex, setMouseOverIndex] = useState<number | null>(null);
  const [checkboxItems, setCheckboxItem] = useState<Map<string, Attribute>>(
    new Map()
  );

  const moduleName = ["Diagnose", "Fall", "Labor", "Person"];

  const keyOf = (a: Attribute) => a.kdsModule + "-" + a.attributeName;

  const toggleExpansion = (index: number) => {
    setExpandedIndex((prev) => {
      const next = new Set(prev); // clone set() for reactive
      if (next.has(index)) {
        next.delete(index);
      } else next.add(index);
      return next;
    });
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

  return (
    <section
      id="attribute-list"
      className="flex flex-col gap-7 h-full w-[40%] max-w-[460px] p-[20px]"
    >
      <Card
        header="Attributliste"
        className="min-h-[48%]"
        extra={<InputTextField id="search-attribute" label="Attribut suchen" />}
      >
        <TreePanel>
          {moduleName.map((module, module_index) => (
            <div key={module_index}>
              <a
                onClick={() => toggleExpansion(module_index)}
                className="flex items-center gap-2 w-fit cursor-pointer mb-2.5"
              >
                <img
                  src={arrowCollapse}
                  className={
                    "transition-all duration-300 " +
                    (expandedIndexes.has(module_index)
                      ? "rotate-90"
                      : "rotate-0")
                  }
                />
                {module}
              </a>
              <div
                className={
                  expandedIndexes.has(module_index) ? "block" : "hidden"
                }
              >
                {ATTRIBUTES.map(
                  (attribute: Attribute, attribute_index: number) =>
                    attribute.kdsModule === module ? (
                      <div
                        key={attribute_index}
                        className="flex gap-2.5 pl-5 pb-2"
                      >
                        <input
                          id={"id-" + attribute_index}
                          type="checkbox"
                          onChange={() => toggleCheckbox(attribute)}
                        />
                        <p
                          onMouseOver={() =>
                            getTooltipPosition(attribute_index)
                          }
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
                    ) : null
                )}
              </div>
            </div>
          ))}
        </TreePanel>
        {/* </div> */}
      </Card>
      <Card header="ausgewählte Attributliste" className="min-h-[48%]">
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
      </Card>
    </section>
  );
}

export default AttributeList;
