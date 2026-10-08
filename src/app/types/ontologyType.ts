/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type {
  ConceptType,
  QuantityType,
  TimeRangeType,
} from "@features/filters/controls/type";

export type ModuleColorProps = {
  btnColor: string;
  bgColor: string;
};

export type Module = {
  id: string;
  name: string;
  fdpgCdsCode: string;
  fdpgCdsSystem: string;
  version: string;
  color: ModuleColorProps;
};

export type FilterType =
  | "concept"
  | "reference"
  | "quantity-range"
  | "quantity-comparator";

export type Coding = {
  code: string;
  display: string;
  system: string;
  version?: string | null;
};

export type Context = Coding & {
  version: string;
};

export type AttributeFilterConcept = ConceptType["valueFilter"] & {
  attributeCode: Coding;
};

export type AttributeFilterQuantity = QuantityType["valueFilter"] & {
  attributeCode: Coding;
};

export type AttributeFilterReference = {
  type: "reference";
  attributeCode: Coding;
  criteria: {
    termCodes: Coding[];
    context?: Context;
    timeRestriction?: TimeRangeType["timeRestriction"];
  }[];
};

export type AttributeFilter =
  | AttributeFilterConcept
  | AttributeFilterQuantity
  | AttributeFilterReference;

export type AttributeDefinition = {
  type: FilterType;
  optional: boolean;
  allowedUnits: Coding[];
  attributeCode: Coding;
  selectableConcepts: Coding[];
};
export type ValueDefinition = {
  type: Exclude<FilterType, "reference">;
  values: Coding[];
  optional: boolean;
};

export type Criterion = {
  children?: Criterion[];
  id: string;
  moduleId: string;
  parentId: string | null;
  display: string;
  termCodes: Coding[];
  context?: Context;
  selectable: boolean;
  leaf: boolean;
  timeRestrictionAllowed?: boolean | null;
  filterName?: string;
  attributeDefinitions: AttributeDefinition[] | null;
  valueDefinition: ValueDefinition | null;
  attributeFilters?: AttributeFilter[];
  valueFilter?: ConceptType["valueFilter"] | QuantityType["valueFilter"];
  timeRestriction?: TimeRangeType["timeRestriction"];
  color?: ModuleColorProps;
  version: string | null;
  isLocalFilter?: boolean;
};
