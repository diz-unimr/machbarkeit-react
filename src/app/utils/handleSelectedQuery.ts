/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type {
  FeasibilityQueryData,
  SelectedCriteria,
} from "@/features/feasibility/feasibility-builder/types";
import convertToCriteriaDisplay from "./convertJsonToCriteriaDisplay";
import useFilterStore from "../store/filter-store";

const handleSelectedQuery = async (
  queryFile: FeasibilityQueryData,
  setSelectedCriteria: (criteria: SelectedCriteria) => void,
) => {
  const updateGlobalFilter = useFilterStore.getState().updateGlobalFilter;

  // if (!queryFile) return;

  try {
    const inclusionCriteria = await convertToCriteriaDisplay(queryFile);

    if (inclusionCriteria) {
      // check if any global filter
      inclusionCriteria.criteria.some((c) => {
        if (
          c.criterion.timeRestrictionAllowed &&
          c.criterion.timeRestriction &&
          !c.criterion.isLocalFilter
        ) {
          updateGlobalFilter("timeRestriction", c.criterion.timeRestriction);
          return true;
        }
        return false;
      });
      // set selected criteria in store
      setSelectedCriteria(inclusionCriteria);
    }
  } catch (error) {
    alert((error as Error).message);
  }
};

export default handleSelectedQuery;
