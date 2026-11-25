/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import { Button } from "@components/ui/buttons/Button";
import ButtonContainer from "@components/ui/buttons/ฺButtonContainer";
import type {
  FeasibilityQueryData,
  SelectedCriteria,
} from "@/features/feasibility/feasibility-builder/types";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import { buttonLabels } from "@/app/constants/uiTexts";
import { useFeasibilityQuery } from "@/app/hooks/useFeasibilityQuery";
import { useResetQueryData } from "@/app/hooks/useResetQueryData";
import { getIncompleteFilterCount } from "@/app/utils/getIncompleteFilterCount";
import useFilterStore from "@/app/store/filter-store";
import SaveQueryModal from "../SaveQueryModal";
import { toast } from "sonner";

const FeasibilityQueryControl = ({
  completedFilter,
  createQueryData,
}: {
  completedFilter: boolean;
  createQueryData: (
    selectedCriteria: SelectedCriteria,
  ) => FeasibilityQueryData | null;
}) => {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [queryName, setQueryName] = useState<string>("");

  const { isQueryRunning, startQuery, stopQuery } = useFeasibilityQuery();

  const { resetQueryData } = useResetQueryData();
  const editingFilters = useFilterStore((s) => s.editingFilters);
  const selectedInclusionCriteria = useSelectedCriteriaStore(
    (s) => s.selectedInclusionCriteria,
  );
  const incompleteFilterCount = getIncompleteFilterCount({
    scope: "all",
    editingFilters: editingFilters,
    criteria: selectedInclusionCriteria.criteria,
  });

  const toggleQuery = async () => {
    if (isQueryRunning) {
      // Stop Query
      stopQuery();
      return;
    }
    // Start Query
    const queryData = createQueryData(selectedInclusionCriteria);
    if (!queryData) return;
    startQuery(queryData);
  };

  const saveQuery = (fileName: string) => {
    const queryData = createQueryData(selectedInclusionCriteria);
    setQueryName(fileName);

    if (!queryData) return;
  };

  const handleSaveQuery = async () => {
    try {
      await saveQuery(queryName);

      toast.success("Abfrage erfolgreich gespeichert", {
        description: `Die Abfrage "${queryName}" wurde erfolgreich gespeichert.`,
        duration: 4000,
      });
    } catch (_error) {
      toast.error("Abfrage konnte nicht gespeichert werden", {
        description: "Bitte versuchen Sie es erneut.",
        duration: 4000,
      });
    }
  };

  useEffect(() => {
    resetQueryData();
  }, []);

  return (
    <div className="flex h-15 bg-white border-b-[1.5px] border-(--color-border)">
      <div className="flex w-full max-w-240 justify-between items-center m-auto px-8">
        <div className="flex flex-col w-full h-9 px-2">
          <input
            onChange={(e) => {
              setQueryName(e.target.value);
            }}
            id="query-name"
            type="text"
            value={queryName}
            placeholder="Abfragename ( z.B. Diabetes Typ 2 )"
            className="min-w-20 w-full h-full truncate rounded-md! border! border-[#D8DFE4]! outline-0 px-3 text-sm"
          />
        </div>
        <ButtonContainer className="p-0">
          <Button
            id={"save-query"}
            label={buttonLabels.saveQuery}
            type="secondary"
            className="m-0! font-medium!"
            isActive={
              incompleteFilterCount === 0 &&
              selectedInclusionCriteria.criteria.length > 0
            }
            onClick={() => {
              if (!queryName) setSaveModalOpen(true);
              else handleSaveQuery();
            }}
          />
          <Button
            id="start-query"
            type="primary"
            label={
              !isQueryRunning ? buttonLabels.startQuery : buttonLabels.stopQuery
            }
            isActive={
              completedFilter && selectedInclusionCriteria.criteria.length > 0
            }
            onClick={toggleQuery}
          />
        </ButtonContainer>
        {(!queryName || queryName.length < 1) && (
          <SaveQueryModal
            open={saveModalOpen}
            onSaveFile={(fileName) => {
              saveQuery(fileName);
              setSaveModalOpen(false);
            }}
            onCancel={() => setSaveModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default FeasibilityQueryControl;
