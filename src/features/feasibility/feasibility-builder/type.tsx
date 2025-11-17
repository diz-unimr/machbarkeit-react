/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type {
  ConceptType,
  QuantityType,
  TimeRangeType,
} from "@features/filters/controls/type";
import type { Criterion } from "@app/types/ontology";
export type QueryCriterion = {
  id: Criterion["id"];
  termCodes: Criterion["termCodes"];
  context: Criterion["context"];
} & Partial<ConceptType | QuantityType | TimeRangeType>;

export type MachbarkeitQueryData = {
  display?: string;
  version?: string;
  inclusionCriteria?: QueryCriterion[][] | [];
  exclusionCriteria?: QueryCriterion[][] | [];
};
