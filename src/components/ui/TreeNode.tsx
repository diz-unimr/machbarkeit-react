/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import { type Criterion } from "../../features/ontology/type";

import { TreeItem } from "../../features/ontology/TreeItem";

export default function TreeNode({
  criterion,
  onCheck,
}: {
  criterion: Criterion;
  onCheck?: (isChecked: boolean, criterion: Criterion) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  const toggleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    criterion: Criterion
  ) => {
    const checked = e.target.checked;
    setIsChecked(e.target.checked);
    onCheck?.(checked, criterion);
  };

  return (
    <>
      {((criterion.children && criterion.children.length > 0) ||
        criterion.selectable) && (
        <li className="list-none pl-3.5 pr-2">
          <div className="flex gap-[clamp(10px,1.5%,15px)] items-start mb-2.5">
            <TreeItem
              criterion={criterion}
              isExpanded={isExpanded}
              isChecked={isChecked}
              onClick={toggleExpansion}
              onChange={(e) => toggleCheckbox(e, criterion)}
            />
          </div>
          {isExpanded && (
            <ul className="ml-5">
              {criterion.children?.map((child) => (
                <TreeNode key={child.id} criterion={child} onCheck={onCheck} />
              ))}
            </ul>
          )}
        </li>
      )}
    </>
  );
}
