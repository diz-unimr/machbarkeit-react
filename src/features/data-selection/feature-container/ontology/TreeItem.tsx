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
};

export default function TreeItem({
  criterion,
  isExpanded,
  onArrowClick,
  onCheckbox,
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
    event.dataTransfer.effectAllowed = "copy";
  };

  const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
  };

  return (
    <div
      key={criterion.id}
      className="flex gap-2 items-start cursor-default"
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
      <div
        className={`flex gap-2 cursor-pointer ${criterion.selectable ? "hover:font-medium" : undefined}`}
        onClick={onArrowClick}
      >
        {criterion.selectable ? (
          <>
            <p className="whitespace-nowrap">{criterion.termCodes[0].code}</p>{" "}
            <p>|</p>
          </>
        ) : undefined}{" "}
        <p>{criterion.display}</p>
      </div>
    </div>
  );
}
