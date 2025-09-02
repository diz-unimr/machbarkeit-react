/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { type Criterion } from "../../features/ontology/type";
import { ArrowButton } from "../../components/ui/buttons/ArrowButton";

type TreeItemProps = {
  criterion: Criterion;
  isExpanded: boolean;
  isChecked?: boolean;
  onClick?: () => void;
  onChange?: () => void;
};

export function TreeItem({
  criterion,
  isExpanded,
  isChecked = false,
  onClick,
  onChange,
}: TreeItemProps) {
  return (
    <>
      {criterion.children && criterion.children.length > 0 && (
        <ArrowButton
          id={criterion.id}
          isExpanded={isExpanded}
          onClick={onClick}
        />
      )}
      {criterion.selectable && (
        <input
          type="checkbox"
          className="mt-1.5 cursor-pointer"
          checked={isChecked}
          onChange={onChange}
        />
      )}
      <div key={criterion.id} className="cursor-default" onClick={onClick}>
        {criterion.display}
      </div>
    </>
  );
}
