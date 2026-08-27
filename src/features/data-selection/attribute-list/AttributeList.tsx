/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import useMetadata from "@/app/hooks/useMetadata";
import { type Metadata } from "@features/data-selection/attribute-list/type";
import { useState } from "react";
import TreePanel from "@features/data-selection/ontology-characteristics/ontologies/TreePanel";
import ArrowButton from "@components/ui/buttons/ArrowButton";
import Card from "@/components/ui/Card";
import infoIcon from "@assets/info-svgrepo-com.svg";

const AttributeList = () => {
  const metadata = useMetadata();
  const [expandedIndexes, setExpandedIndex] = useState<Set<number>>(new Set());
  const [mouseOverIndex, setMouseOverIndex] = useState<string | null>(null);

  const moduleName = ["Person", "Fall", "Diagnose", "Prozedur", "Labor"];

  const toggleExpansion = (index: number) => {
    setExpandedIndex((prev) => {
      const next = new Set(prev); // clone set() for reactive
      if (next.has(index)) {
        next.delete(index);
      } else next.add(index);
      return next;
    });
  };

  const renderAttributeList = (items: Metadata[]) => {
    const defaultItems = items.filter((item) => item.defaultAttribute);
    const nonDefaultItems = items.filter((item) => !item.defaultAttribute);

    const renderItem = (attribute: Metadata, idx: number) => {
      const itemId = `${attribute.kdsModule} - ${attribute.additionalInformation} - ${idx}`;
      return (
        <div
          key={itemId}
          className="flex flex-col pl-5 pb-2"
          onMouseEnter={() => setMouseOverIndex(itemId)}
          onMouseLeave={() => setMouseOverIndex(null)}
        >
          <div className="flex gap-2.5 items-center">
            <input type="checkbox" onChange={() => {}} />
            <p
              className={`cursor-pointer ${attribute.defaultAttribute ? "font-semibold text-gray-900" : "text-gray-600"}`}
            >
              {attribute.attributeName}
            </p>
          </div>

          {mouseOverIndex === itemId && (
            <div className="flex visible ml-6 pl-2 bg-amber-100 items-start mt-1 rounded p-1 text-sm text-gray-700">
              <img src={infoIcon} className="inline w-4 mr-2 pt-0.5" />
              {attribute.attributeDescription}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="flex flex-col">
        {/* Default Concepts */}
        {defaultItems.map((item, idx) => renderItem(item, idx))}

        {/* underline */}
        {defaultItems.length > 0 && nonDefaultItems.length > 0 && (
          <hr className="my-2 border-t border-gray-300 ml-5" />
        )}

        {/* Non-Default Concepts */}
        {nonDefaultItems.map((item, idx) =>
          renderItem(item, idx + defaultItems.length),
        )}
      </div>
    );
  };

  return (
    <Card className="h-full">
      <div
        id="attribute-list"
        className="flex flex-col h-full w-full gap-7 p-1"
      >
        <TreePanel>
          {moduleName.map((module, index) => {
            const moduleAttributes = metadata.filter(
              (attr) => attr.kdsModule === module,
            );
            return (
              <div key={index}>
                <a
                  onClick={() => toggleExpansion(index)}
                  className="flex items-center gap-2 w-fit cursor-pointer mb-2.5"
                >
                  <ArrowButton
                    id={String(index)}
                    width="12"
                    isExpanded={expandedIndexes.has(index)}
                  />
                  {module}
                </a>
                <div
                  className={expandedIndexes.has(index) ? "block" : "hidden"}
                >
                  {module === "Fall"
                    ? (() => {
                        // get all group from Fall
                        const groups = Array.from(
                          new Set(
                            moduleAttributes
                              .map((attr) => attr.additionalInformation)
                              .filter(Boolean),
                          ),
                        );

                        return groups.map((groupName, gIdx) => {
                          const groupAttributes = moduleAttributes.filter(
                            (attr) => attr.additionalInformation === groupName,
                          );

                          return (
                            <div key={gIdx} className="pl-4 mb-3">
                              <h4 className="font-semibold text-gray-700 mb-1">
                                {groupName}
                              </h4>
                              {renderAttributeList(groupAttributes)}
                            </div>
                          );
                        });
                      })()
                    : renderAttributeList(moduleAttributes)}
                </div>
              </div>
            );
          })}
        </TreePanel>
      </div>
    </Card>
  );
};

export default AttributeList;
