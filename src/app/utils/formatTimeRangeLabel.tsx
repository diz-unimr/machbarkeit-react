/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { TimeRangeType } from "@features/filters/controls/type";

const formatTimeRangeLabel = (
  filterValue: TimeRangeType["timeRestriction"] | null,
) => {
  if (!filterValue) return null;

  const after = filterValue.afterDate ? new Date(filterValue.afterDate) : null;
  const before = filterValue.beforeDate
    ? new Date(filterValue.beforeDate)
    : null;
  // set date string
  const afterDate = after?.toLocaleDateString("de-DE");
  const beforeDate = before?.toLocaleDateString("de-DE");

  if (after && before) {
    if (after.getTime() === before.getTime()) return "Am " + afterDate;
    if (after.getTime() < before.getTime())
      return "Von " + afterDate + " bis " + beforeDate;
  }

  if (after && !before) return "Nach " + afterDate;
  if (before && !after) return "Vor " + beforeDate;

  return null;
};

export default formatTimeRangeLabel;
