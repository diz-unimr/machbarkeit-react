/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de> */

import useModules from "@app/hooks/useModules";
import type { Module } from "@app/types/ontologyType";
import { useEffect, useMemo, useState } from "react";

type ModulesPanelProps = {
  onHandleModules: (activeModule: Module | null) => void;
};

const ModulesPanel = ({ onHandleModules }: ModulesPanelProps) => {
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const modules = useModules();

  const selectableModules = useMemo(
    () => modules.filter((module) => module.name !== "Fall"),
    [modules],
  );

  const changeTab = (moduleId: string) => {
    const current = selectableModules.find((m) => m.id === moduleId);
    setCurrentModule(current ?? null);
    onHandleModules(current ?? null);
  };

  useEffect(() => {
    if (!selectableModules || selectableModules.length === 0) return;
    const current = selectableModules[0];
    setCurrentModule(current ?? null);
    onHandleModules(current);
  }, [selectableModules]);

  return (
    <div className="flex-none w-full h-fit overflow-x-auto overflow-y-hidden">
      <menu className="flex w-full p-3  border-b-2 border-b-(--color-border)">
        <li className="flex gap-7 m-auto">
          {selectableModules.map((module) => (
            <div
              key={module.id}
              className={`${module === currentModule ? "border-b-2" : undefined}`}
              style={{
                color:
                  module === currentModule ? module.color.btnColor : "#333333",
                fontWeight: module === currentModule ? "600" : undefined,
                cursor: "pointer",
              }}
              onClick={() => changeTab(module.id)}
            >
              {module.name}
            </div>
          ))}
        </li>
      </menu>
    </div>
  );
};
export default ModulesPanel;
