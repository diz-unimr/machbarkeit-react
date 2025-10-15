/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import { type Criterion } from "./type";

import TreeItem from "./TreeItem";

type TreeNodeProps = {
  criterion: Criterion;
  parent?: Criterion;
  onToggle?: (criterion: Criterion, isParent?: boolean) => void;
};

export default function TreeNode({ criterion }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((isExpanded) => !isExpanded);
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
              onArrowClick={toggleExpansion}
            />
          </div>
          {isExpanded && (
            <ul className="ml-5">
              {criterion.children?.map((child) => (
                <TreeNode key={child.id} criterion={child} parent={criterion} />
              ))}
            </ul>
          )}
        </li>
      )}
    </>
  );
}
