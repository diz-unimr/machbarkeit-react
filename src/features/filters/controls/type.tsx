/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion } from "@app/types/ontologyType";
export type ConceptType = {
  valueFilter: {
    selectedConcepts: NonNullable<Criterion["filterOptions"]> | [];
    type: string;
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
    type: string;
  };
};

export type TimeRangeType = {
  timeRestriction: {
    beforeDate?: string;
    afterDate?: string;
  };
};

export type CaseType = "no filter" | "IMP" | "AMB";
