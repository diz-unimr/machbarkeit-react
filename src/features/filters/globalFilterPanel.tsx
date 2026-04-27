/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import Card from "@components/ui/Card";
import TimeRangeOption from "./controls/TimeRangeOption";
import ArrowButton from "@components/ui/buttons/ArrowButton";
import warningIcon from "@assets/warning-icon.svg";
import { useEffect, useState } from "react";
import useGlobalFilterStore from "@/app/store/global-filter-store";
import type { CaseType, TimeRangeType } from "./controls/type";
import { Button } from "@components/ui/buttons/Button";
import formatTimeRangeLabel from "@app/utils/formatTimeRangeLabel";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import useOntologies from "@/app/hooks/ontologies/useOntologies";
import useModulesStore from "@/app/store/modules-store";

export type GlobalFilterName = "timeRange" | "caseType";
export type globalFilterWarning = {
  filterName: GlobalFilterName;
  value: TimeRangeType["timeRestriction"] | null;
  hasLocalFilter: boolean;
  isDeleteAction: boolean;
};
type GlobalFilterPanelProps = {
  onHandleWarning: (warning: globalFilterWarning) => void;
};

const GlobalFilterPanel = ({ onHandleWarning }: GlobalFilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const globalFilter = useGlobalFilterStore((s) => s.globalFilter);
  const globalCaseType =
    (globalFilter.caseType?.termCodes[0].code as CaseType) || null;
  const startEditing = useGlobalFilterStore((s) => s.startEditing);
  const stopEditing = useGlobalFilterStore((s) => s.stopEditing);
  const updateGlobalFilter = useGlobalFilterStore((s) => s.updateGlobalFilter);
  const [globalFilterTemp, setGlobalFilterTemp] = useState<
    TimeRangeType["timeRestriction"] | null
  >(null);
  const [isFilterComplete, setIsFilterCompleted] = useState<boolean>(true);
  const [caseType, setCaseType] = useState<CaseType>(
    globalCaseType ?? "no filter",
  );
  const selectedInclusionCriteria = useSelectedCriteriaStore(
    (s) => s.selectedInclusionCriteria,
  );
  const modules = useModulesStore((s) => s.modules);
  const caseTypeModule = modules.filter((module) => module.name === "Fall")[0];
  const ontologyResult = useOntologies(caseTypeModule?.id ?? null);
  const caseTypeValues = ontologyResult.ontologyResult.criteria;

  const cancelFilterChanges = () => {
    updateGlobalFilter("timeRange", globalFilter.timeRange ?? null);
    stopEditing();
  };

  const checkTimeRangeConflicts = (): boolean => {
    const criteria = selectedInclusionCriteria.criteria;
    const hasAnyLocal = criteria.some(
      (c) =>
        (c.criterion.timeRestrictionAllowed &&
          c.criterion.isLocalFilter === true) ||
        c.isEditing === true,
    );
    return hasAnyLocal;
  };

  const handleGlobalTimeRangeChange = (
    filterName: GlobalFilterName,
    value: TimeRangeType["timeRestriction"] | null,
  ) => {
    if (selectedInclusionCriteria.criteria.length === 0) {
      updateGlobalFilter(filterName, value);
      stopEditing();
      return;
    }

    const hasLocalFilter = checkTimeRangeConflicts();

    onHandleWarning({
      filterName,
      value,
      hasLocalFilter,
      isDeleteAction: false,
    });
  };

  useEffect(() => {
    if (globalCaseType === null || globalCaseType === caseType) return;
    setCaseType(globalCaseType as CaseType);
  }, [globalCaseType]);

  return (
    <div
      className="flex flex-col gap-2"
      style={{
        borderBottom: !isExpanded
          ? "1.5px solid var(--color-border)"
          : undefined,
      }}
    >
      <div className="flex justify-between">
        <div className="flex gap-3">
          <p className="text-lg font-medium p-2">Globaler Filter</p>
          {!isExpanded && globalFilter.isEditing && (
            <div className="flex gap-2 items-center p-1">
              <img src={warningIcon} className="inline w-4 mr-1" />
              <p className="text-sm text-[#804909]">
                Bitte bestätigen Sie den Filter
              </p>
            </div>
          )}
        </div>

        <ArrowButton
          id="global-filter-btn"
          mode="rotate-left"
          isExpanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
      {isExpanded && (
        <Card>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <p className="mt-3 mr-2 text-end font-medium whitespace-nowrap">
                Globaler Zeitraum :
              </p>
              <div className="flex flex-col">
                {globalFilter.isEditing ? (
                  <TimeRangeOption
                    timeRestrictionData={globalFilter.timeRange} //data from file just on first time
                    onValidityChange={(isValid) => {
                      setIsFilterCompleted(isValid);
                    }}
                    onCompleteChange={(timeRange) =>
                      setGlobalFilterTemp({
                        ...timeRange,
                      })
                    }
                  />
                ) : (
                  <div className="mt-2 pl-1">
                    {formatTimeRangeLabel(globalFilter.timeRange ?? null)}
                  </div>
                )}

                <div className="flex gap-10 pl-0.5">
                  {(globalFilter.isEditing || globalFilter.timeRange) && (
                    <Button
                      id={"clear-filter-btn"}
                      label="Löschen"
                      type="tertiary"
                      onClick={() => {
                        onHandleWarning({
                          filterName: "timeRange",
                          value: null,
                          hasLocalFilter: false,
                          isDeleteAction: true,
                        });
                      }}
                    />
                  )}
                  {globalFilter.isEditing ? (
                    <div className="flex gap-2">
                      <Button
                        id={"global-btn"}
                        label="Abbrechen"
                        type="tertiary"
                        onClick={cancelFilterChanges}
                      />
                      <Button
                        id={"global-btn"}
                        label="Bestätigen"
                        type="tertiary"
                        isActive={isFilterComplete}
                        onClick={() => {
                          handleGlobalTimeRangeChange(
                            "timeRange",
                            globalFilterTemp,
                          );
                        }}
                      />
                    </div>
                  ) : (
                    <Button
                      id={"global-btn"}
                      label={
                        globalFilter.timeRange ? "Bearbeiten" : "Filter setzen"
                      }
                      type="tertiary"
                      onClick={() => {
                        startEditing();
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <p className="font-medium whitespace-nowrap">Fallart :</p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="no filter"
                  value="no filter"
                  checked={caseType === "no filter"}
                  onChange={() => {
                    setCaseType("no filter");
                    updateGlobalFilter("caseType", null);
                  }}
                />
                Kein Filter
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="inpatient"
                  value="inpatient"
                  checked={caseType === "IMP"}
                  onChange={() => {
                    setCaseType("IMP");
                    updateGlobalFilter(
                      "caseType",
                      caseTypeValues?.filter(
                        (c) => c.termCodes[0].code === "IMP",
                      )[0] ?? null,
                    );
                  }}
                />
                Stationär
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="outpatient"
                  value="outpatient"
                  checked={caseType === "AMB"}
                  onChange={() => {
                    setCaseType("AMB");
                    updateGlobalFilter(
                      "caseType",
                      caseTypeValues?.filter(
                        (c) => c.termCodes[0].code === "AMB",
                      )[0] ?? null,
                    );
                  }}
                />
                Ambulant
              </label>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default GlobalFilterPanel;
