/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import { type Criterion } from "../../features/ontology/type";
import { ArrowButton } from "../../components/ui/buttons/ArrowButton";

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onCheckbox(e.target.checked, criterion);
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
          type="checkbox"
          className="mt-1.5 cursor-pointer"
          checked={isChecked}
          onChange={handleChange}
        />
      )}
      <div key={criterion.id} className="cursor-default" onClick={onArrowClick}>
        {criterion.display}
      </div>
    </>
  );
}
