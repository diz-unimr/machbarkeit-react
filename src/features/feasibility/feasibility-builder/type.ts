/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type {
  ConceptType,
  QuantityType,
  TimeRangeType,
} from "@features/filters/controls/type";
import type { Attribute } from "@features/data-selection/attribute-list/type";
import type { Criterion } from "@app/types/ontologyType";

export type DropZone = "inclusion" | "exclusion" | "attribute";

export type SelectedAttribute = {
  uid: string;
  attribute: Attribute;
};

export type CriterionNode = {
  uid: string;
  criterion: Criterion;
  isExpanded: boolean;
};

export type SelectedCriteria = {
  criteriaType: string;
  criteria: CriterionNode[];
  logics: string[];
};

type QueryCriterion = {
  id: Criterion["id"];
  termCodes: Criterion["termCodes"];
  context: Criterion["context"];
} & Partial<ConceptType | QuantityType | TimeRangeType>;

export type FeasibilityQueryData = {
  display: string;
  version: string;
  inclusionCriteria?: QueryCriterion[][] | [];
  exclusionCriteria?: QueryCriterion[][] | [];
};
