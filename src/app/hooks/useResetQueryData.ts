/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useFeasibilityQuery } from "./useFeasibilityQuery";
import useFilterStore from "../store/filter-store";
import { useSelectedCriteriaStore } from "../store/selected-criteria-store";

export const useResetQueryData = () => {
  const { clearRunningQuery } = useFeasibilityQuery();

  const resetQueryData = () => {
    clearRunningQuery();

    useSelectedCriteriaStore.getState().clearSelectedCriteria();
    useFilterStore.getState().clearFilter();
  };

  return { resetQueryData };
};
