/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState, type ChangeEvent, type DragEvent } from "react";
import Highlighter from "react-highlight-words";
import { type Criterion } from "@app/types/ontologyType";
import { ArrowButton } from "@components/ui/buttons/ArrowButton";
import { DRAG_DATA_FORMATS } from "@app/constants/dragTypes";
import arrowImg from "@assets/tree-arrow.png";
import dragHandleIcon from "@assets/drag-handle-icon.svg";

type TreeItemProps = {
  criterion: Criterion;
  isExpanded: boolean;
  onArrowClick?: () => void;
  onCheckbox: (isChecked: boolean, criterion: Criterion) => void;
  searchTerm?: string;
};

export default function TreeItem({
  criterion,
  isExpanded,
  onArrowClick,
  onCheckbox,
  searchTerm,
}: TreeItemProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const draggable = !!criterion.selectable;
  const searchWords = searchTerm?.trim() ? [searchTerm.trim()] : [];

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
    event.dataTransfer.dropEffect = "copy";
    event.dataTransfer.effectAllowed = "copy";
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
    setIsDragging(false);
  };

  return (
    <div
      key={criterion.id}
      className={`flex gap-2 items-start bg-white border border-[var(--color-border)] rounded p-2 shadow-sm w-full ${criterion.selectable ? "cursor-grab active:cursor-grabbing" : "cursor-auto"}`} /* (isDragging ? "cursor-grabbing" : "cursor-grab") */
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={onArrowClick}
    >
      <ArrowButton
        id={criterion.id}
        image={arrowImg}
        isExpanded={isExpanded}
        /* onClick={onArrowClick} */
        hasChildren={
          (criterion.children && criterion.children.length > 0) || false
        }
      />
      {criterion.selectable ? (
        <img src={dragHandleIcon} width={12} height={14} className="mt-1.5" />
      ) : null}
      {/* {criterion.selectable && (
        <input
          type="checkbox"
          className="mt-1.5 cursor-pointer"
          checked={isChecked}
          onChange={handleChange}
        />
      )} */}
      <div className={`flex gap-2`} /* onClick={onArrowClick} */>
        {criterion.selectable ? (
          <>
            <Highlighter
              className="whitespace-nowrap"
              searchWords={searchWords}
              textToHighlight={criterion.termCodes[0].code}
              highlightClassName="bg-yellow-200 rounded"
            />
            <span>|</span>
          </>
        ) : undefined}
        <Highlighter
          className="" /* lg:line-clamp-1 */
          searchWords={searchWords}
          textToHighlight={criterion.display}
          highlightClassName="bg-yellow-200 rounded"
        />
      </div>
    </div>
  );
}
