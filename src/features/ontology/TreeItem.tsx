/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { type Criterion, type Module } from "../../features/ontology/type";
import { ArrowButton } from "../../components/ui/buttons/ArrowButton";
import { useItemsStore, handleCheckbox } from "../../store/checked-items-store";
import { useModulesStore } from "../../store/modules-store";
import { useEffect, useRef, useState } from "react";

type TreeItemProps = {
  criterion: Criterion;
  isExpanded: boolean;
  onArrowClick?: () => void;
};

type TerminologyCode = {
  loinc?: string;
  swlCode?: string;
  termCode?: string;
} | null;

export default function TreeItem({
  criterion,
  isExpanded,
  onArrowClick,
}: TreeItemProps) {
  const checkedItems = useItemsStore((state) => state.checkedItems);
  const checkRef = useRef<HTMLInputElement>(null);
  const [terminologyCode, setTerminologyCode] = useState<TerminologyCode>(null);

  const handleChange = () => {
    const isChecked = checkRef.current?.checked;
    handleCheckbox(criterion, isChecked!);
  };

  const getModuleName = (moduleId: string) => {
    const modules = useModulesStore.getState().modules;
    const moduleName =
      modules.find((module: Module) => module.id === moduleId)?.name || "";
    return moduleName;
  };

  const findTerminologyCode = (criterion: Criterion, moduleName: string) => {
    let termCode = undefined;
    let loinc = undefined;
    let swlCode = undefined;

    if (moduleName === "Laboruntersuchung") {
      loinc = criterion.termCodes?.find(
        (termCode) => termCode.system === "http://loinc.org"
      )?.code;
      swlCode = criterion.termCodes?.find(
        (termCode) =>
          termCode.system ===
          "https://fhir.diz.uni-marburg.de/CodeSystem/swisslab-code"
      )?.code;
      setTerminologyCode({ loinc, swlCode });
    } else {
      termCode = criterion.termCodes?.[0]?.code;
      setTerminologyCode({ termCode });
    }
  };

  useEffect(() => {
    const moduleName = getModuleName(criterion.moduleId);
    findTerminologyCode(criterion, moduleName);
  }, [criterion]);

  return (
    <>
      <ArrowButton
        id={criterion.id}
        isExpanded={isExpanded}
        onClick={onArrowClick}
        hasChildren={
          (criterion.children && criterion.children.length > 0) || false
        }
      />
      {criterion.selectable && (
        <input
          ref={checkRef}
          type="checkbox"
          className="mt-1.5 cursor-pointer"
          checked={checkedItems.has(criterion.id)}
          onChange={handleChange}
        />
      )}
      <div className="flex gap-2.5">
        {criterion.selectable && (
          <>
            {terminologyCode?.termCode ? (
              <div className="font-medium whitespace-nowrap">
                {terminologyCode?.termCode}
              </div>
            ) : null}
            {!terminologyCode?.termCode &&
            (terminologyCode?.loinc || terminologyCode?.swlCode) ? (
              <>
                <div className="font-medium whitespace-nowrap">
                  {terminologyCode?.loinc || "Kein LOINC"}
                </div>
                <div>|</div>
                <div className="font-medium whitespace-nowrap">
                  {terminologyCode?.swlCode || "Kein SWL Code"}
                </div>
              </>
            ) : null}
            <div>|</div>
          </>
        )}
        <div
          key={criterion.id}
          className="cursor-default"
          onClick={onArrowClick}
        >
          {criterion.display}
        </div>
      </div>
    </>
  );
}
