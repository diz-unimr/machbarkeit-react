/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { CriterionNode } from "@features/feasibility/feasibility-builder/type";

type LocalFilterPanelProps = {
  item: CriterionNode;
};

const LocalFilterPanel = ({ item }: LocalFilterPanelProps) => {
  return (
    <div className="flex flex-col gap-5">
      {item.criterion.filterOptions?.map((filterOption, index) => (
        <div key={index}>{filterOption.display}</div>
      ))}
    </div>
  );
};

export default LocalFilterPanel;
