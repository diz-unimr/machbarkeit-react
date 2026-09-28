/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Coding, Criterion } from "@app/types/ontologyType";
export type ConceptType = {
  valueFilter: {
    selectedConcepts: NonNullable<
      Criterion["valueDefinitions"]
    >[number]["values"];
    type: "concept";
  };
};

export type QuantityType = {
  valueFilter: {
    comparator: string | null;
    /* access only object inside array */
    unit: NonNullable<Criterion["valueDefinitions"]>[number]["values"];
    value: number | null;
    minValue: number | null;
    maxValue: number | null;
    type: "quantity-range" | "quantity-comparator";
  };
};

export type TimeRangeType = {
  timeRestriction: {
    beforeDate?: string;
    afterDate?: string;
  };
};

export type CaseType = "no filter" | "imp" | "amb";

export type DropDownOption = Omit<Coding, "system"> & {
  system?: string;
};
