/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect, useState } from "react";
import Card from "@components/ui/Card";
import type {
  DropZone,
  SelectedAttribute,
  CriterionNode,
  SelectedCriteria,
  FeasibilityQueryData,
} from "./type";
import FeasibilityQueryControl from "../feasibility-query-control/FeasibilityQueryControl";
import FeasibilityCriteriaPanel from "./FeasibilityCriteriaPanel";
import GlobalFilterPanel, {
  type GlobalFilterName,
} from "@features/filters/globalFilterPanel";
import PopupModal from "@components/ui/PopupModal";
import type { TimeRangeType } from "@features/filters/controls/type";
import { useSelectedCriteriaStore } from "@app/store/selectedCriteria/selected-criteria-store";
import { useGlobalFilterStore } from "@app/store/selectedCriteria/global-filter-store";
import { useFilterValidationStore } from "@app/store/filter-validation-store";

function FeasibilityContainer() {
  const [isInclusionCriteriaOpen, setIsInclusionCriteriaOpen] =
    useState<boolean>(true);
  const [inclusionCriteria, setInclusionCriteria] = useState<SelectedCriteria>({
    criteriaType: "inclusion",
    criteria: [],
    logics: [],
  });
  /* const [isExclusionCriteriaOpen, setIsExclusionCriteriaOpen] =
    useState<boolean>(true);
  const [exclusionCriteria, setExclusionCriteria] = useState<
    DroppedCriterion[]
  >([]); */
  const selectedInclusionCriteria = useSelectedCriteriaStore(
    (s) => s.selectedInclusionCriteria
  );
  const applyGlobalFilter = useSelectedCriteriaStore(
    (s) => s.applyGlobalFilter
  );
  const { validityItems } = useFilterValidationStore();
  const { updateGlobalFilter } = useGlobalFilterStore();

  const [feasibilityQueryData, setFeasibilityQueryData] =
    useState<FeasibilityQueryData | null>(null);
  // const [attributeList, setAttributeList] = useState<SelectedAttribute[]>([]);
  // const [activeZone, setActiveZone] = useState<DropZone | null>(null);
  const { globalFilter } = useGlobalFilterStore();
  const [timeRangeDraft, setTimeRangeDraft] = useState<
    TimeRangeType["timeRestriction"] | null
  >(globalFilter.timeRange);
  const [completeFilter, setCompleteFilter] = useState<boolean>(true);
  const [isGlobalFilterWarning, setIsGlobalFilterWarning] =
    useState<boolean>(false);
  const [hasGlobalFilterConflict, setHasGlobalFilterConflict] =
    useState<boolean>(false);
  const [warningModal, setWarningModal] = useState<{
    open: boolean;
    resolver?: (ok: boolean) => void;
  }>({ open: false });

  /* const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json") {
      alert("Please select a JSON file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const uploadedCriteria: FeasibilityQueryData = JSON.parse(
          e.target?.result as string
        );
        const isJsonDataValid =
          !!(
            uploadedCriteria.inclusionCriteria &&
            uploadedCriteria.inclusionCriteria!.length > 0
          ) ||
          (uploadedCriteria.exclusionCriteria &&
            uploadedCriteria.exclusionCriteria!.length > 0);
        if (isJsonDataValid) {
          convertToCriteriaDisplay(uploadedCriteria);
        } else {
          alert("Invalid JSON Format");
        }
      } catch (error) {
        alert((error as AxiosError).message);
      }
    };
    reader.readAsText(file);
  }; */

  const requestWarningConfirmation = () =>
    new Promise<boolean>((resolve) => {
      setWarningModal({ open: true, resolver: resolve });
    });

  const handleConfirmWarning = () => {
    warningModal.resolver?.(true);
    setWarningModal({ open: false });
  };

  const handleCancelWarning = () => {
    warningModal.resolver?.(false);
    setWarningModal({ open: false });
    setTimeRangeDraft(globalFilter.timeRange);
  };

  const toggleCriterionItem = (criterion: CriterionNode) => {
    setInclusionCriteria((prev) => {
      return {
        ...prev,
        criteria: prev.criteria.map((c) =>
          c.uid === criterion.uid ? { ...c, isExpanded: !c.isExpanded } : c
        ),
      };
    });
  };

  const handleGlobalFilterChange = (
    filterName: GlobalFilterName,
    value: string | (TimeRangeType["timeRestriction"] | null)
  ) => {
    updateGlobalFilter(filterName, value);
  };

  const handleGlobalFilterConflict = async (
    hasConflict: boolean,
    timeRange: TimeRangeType["timeRestriction"] | null
  ) => {
    setTimeRangeDraft(timeRange);
    if (hasConflict) {
      const ok = await requestWarningConfirmation();
      if (!ok) return; // ผู้ใช้กด Cancel -> ออกทันที
    }

    // เมื่อ isAnyLocalFilter = true ต้องการใช้มีป๊อปอัพเด้งขึ้นมาให้ผู้ใช้กดเลือก
    // ถ้าผู้ใช้กดเลือก ok ถึงจะไปต่อในส่วนนี้ได้ ถ้ากด cancel ให้ออกจาก function นี้
    updateGlobalFilter("timeRange", timeRange);
    applyGlobalFilter("timeRange");
  };

  const applyGlobalTime = async (selectedCriteria: SelectedCriteria) => {
    // check for overwrite global filter
    const isAnyLocalFilter = selectedCriteria.criteria.some((c) => {
      const current = c.criterion.timeRestriction;
      const global = globalFilter.timeRange;

      return (
        current?.afterDate !== global?.afterDate &&
        current?.beforeDate !== global?.beforeDate
      );
    });

    setIsGlobalFilterWarning(isAnyLocalFilter);
    if (isAnyLocalFilter) {
      const ok = await requestWarningConfirmation();
      if (!ok) return; // ผู้ใช้กด Cancel -> ออกทันที
    }
    // เมื่อ isAnyLocalFilter = true ต้องการใช้มีป๊อปอัพเด้งขึ้นมาให้ผู้ใช้กดเลือก
    // ถ้าผู้ใช้กดเลือก ok ถึงจะไปต่อในส่วนนี้ได้ ถ้ากด cancel ให้ออกจาก function นี้
    /* return {
      ...selectedCriteria,
      criteria: selectedCriteria.criteria.map((c) =>
        c.criterion.timeRestrictionAllowed
          ? {
              ...c,
              criterion: {
                ...c.criterion,
                timeRestriction: globalFilter.timeRange ?? undefined,
              },
            }
          : c
      ),
    }; */
  };

  // drag Markmale into Einschlusskriterien and logic change
  const handleCriteriaChange = ({
    items,
    isIndividualChange = false,
  }: {
    items: React.SetStateAction<SelectedCriteria> | null;
    isIndividualChange?: boolean;
  }) => {
    //setCompleteFilter(completeFilter);
    if (!items) return;
    setInclusionCriteria((prev) => {
      (async () => {
        const next = typeof items === "function" ? items(prev) : items;
        if (!isIndividualChange) {
          const updated = await applyGlobalTime(next);
          if (updated) setInclusionCriteria(updated);
        } else {
          setInclusionCriteria(next);
        }
        return setInclusionCriteria(next);
      })();
      return prev;
    });
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
          /* if (index > 0 && prev.logics[index - 1] === "OR") {
            return i != index - 1;
          } else return i != index; */
        }),
      };
    });
  };

  const handleFeasibilityQueryData = (data: SelectedCriteria) => {
    const criteria = data.criteria.map((criterion) => {});
    const queryData: FeasibilityQueryData = {
      display: "Feasibility Query",
      version: "1.0.0",
    };
  };

  const convertToCriteriaDisplay = (x) => {};

  useEffect(() => {
    console.log("UseEffect: ", validityItems);
    const allValid = validityItems.every((item) => item.isValid);
    if (allValid) setCompleteFilter(true);
    else setCompleteFilter(false);
  }, [validityItems]);
  /* useEffect(() => {
    console.log("Criteria from Store: ", selectedInclusionCriteria);
    if (!globalFilter.timeRange) return;
    setInclusionCriteria((prev) => {
      (async () => {
        const updated = await applyGlobalTime(prev);
        if (updated) setInclusionCriteria(updated);
      })();
      return prev;
    });
  }, [globalFilter.timeRange, selectedInclusionCriteria]); */

  return (
    <>
      <div className="flex flex-col h-full min-h-0 bg-[#fafafa]">
        <FeasibilityQueryControl
          completeFilter={completeFilter}
          data={feasibilityQueryData}
        />
        <div
          id="feasibility-container"
          className="flex flex-col flex-1 min-h-0 max-w-[960px] w-full px-5 py-8 mx-auto overflow-hidden"
        >
          <Card
            className="flex flex-col flex-1 min-h-0"
            bodyClassName="p-0 flex flex-col flex-1 min-h-0 gap-1"
          >
            <div className="flex justify-end items-center py-3 border-b-[1.5px] border-[var(--color-border)]">
              <menu className="flex gap-8 pr-5">
                <li className="flex gap-7 m-auto">
                  <div className="font-medium text-sm text-gray-500 cursor-pointer">
                    Abfragen Laden
                  </div>
                  <div className="font-medium text-sm text-gray-500 cursor-pointer">
                    Abfragen Speichen
                  </div>
                </li>
              </menu>
            </div>
            <div className="flex flex-col h-full min-h-0 gap-4 p-4">
              <GlobalFilterPanel
                // timeRangeValue={timeRangeDraft}
                onHandleGlobalFilterChange={handleGlobalFilterChange}
                // onConflict={handleGlobalFilterConflict}
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
                  label="Einschlusskriterien"
                  selectedCriteria={selectedInclusionCriteria}
                  isPanelExpanded={isInclusionCriteriaOpen}
                  onToggleCriteriaPanel={() =>
                    setIsInclusionCriteriaOpen((prev) => !prev)
                  }
                  onToggleCriterionItem={toggleCriterionItem}
                  onCriteriaChange={handleCriteriaChange}
                  onRemoveCriterion={removeCriterion}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <PopupModal
        open={warningModal.open}
        title="Global Filter Warning"
        message="Auf Filter in allen Elemente ersetzen"
        onConfirm={handleConfirmWarning}
        onCancel={handleCancelWarning}
      />
    </>
  );
}

export default FeasibilityContainer;
