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

export type Criterion = {
  children?: Criterion[];
  id: string;
  moduleId: string;
  parentId: string | null;
  display: string;
  termCodes: {
    code: string;
    system: string;
    display: string;
    version: string | null;
  }[];
  context?: {
    code: string;
    system: string;
    version: string;
    display: string;
  };
  selectable: boolean;
  leaf: boolean;
  timeRestrictionAllowed?: boolean | null;
  filterName?: string;
  filterType: string | null;
  filterOptions:
    | {
        code: string;
        display: string;
        system?: string;
        version?: string | null;
      }[]
    | null;
  valueFilter?: ConceptType["valueFilter"] | QuantityType["valueFilter"];
  timeRestriction?: TimeRangeType["timeRestriction"];
  color?: ModuleColorProps;
  version: string | null;
};
