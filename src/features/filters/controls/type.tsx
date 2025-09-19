import type { Criterion } from "../../ontology/type";
export type ConceptOptionType = {
  code: string;
  system: string;
  display: string;
}[];

export type QuantityType = {
  valueFilter: {
    /* access only object inside array */
    unit: NonNullable<Criterion["filterOptions"]>[number];
    comparator?: string;
    value?: number;
    minValue?: number;
    maxValue?: number;
    type: string;
  };
  isFilterComplete?: boolean;
};
