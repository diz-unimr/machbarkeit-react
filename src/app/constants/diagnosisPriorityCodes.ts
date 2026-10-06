/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Criterion } from "../types/ontologyType";

export const getDiagnosisPriorityCode = (
  diagnosis: Criterion,
  priority: string,
) => {
  switch (priority) {
    case "cc":
      return (
        diagnosis?.attributeDefinitions
          ?.find((attr) => attr.attributeCode.code === "Diagnosispriority")
          ?.selectableConcepts.find((concept) => concept.code === "cc") ??
        undefined
      );
    case "cm":
      return (
        diagnosis?.attributeDefinitions
          ?.find((attr) => attr.attributeCode.code === "Diagnosispriority")
          ?.selectableConcepts.find((concept) => concept.code === "cm") ??
        undefined
      );
    case "cc_or_cm":
      return (
        diagnosis?.attributeDefinitions
          ?.find((attr) => attr.attributeCode.code === "Diagnosispriority")
          ?.selectableConcepts.find((concept) => concept.code === "cc_or_cm") ??
        undefined
      );
  }
};
