/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion } from "../../ontology/type";
export type ConceptType = {
  valueFilter: {
    selectedConcepts: NonNullable<Criterion["filterOptions"]> | [];
    type: "concept";
  };
};

export type QuantityType = {
  valueFilter: {
    comparator: string | null;
    /* access only object inside array */
    unit: NonNullable<Criterion["filterOptions"]>[number];
    value: number | null;
    minValue: number | null;
    maxValue: number | null;
    type: "quantity-comparator" | "quantity-range";
  };
  isFilterComplete?: boolean;
};

export type TimeRangeType = {
  timeRestriction: {
    beforeDate: string | null;
    afterDate: string | null;
  };
  isFilterComplete?: boolean;
};
