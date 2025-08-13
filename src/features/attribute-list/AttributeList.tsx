/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import InputTextField from "../../components/ui/InputTextField";
import arrowCollapse from "../../assets/arrow-collapse.png";
import AttributeListPanel from "./layout/AttributeListPanel";
import { type Attribute } from "./type";
import { useState } from "react";

function AttributeList() {
  const [expandedIndexes, setExpandedIndex] = useState<Set<number>>(new Set());
  const [checkboxItems, setCheckboxItem] = useState<Map<string, Attribute>>(
    new Map()
  );

  const filteredAttribute = [
    {
      kdsModule: "Person",
      attributeName: "Vorname",
      attributeDescription: "Alle Vornamen einer Person",
    },
    {
      kdsModule: "Person",
      attributeName: "Nachname",
      attributeDescription: "Alle Nachnamen einer Person",
    },
    {
      kdsModule: "Labor",
      attributeName: "LOINC Code",
      attributeDescription:
        "LOINC (Logical Observation Identifiers Names and Codes) ist ein internationales System zur eindeutigen Identifizierung und Kodierung",
    },
    {
      kdsModule: "Diagnose",
      attributeName: "Diagnosestellender Arzt",
      attributeDescription: "Referenz auf diagnosestellenden Arzt",
    },
    {
      kdsModule: "Fall",
      attributeName: "Fallart",
      attributeDescription:
        "Art der Aufnahme (z. B. ambulant, stationären, vorstationär, ...)",
    },
  ];

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
      console.log(currentItems.has(key));
      if (currentItems.has(key)) {
        currentItems.delete(key);
      } else currentItems.set(key, attribute);
      console.log(currentItems);
      return currentItems;
    });
  };

  return (
    <>
      <AttributeListPanel
        header="Attributliste"
        extra={<InputTextField id="attributeList" />}
      >
        {moduleName.map((module, module_index) => (
          <div key={module_index}>
            <a
              onClick={() => toggleExpansion(module_index)}
              className="flex items-center w-fit cursor-pointer mb-2.5"
            >
              {expandedIndexes.has(module_index)}
              <img
                src={arrowCollapse}
                className={`transition-all duration-500 ${expandedIndexes.has(module_index) ? "rotate-90" : "rotate-0"}`}
              />
              {module}
            </a>
            <div
              className={`${expandedIndexes.has(module_index) ? "block" : "hidden"}`}
            >
              {filteredAttribute.map((attribute, attribute_index) =>
                attribute.kdsModule === module ? (
                  <div key={attribute_index} className="flex gap-2.5 pl-5 pb-2">
                    <input
                      type="checkbox"
                      onChange={() => toggleCheckbox(attribute)}
                    />
                    <p>{attribute.attributeName}</p>
                  </div>
                ) : null
              )}
            </div>
          </div>
        ))}
      </AttributeListPanel>
      <AttributeListPanel header="ausgewählte Attributliste">
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
      </AttributeListPanel>
    </>
  );
}

export default AttributeList;
