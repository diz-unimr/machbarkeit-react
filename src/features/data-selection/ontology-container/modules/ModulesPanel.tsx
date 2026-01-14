/* eslint-disable react-hooks/exhaustive-deps */
/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de> */

import useModules from "@app/hooks/useModules";
import type { Module } from "@app/types/ontologyType";
import { useEffect, useState } from "react";

type ModulesPanelProps = {
  onHandleModules: (activeModule: Module | null) => void;
};

const ModulesPanel = ({ onHandleModules }: ModulesPanelProps) => {
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  const modules = useModules();

  const changeTab = (moduleId: string) => {
    const current = modules.find((m) => m.id === moduleId);
    setCurrentModule(current ?? null);
    onHandleModules(current ?? null);
  };

  useEffect(() => {
    if (!modules || modules.length === 0) return;
    const current = modules[0];
    setCurrentModule(current ?? null);
    onHandleModules(current);
  }, [modules]);

  return (
    <div className="flex-none w-full h-fit overflow-x-auto overflow-y-hidden">
      <menu className="flex w-full p-3  border-b-2 border-b-[var(--color-border)]">
        <li className="flex gap-7 m-auto">
          {modules?.map((module, index) => (
            <div
              key={index}
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
