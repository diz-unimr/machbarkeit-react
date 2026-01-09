/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { TimeRangeType } from "@features/filters/controls/type";

export default function formatTimeRangeLabel(
  filterValue: TimeRangeType["timeRestriction"] | null
): React.ReactNode {
  if (!filterValue) return "Kein Filter";
  const after = filterValue.afterDate ? new Date(filterValue.afterDate) : null;
  const before = filterValue.beforeDate
    ? new Date(filterValue.beforeDate)
    : null;
  // set date string
  const afterDate = after?.toLocaleDateString("de-DE");
  const beforeDate = before?.toLocaleDateString("de-DE");

  if (after && before) {
    if (after.getTime() === before.getTime()) return <p>Am {afterDate}</p>;
    if (after.getTime() < before.getTime())
      return (
        <div className="flex gap-3">
          <p>Von {afterDate} </p>
          <p>bis {beforeDate}</p>
        </div>
      );
  }

  if (after && !before) return <p>Nach {afterDate}</p>;
  if (before && !after) return <p>Vor {beforeDate}</p>;
  return <p>Kein Filter</p>;
}
