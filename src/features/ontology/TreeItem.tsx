/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { type Criterion } from "../../features/ontology/type";
import { ArrowButton } from "../../components/ui/buttons/ArrowButton";
import { useCheckedItemsStore } from "../../store/checked-items-store";
import { handleCheckbox } from "../../store/checked-items-store";
import { useRef } from "react";

type TreeItemProps = {
  criterion: Criterion;
  isExpanded: boolean;
  onArrowClick?: () => void;
};

export default function TreeItem({
  criterion,
  isExpanded,
  onArrowClick,
}: TreeItemProps) {
  const checkedItems = useCheckedItemsStore((state) => state.checkedItems);
  const checkRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    const isChecked = checkRef.current?.checked;
    handleCheckbox(criterion, isChecked!);
  };

  return (
    <>
      <ArrowButton
        id={criterion.id}
        isExpanded={isExpanded}
        onClick={onArrowClick}
        hasChildren={
          (criterion.children && criterion.children.length > 0) || false
        }
      />
      {criterion.selectable && (
        <input
          ref={checkRef}
          type="checkbox"
          className="mt-1.5 cursor-pointer"
          checked={checkedItems.has(criterion.id)}
          onChange={handleChange}
        />
      )}
      <div key={criterion.id} className="cursor-default" onClick={onArrowClick}>
        {criterion.display}
      </div>
    </>
  );
}
