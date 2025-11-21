/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState, type ChangeEvent, type DragEvent } from "react";
import { type Criterion } from "@app/types/ontology";
import { ArrowButton } from "@components/ui/buttons/ArrowButton";
import { DRAG_DATA_FORMATS } from "@app/constants/dragTypes";

type TreeItemProps = {
  criterion: Criterion;
  isExpanded: boolean;
  onArrowClick?: () => void;
  onCheckbox: (isChecked: boolean, criterion: Criterion) => void;
  searchTerm?: string;
};

const highlightMatch = (text: string, term?: string) => {
  if (!term) return text;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  return text.split(regex).map((part, index) => {
    const match = part.toLowerCase() === term.toLowerCase();
    if (!part) return null;
    return match ? (
      <mark key={`mark-${index}`} className="bg-yellow-200 px-1 rounded">
        {part}
      </mark>
    ) : (
      <span key={`text-${index}`}>{part}</span>
    );
  });
};

export default function TreeItem({
  criterion,
  isExpanded,
  onArrowClick,
  onCheckbox,
  searchTerm,
}: TreeItemProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const draggable = !!criterion.selectable;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onCheckbox(e.target.checked, criterion);
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
    if (!draggable) return;
    event.dataTransfer.setData(
      DRAG_DATA_FORMATS.CRITERION,
      JSON.stringify(criterion)
    );
    console.log("event.dataTransfer: ", event.dataTransfer.types);
    event.dataTransfer.effectAllowed = "copy";
  };

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
  };

  return (
    <div
      key={criterion.id}
      className={`flex gap-2 items-start bg-white border border-[var(--color-border)] rounded px-3 py-2 shadow-sm w-full ${criterion.selectable ? "cursor-grab" : "cursor-auto"}`}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <ArrowButton
        id={criterion.id}
        isExpanded={isExpanded}
        onClick={onArrowClick}
        hasChildren={
          (criterion.children && criterion.children.length > 0) || false
        }
      />
      {/* {criterion.selectable && (
        <input
          type="checkbox"
          className="mt-1.5 cursor-pointer"
          checked={isChecked}
          onChange={handleChange}
        />
      )} */}
      <div className={`flex gap-2`} onClick={onArrowClick}>
        {criterion.selectable ? (
          <>
            <p className="whitespace-nowrap">
              {highlightMatch(criterion.termCodes[0].code, searchTerm)}
            </p>{" "}
            {/* <p>|</p> */}
          </>
        ) : undefined}{" "}
        <p>{highlightMatch(criterion.display, searchTerm)}</p>
      </div>
    </div>
  );
}
