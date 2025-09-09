/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { type Criterion } from "../../features/ontology/type";
import { ArrowButton } from "../../components/ui/buttons/ArrowButton";

type TreeItemProps = {
  criterion: Criterion;
  isExpanded: boolean;
  isChecked?: boolean;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      <ArrowButton
        id={criterion.id}
        isExpanded={isExpanded}
        onClick={onClick}
        hasChildren={
          (criterion.children && criterion.children.length > 0) || false
        }
      />
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
