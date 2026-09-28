/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { DropDownOption } from "./controls/type";

export const QUANTITY_COMPARATOR_OPTIONS: DropDownOption[] = [
  { code: "no filter", display: "Bitte wählen..." },
  { code: "eq", display: "gleich" },
  { code: "lt", display: "kleiner" },
  { code: "gt", display: "größer" },
  { code: "between", display: "zwischen" },
];

export const TIMERANGE_COMPARATOR_OPTIONS: DropDownOption[] = [
  { code: "no filter", display: "Bitte wählen..." },
    { code: "at", display: "am" },
    { code: "before", display: "vor" },
    { code: "after", display: "nach" },
    { code: "between", display: "zwischen" },
];