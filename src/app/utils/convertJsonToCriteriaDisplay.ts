/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type {
  FeasibilityQueryData,
  SelectedCriteria,
} from "@/features/feasibility/feasibility-builder/type";
import generateUID from "./generateUID";
import { getConcept } from "../services/ontologyService";
import { getModuleColor } from "./moduleUtils";
import useGlobalFilterStore from "../store/global-filter-store";

const convertToCriteriaDisplay = async (uploadedData: FeasibilityQueryData) => {
  if (!uploadedData.inclusionCriteria) return null;

  const inclusionCriteria: SelectedCriteria = {
    criteriaType: "inclusionCriteria",
    criteria: [],
    logics: [],
  };

  const uploadedCriteria = uploadedData.inclusionCriteria;

  const items = await Promise.all(
    uploadedCriteria.flat().map(async (c) => {
      const concept = await getConcept(c.id);
      if (!concept) return;

      if (c.context?.code === "Fall") {
        const updateGlobalFilter =
          useGlobalFilterStore.getState().updateGlobalFilter;
        updateGlobalFilter("caseType", concept);
        return;
      }

      const next = { ...concept };
      next.context = c.context;
      next.color = getModuleColor(next.context?.code || "Default");

      if ("valueFilter" in c) {
        next.valueFilter = c.valueFilter;
      }
      if ("timeRestriction" in c && concept.timeRestrictionAllowed) {
        next.timeRestriction = c.timeRestriction;
      }
      if ("isLocalFilter" in c) {
        next.isLocalFilter = c.isLocalFilter;
      }

      return {
        uid: generateUID(),
        criterion: next,
        isExpanded: !!next.valueFilter || !!next.timeRestriction,
      };
    }),
  );
  // Filter out any undefined items (in case some concepts couldn't be fetched)
  inclusionCriteria.criteria = items.filter((item) => !!item);

  uploadedCriteria.forEach((group, g) => {
    group.forEach((_, i) => {
      const isLast =
        g === uploadedCriteria.length - 1 && i === group.length - 1;

      if (!isLast) {
        inclusionCriteria.logics.push(i < group.length - 1 ? "OR" : "AND");
      }
    });
  });

  return inclusionCriteria;
};

export default convertToCriteriaDisplay;
