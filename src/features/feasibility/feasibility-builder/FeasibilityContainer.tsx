/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import download from "downloadjs";
import Card from "@components/ui/Card";
import type {
  /* DropZone,
  SelectedAttribute, */
  FeasibilityQueryData,
  SelectedChoice,
} from "./type";
import FeasibilityQueryControl from "../feasibility-query-control/FeasibilityQueryControl";
import FeasibilityCriteriaPanel from "./FeasibilityCriteriaPanel";
import GlobalFilterPanel, {
  type globalFilterWarning,
} from "@features/filters/globalFilterPanel";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import useGlobalFilterStore from "@/app/store/global-filter-store";
import useFeasibilityQueryStore from "@/app/store/feasibility-query-store";
import { Button } from "@/components/ui/buttons/Button";
import WarningModal from "../WarningModal";
import SaveQueryModal from "../SaveQueryModal";
import createQueryData from "@/app/utils/createQueryData";
import convertToCriteriaDisplay from "@/app/utils/convertJsonToCriteriaDisplay";
import warningIcon from "@assets/warning-icon.svg";

const FeasibilityContainer = () => {
  const [isInclusionCriteriaOpen, setIsInclusionCriteriaOpen] =
    useState<boolean>(true);
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
  const stopEditing = useGlobalFilterStore((s) => s.stopEditing);
  const globalFilter = useGlobalFilterStore((s) => s.globalFilter);
  const updateGlobalFilter = useGlobalFilterStore((s) => s.updateGlobalFilter);
  const isQueryRunning = useFeasibilityQueryStore((s) => s.isQueryRunning);
  const [completedFilter, setCompletedFilter] = useState<boolean>(false);
  const [hasAnyLocalFilter, setHasAnyLocalFilter] = useState<boolean>(false);
  const [warningModal, setWarningModal] = useState<{
    open: boolean;
    resolver?: (choice: SelectedChoice) => void;
  }>({ open: false });
  const [isDeleteAction, setIsDeleteAction] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [numberOfEditing, setNumberOfEditing] = useState<number>(0);

  const handleWarningChoice = (selectedChoice: SelectedChoice) => {
    warningModal.resolver?.(selectedChoice);
    setWarningModal({ open: false });
    setIsDeleteAction(false);
  };

  const requestWarningConfirmation = () =>
    new Promise<SelectedChoice>((resolve) => {
      setWarningModal({ open: true, resolver: resolve });
    });

  const handleWarning = async (warning: globalFilterWarning) => {
    setHasAnyLocalFilter(warning.hasLocalFilter);
    setIsDeleteAction(warning.isDeleteAction);
    const choice = await requestWarningConfirmation();
    const includeLocal = true;

    switch (choice) {
      case "cancel":
        return;
      case "confirm":
        updateGlobalFilter(warning.filterName, warning.value);
        applyGlobalTimeRange(!includeLocal);
        break;
      case "delete":
        updateGlobalFilter(warning.filterName, null);
        applyGlobalTimeRange(!includeLocal);
        break;
      case "replace global":
        updateGlobalFilter(warning.filterName, warning.value);
        applyGlobalTimeRange(!includeLocal);
        break;
      case "replace all":
        updateGlobalFilter(warning.filterName, warning.value);
        applyGlobalTimeRange(includeLocal);
        break;
      default:
        return;
    }
    stopEditing();
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
            updateGlobalFilter("timeRange", c.criterion.timeRestriction);
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
    const queryData = createQueryData();

    if (!queryData) return;
    // utf-8 encoder
    const encoder = new TextEncoder();
    const jsonString = JSON.stringify(queryData, null, 2);
    const utf8JsonData = encoder.encode(jsonString);
    download(utf8JsonData, fileName + ".json", "application/json");
  };

  const resetAllData = () => {
    clearSelectedCriteria();
    updateGlobalFilter("timeRange", null);
    updateGlobalFilter("caseType", null);
    stopEditing();
  };

  useEffect(() => {
    const hasEditing =
      selectedInclusionCriteria.criteria.some((c) => c.isEditing) ||
      globalFilter.isEditing;
    if (hasEditing) {
      const numberOfSelectedCriteriaEditing =
        selectedInclusionCriteria.criteria.filter((c) => c.isEditing).length;
      const numberOfGlobalFilterEditing = globalFilter.isEditing ? 1 : 0;
      const numberOfTotalEditing =
        numberOfSelectedCriteriaEditing + numberOfGlobalFilterEditing;
      setNumberOfEditing(numberOfTotalEditing);
    } else {
      setNumberOfEditing(0);
    }
    setCompletedFilter(
      !hasEditing && selectedInclusionCriteria.criteria.length > 0,
    );
  }, [selectedInclusionCriteria.criteria, globalFilter.isEditing]);

  useEffect(() => {
    if (!isQueryRunning) return;
    // TODO: show warning popup
  }, [selectedInclusionCriteria, globalFilter]);

  return (
    <>
      <div className="flex flex-col h-full min-h-0 bg-[#fafafa]">
        <FeasibilityQueryControl
          completedFilter={completedFilter}
          createQueryData={createQueryData}
          onResetAllData={resetAllData}
        />
        <div
          id="feasibility-container"
          className="flex flex-col flex-1 min-h-0 max-w-240 w-full px-5 py-8 mx-auto overflow-hidden"
        >
          <Card
            className="flex flex-col flex-1 min-h-0"
            bodyClassName="p-0 flex flex-col flex-1 min-h-0 gap-1"
          >
            <div className="flex justify-between items-center p-3 pt-0 border-b-[1.5px] border-(--color-border)">
              <div className="flex gap-2">
                {numberOfEditing > 0 && (
                  <>
                    <img src={warningIcon} className="inline w-4 mr-1" />
                    <p className="text-sm">
                      Nicht bestätigte Filter: {numberOfEditing}
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
                    id={""}
                    label="Abfrage speichern"
                    type="secondary"
                    className="m-0! font-medium!"
                    isActive={completedFilter}
                    onClick={() => setSaveModalOpen(true)}
                  />
                </li>
              </menu>
            </div>
            <div className="flex flex-col h-full min-h-0 gap-4 p-4">
              <GlobalFilterPanel onHandleWarning={handleWarning} />
              <div className="flex-1 min-h-0">
                <FeasibilityCriteriaPanel
                  key="inclusionCriteria"
                  label="Einschlusskriterien"
                  selectedCriteria={selectedInclusionCriteria}
                  isPanelExpanded={isInclusionCriteriaOpen}
                  onToggleCriteriaPanel={() =>
                    setIsInclusionCriteriaOpen((prev) => !prev)
                  }
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <WarningModal
        open={warningModal.open}
        hasAnyLocalFilter={hasAnyLocalFilter}
        isDeleteAction={isDeleteAction}
        onClick={(choice) => handleWarningChoice(choice)}
      />
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

export default FeasibilityContainer;
