/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import { type Criterion } from "../../features/ontology/type";

import { TreeItem } from "../../features/ontology/TreeItem";

export function TreeNode({ criterion }: { criterion: Criterion }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleCheckbox = (criterion: Criterion) => {
    console.log(criterion.display);
    setIsChecked(!isChecked);
  };

  return (
    <li className="list-none pl-3.5 pr-2">
      <div className="flex gap-[clamp(10px,1.5%,15px)] items-start mb-2.5">
        <TreeItem
          criterion={criterion}
          isExpanded={isExpanded}
          isChecked={isChecked}
          onClick={toggleExpansion}
          onChange={() => toggleCheckbox(criterion)}
        />
      </div>
      {isExpanded && (
        <ul className="ml-10">
          {criterion.children?.map((child) => (
            <TreeNode key={child.id} criterion={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
