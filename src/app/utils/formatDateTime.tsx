/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { TimeRangeType } from "@features/filters/controls/type";

export const formatTimeRangeLabel = (
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

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  return {
    date: new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date),

    time: new Intl.DateTimeFormat("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date),
  };
};
