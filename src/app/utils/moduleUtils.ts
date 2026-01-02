/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { useModulesStore } from "@app/store/modules-store";
import type { Module, ModuleColorProps } from "@app/types/ontologyType";

export function getTabColor(moduleName: string): ModuleColorProps {
  let tabColor: ModuleColorProps = {
    btnColor: "#ffffff",
    bgColor: "#adbcd7",
  };
  if (moduleName === "Person") {
    // return "#3498DB";
    tabColor = {
      btnColor: "#3498DB",
      bgColor: "#D6EAF8",
    };
  } else if (moduleName === "Fall") {
    // return "#9B59B6";
    tabColor = {
      btnColor: "#E84393", // E84393
      bgColor: "#F7CBE6", // F7D1E6
    };
  } else if (moduleName === "Diagnose") {
    // return "#9B59B6";
    tabColor = {
      btnColor: "#9B59B6",
      bgColor: "#D0CBF7",
    };
  } else if (moduleName === "Prozedur") {
    // return "#FBB016";
    tabColor = {
      btnColor: "#E67E22",
      bgColor: "#F7D9B8",
    };
  } else if (moduleName === "Laboruntersuchung") {
    // return "#1FC48B";
    tabColor = {
      btnColor: "#27AE60",
      bgColor: "#C8F1D8",
    };
  }
  return tabColor;
}

export const getModuleName = (moduleId: string) => {
  const modules = useModulesStore.getState().modules;
  const moduleName =
    modules.find((module: Module) => module.id === moduleId)?.name || "";
  return moduleName;
};
