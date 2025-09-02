/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

export type Module = {
  id: string;
  name: string;
  fdpgCdsCode: string;
  fdpgCdsSystem: string;
  version: string;
  color: string;
};

export type Criterion = {
  children?: Criterion[];
  id: string;
  module_id: string;
  parent_id: string | null;
  display: string;
  term_codes: {
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
  time_restriction_allowed?: boolean | null;
  filter_name?: string;
  filter_type: string | null;
  filter_options:
    | {
        code: string;
        display: string;
        system?: string;
        version?: string | null;
      }[]
    | null;
  // valueFilter?: ConceptType['valueFilter'] | QuantityType['valueFilter'];
  // timeRestriction?: TimeRangeType['timeRestriction'];
  filter_complete_status?: boolean;
  color?: string;
  version: string | null;
};
