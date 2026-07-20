/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import useModulesStore from "@app/store/modules-store";
import type { Module, ModuleColorProps } from "@app/types/ontologyType";

type Color = {
  btnColor: string;
  bgColor: string;
};

type ModuleColorMap = Record<string, Color>;

const moduleColor: ModuleColorMap = {
  Default: {
    btnColor: "#adbcd7",
    bgColor: "#ffffff",
  },
  Patient: {
    btnColor: "#3498DB",
    bgColor: "#D6EAF8",
  },
  Diagnose: {
    btnColor: "#E84393",
    bgColor: "#F7CBE6",
  },
  Procedure: {
    btnColor: "#9B59B6",
    bgColor: "#D0CBF7",
  },
  Laboruntersuchung: {
    btnColor: "#27AE60",
    bgColor: "#C8F1D8",
  },
};

export const getModuleColor = (moduleCode: string): ModuleColorProps => {
  return moduleColor[moduleCode] || moduleColor["Default"];
};

export const getModuleName = (moduleId: string) => {
  const modules = useModulesStore.getState().modules;
  const moduleName =
    modules.find((module: Module) => module.id === moduleId)?.name || "";
  return moduleName;
};
