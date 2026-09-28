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

export type FilterType = "concept" | "quantity" | "reference";

export type Coding = {
  code: string;
  display: string;
  system: string;
  version?: string | null;
};

export type Context = Coding & {
  version: string;
};

export type attributeDefinition = NonNullable<
  Criterion["attributeDefinitions"]
>[number];

export type AttributeFilterRef = {
  type: "reference";
  criteria?: {
    termCodes: Coding[];
    context: Context;
    timeRestriction: TimeRangeType["timeRestriction"];
  }[];
  selectedConcepts?: Coding[];
  attributeCode: Coding[];
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
  attributeDefinitions:
    | {
        type: FilterType;
        optional: boolean;
        allowedUnits: Coding[];
        attributeCode: Coding;
        selectableConcepts: Coding[];
      }[]
    | null;
  valueDefinitions:
    | {
        type: Exclude<FilterType, "reference">;
        values: Coding[];
      }[]
    | null;
  valueFilter?: ConceptType["valueFilter"] | QuantityType["valueFilter"];
  timeRestriction?: TimeRangeType["timeRestriction"];
  color?: ModuleColorProps;
  version: string | null;
  isLocalFilter?: boolean;
};
