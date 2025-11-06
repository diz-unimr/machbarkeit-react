/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion } from "../../ontology/type";

export function setConceptType(criterion: Criterion) {
  return (
    criterion.valueFilter?.type === "concept" &&
    criterion.valueFilter?.selectedConcepts.map((concept, index) => (
      <span
        key={index}
        className="first:before:content-none before:content-[',_']"
      >
        {concept.display}
      </span>
    ))
  );
}

export function setQuantityType(criterion: Criterion) {
  if (criterion.valueFilter?.type === "quantity-comparator") {
    return (
      <p>
        {criterion.valueFilter.comparator === "lt"
          ? "<"
          : criterion.valueFilter.comparator === "gt"
            ? ">"
            : "="}{" "}
        {criterion.valueFilter.value} {criterion.valueFilter.unit.display}
      </p>
    );
  }

  if (criterion.valueFilter?.type === "quantity-range") {
    return (
      <p>
        Zwischen {criterion.valueFilter.minValue} -{" "}
        {criterion.valueFilter.maxValue} {criterion.valueFilter.unit.display}
      </p>
    );
  }
}

export function setTimeRangeType(criterion: Criterion) {
  const afterDate = criterion.timeRestriction?.afterDate;
  const beforeDate = criterion.timeRestriction?.beforeDate;

  if (afterDate && beforeDate) {
    if (afterDate === beforeDate) {
      return <p>Am {afterDate}</p>;
    } else if (afterDate && beforeDate && afterDate < beforeDate) {
      return (
        <p>
          Zwischen {afterDate} - {beforeDate}
        </p>
      );
    }
  }

  if (beforeDate) return <p>Vor {beforeDate}</p>;
  if (afterDate) return <p>Nach {afterDate}</p>;
}
