/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type {
  ConceptType,
  QuantityType,
  TimeRangeType,
} from "@features/filters/controls/type";
import type { Attribute } from "@features/data-selection/attribute-list/type";
import type { Criterion } from "@app/types/ontologyType";

export type DropZone = "inclusionCriteria" | "exclusionCriteria" | "attribute";

export type SelectedAttribute = {
  uid: string;
  attribute: Attribute;
};

export type CriterionNode = {
  uid: string;
  criterion: Criterion;
  isExpanded: boolean;
};

export type SelectedChoice =
  | "replace all"
  | "replace global"
  | "confirm"
  | "cancel";

export type LogicOperator = "AND" | "OR";

export type SelectedCriteria = {
  criteriaType: string;
  criteria: CriterionNode[];
  logics: LogicOperator[];
};

export type QueryCriterion = {
  id: Criterion["id"];
  termCodes: Criterion["termCodes"];
  context: Criterion["context"];
  valueFilter?: ConceptType["valueFilter"] | QuantityType["valueFilter"];
  timeRestriction?: TimeRangeType["timeRestriction"];
};

export type FeasibilityQueryData = {
  version: string;
  display: string;
  inclusionCriteria?: QueryCriterion[][];
  exclusionCriteria?: QueryCriterion[][];
};
