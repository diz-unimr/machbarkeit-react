/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion } from "../ontology/type";

export type QueryCriterion = {
  id: Criterion["id"];
  termCodes: Criterion["term_codes"];
  context: Criterion["context"];
} & Partial<ConceptType | QuantityType | TimeRangeType>;

export type MachbarkeitQueryData = {
  display?: string;
  version?: string;
  inclusionCriteria?: QueryCriterion[][] | [];
  exclusionCriteria?: QueryCriterion[][] | [];
};
