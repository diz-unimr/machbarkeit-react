/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type {
  FeasibilityQueryData,
  SelectedCriteria,
} from "@/features/feasibility/feasibility-builder/type";
import generateUID from "./generateUID";
import { getConcept } from "../services/ontologyService";
import { getModuleColor } from "./moduleUtils";
import { getDiagnosisPriorityCode } from "../constants/diagnosisPriorityCodes";
import type { AttributeFilterConcept, Criterion } from "../types/ontologyType";
import { getSelectedConcepts } from "@/features/filters/diagnosisFilterUtils";

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

      const next: Criterion = { ...concept };

      let context = c.context;
      if (c.context?.code === "Fall" && c.attributeFilters) {
        context = c.attributeFilters.find((attr) => attr.type === "reference")
          ?.criteria[0].context;
      }

      next.context = context;
      next.color = getModuleColor(next.context?.code || "default");

      if ("valueFilter" in c) {
        next.valueFilter = c.valueFilter;
      }
      if ("attributeFilters" in c) {
        const conceptAttr = c.attributeFilters?.find(
          (attr) => attr.type === "concept",
        );
        const referenceAttr = c.attributeFilters?.find(
          (attr) => attr.type === "reference",
        );

        const selectedFilters = [];
        if (conceptAttr) selectedFilters.push(conceptAttr);
        if (referenceAttr) {
          const selectedConcepts = (referenceAttr.attributeCode.code === "cc_or_cm"
              ? ["cc", "cm"]
              : []
            ).flatMap((code) => {
              const result = getDiagnosisPriorityCode(next, code);
              return result ? [result] : [];
            })

          const attributeFilters = {
            type: "concept",
            attributeCode: {
              code: "Diagnosispriority",
              system: "http://hl7.org/fhir/StructureDefinition",
              display: "Diagnosepriorität",
              version: null,
            },
            selectedConcepts: selectedConcepts,
          }

          selectedFilters.push(attributeFilters as AttributeFilterConcept);
        }
        next.attributeFilters = selectedFilters;
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
