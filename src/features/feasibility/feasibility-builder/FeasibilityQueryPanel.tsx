/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useMemo, useState } from "react";
import download from "downloadjs";
import Card from "@/components/ui/Card";
import type { SelectedCriteria, FeasibilityQueryData } from "./types";
import FeasibilityQueryControl from "../feasibility-query-control/FeasibilityQueryControl";
import FeasibilityCriteriaPanel from "./FeasibilityCriteriaPanel";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import useFilterStore from "@/app/store/filter-store";
import { Button } from "@/components/ui/buttons/Button";
import { WarningModal } from "@/components/ui/modals/WarningModal";
import SaveQueryModal from "../SaveQueryModal";
import createQueryData from "@/app/utils/createQueryData";
import convertToCriteriaDisplay from "@/app/utils/convertJsonToCriteriaDisplay";
import warningIcon from "@assets/warning-icon.svg";
import {
  buttonLabels,
  warningMessages,
  commonTexts,
  titleTexts,
  confirmationMessages,
} from "@/app/constants/uiTexts";
import { getIncompleteFilterCount } from "@/app/utils/getIncompleteFilterCount";
import type { GlobalFilterWarning } from "@/features/filters/GlobalFilterPanel";
import GlobalFilterPanel from "@/features/filters/GlobalFilterPanel";
import type { WarningConfig } from "@/components/ui/modals/types";
import { useWarningConfirmation } from "@/app/hooks/useWarningConfirmation";

const FeasibilityQueryPanel = () => {
  const [inclusionCriteria, setInclusionCriteria] = useState<SelectedCriteria>({
    criteriaType: "inclusionCriteria",
    criteria: [],
    logics: [],
  });
  const selectedInclusionCriteria = useSelectedCriteriaStore(
    (s) => s.selectedInclusionCriteria,
  );
  const setSelectedCriteria = useSelectedCriteriaStore(
    (s) => s.setSelectedCriteria,
  );
  const clearSelectedCriteria = useSelectedCriteriaStore(
    (s) => s.clearSelectedCriteria,
  );
  const applyGlobalTimeRange = useSelectedCriteriaStore(
    (s) => s.applyGlobalTimeRange,
  );

  const editingFilters = useFilterStore((s) => s.editingFilters);
  const incompleteFilterCount = getIncompleteFilterCount({
    scope: "all",
    editingFilters: editingFilters,
    criteria: selectedInclusionCriteria.criteria,
  });
  const stopEditing = useFilterStore((s) => s.stopEditing);
  const updateGlobalFilter = useFilterStore((s) => s.updateGlobalFilter);
  const clearFilter = useFilterStore((s) => s.clearFilter);
  const { warningModal, requestWarningConfirmation, handleWarningChoice } =
    useWarningConfirmation();

  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);

  const getWarningConfig = (warning: GlobalFilterWarning): WarningConfig => {
    if (warning.action === "delete") {
      return {
        title: titleTexts.deleteGlobalFilter,
        message: confirmationMessages.deleteGlobalFilter,
        options: ["cancel", "delete"],
      };
    }

    if (warning.hasLocalFilter) {
      return {
        title: titleTexts.applyGlobalFilter,
        message: confirmationMessages.updateOrReplaceFilters,
        options: ["cancel", "replace global", "replace all"],
      };
    }

    return {
      title: titleTexts.applyGlobalFilter,
      message: confirmationMessages.applyGlobalFilterToAll,
      options: ["cancel", "confirm"],
    };
  };

  const handleWarning = async (warning: GlobalFilterWarning) => {
    const config = getWarningConfig(warning);
    const choice = await requestWarningConfirmation(config);

    if (choice === "cancel") return;

    if (warning.action === "delete") {
      if (choice !== "delete") return;
      updateGlobalFilter(warning.filterName, null);
      applyGlobalTimeRange(false);
      return;
    }

    if (choice === "confirm" || choice === "replace global") {
      updateGlobalFilter(warning.filterName, warning.value);
      applyGlobalTimeRange(false);
    }

    if (choice === "replace all") {
      updateGlobalFilter(warning.filterName, warning.value);
      applyGlobalTimeRange(true);
    }
  };

  const removeCriterion = (uid: string) => {
    setInclusionCriteria((prev) => {
      const index = prev.criteria.findIndex((c) => c.uid === uid);
      return {
        ...prev,
        criteria: prev.criteria.filter((item) => item.uid !== uid),
        logics: prev.logics.filter((_, i) => {
          if (index === prev.criteria.length - 1) return i;
          else if (prev.logics[index - 1] === "OR") return i != index - 1;
          else return i != index;
        }),
      };
    });
  };

  const parseAndValidateFile = async (
    file: File,
  ): Promise<FeasibilityQueryData> => {
    const text = await file.text();
    const data = JSON.parse(text) as FeasibilityQueryData;

    const isValid =
      (data.inclusionCriteria && data.inclusionCriteria.length > 0) ||
      (data.exclusionCriteria && data.exclusionCriteria.length > 0);

    if (!isValid) {
      throw new Error("Invalid JSON format");
    }

    return data;
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const uploadedCriteria: FeasibilityQueryData =
        await parseAndValidateFile(file);
      const inclusionCriteria =
        await convertToCriteriaDisplay(uploadedCriteria);

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
    } finally {
      event.target.value = "";
    }
  };

  const saveQuery = (fileName: string) => {
    const queryData = createQueryData(selectedInclusionCriteria);

    if (!queryData) return;
    // utf-8 encoder
    const encoder = new TextEncoder();
    const jsonString = JSON.stringify(queryData, null, 2);
    const utf8JsonData = encoder.encode(jsonString);
    download(utf8JsonData, fileName + ".json", "application/json");
  };

  const resetAllData = () => {
    clearSelectedCriteria();
    clearFilter();
  };

  const hasNoTimeRestriction = useMemo(() => {
    const criteria = selectedInclusionCriteria.criteria;
    return (
      criteria.length > 0 &&
      criteria.every((c) => !c.criterion.timeRestrictionAllowed)
    );
  }, [selectedInclusionCriteria]);

  useEffect(() => {
    if (!hasNoTimeRestriction) return;
    updateGlobalFilter("timeRestriction", null);
    stopEditing({ scope: "global", filterName: "timeRestriction" });
  }, [hasNoTimeRestriction, selectedInclusionCriteria]);

  useEffect(() => {
    console.log("selectedInclusionCriteria: ", selectedInclusionCriteria);
  }, [selectedInclusionCriteria]);

  return (
    <>
      <div className="flex flex-col h-full min-h-0 bg-[#fafafa]">
        <FeasibilityQueryControl
          completedFilter={incompleteFilterCount === 0}
          createQueryData={createQueryData}
          onResetAllData={resetAllData}
        />
        <div className="flex flex-col flex-1 min-h-0 max-w-240 w-full px-5 py-5 mx-auto overflow-hidden">
          <Card
            className="flex flex-col flex-1 min-h-0 py-0"
            bodyClassName="p-0 flex flex-col flex-1 min-h-0 gap-1"
          >
            <div className="flex justify-between items-center py-3 border-b-[1.5px] border-(--color-border)">
              <div className="flex gap-2">
                {incompleteFilterCount > 0 && (
                  <>
                    <img src={warningIcon} className="inline w-4 mr-1" />
                    <p className="text-sm">
                      {warningMessages.incompletedFilterCount +
                        incompleteFilterCount}
                    </p>
                  </>
                )}
              </div>
              <menu className="flex gap-8">
                <li className="flex gap-7 m-auto">
                  <input
                    id="upload"
                    type="file"
                    accept="application/json"
                    hidden
                    onChange={(e) => {
                      resetAllData();
                      handleFileUpload(e);
                    }}
                  />
                  <label
                    htmlFor="upload"
                    className="flex items-center text-[clamp(11px,1vw,14px)] font-medium cursor-pointer px-2.5 py-1.5 hover:text-white hover:rounded-md hover:bg-[#0072DA]"
                  >
                    Abfrage laden
                  </label>
                  <Button
                    id={"save-query"}
                    label={buttonLabels.saveQuery}
                    type="secondary"
                    className="m-0! font-medium!"
                    isActive={incompleteFilterCount === 0}
                    onClick={() => setSaveModalOpen(true)}
                  />
                </li>
              </menu>
            </div>
            <div className="flex flex-col h-full min-h-0 gap-4 py-4">
              <GlobalFilterPanel onHandleWarning={handleWarning} />
              <WarningModal
                open={warningModal.open}
                title={warningModal.title}
                message={warningModal.message}
                options={warningModal.options}
                onClick={handleWarningChoice}
              />
              <div className="flex-1 min-h-0">
                {inclusionCriteria.criteria.map((c, i) => (
                  <div key={i}>
                    {c.criterion.timeRestriction?.afterDate} |{" "}
                    {c.criterion.timeRestriction?.beforeDate}
                  </div>
                ))}
                <FeasibilityCriteriaPanel
                  key="inclusionCriteria"
                  label={commonTexts.inclusionCriteria}
                  selectedCriteria={selectedInclusionCriteria}
                  onRemoveCriterion={removeCriterion}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <SaveQueryModal
        open={saveModalOpen}
        onSaveFile={(fileName) => {
          saveQuery(fileName);
          setSaveModalOpen(false);
        }}
        onCancel={() => setSaveModalOpen(false)}
      />
    </>
  );
};

export default FeasibilityQueryPanel;
