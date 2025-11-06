/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import lodash from "lodash";
import { useModulesStore } from "../store/modules-store";
import type { Module } from "../features/ontology/type";

export function getTabColor(moduleName: string): string {
  if (moduleName === "Person") {
    return "#3498DB";
  } else if (moduleName === "Diagnose") {
    return "#9B59B6";
  } else if (moduleName === "Prozedur") {
    return "#FBB016";
  } else if (moduleName === "Laboruntersuchung") {
    return "#1FC48B";
  } else return "default";
}

export function transformObjectKeys<T extends { children?: T[] }>(
  data: T[]
): T[] {
  const response: T[] = data.map((obj: T) => {
    const transformedObj = lodash.mapKeys(obj, (_, key) =>
      lodash.camelCase(key)
    ) as unknown as T;
    if ("children" in transformedObj && transformedObj.children!.length > 0) {
      transformedObj.children = transformObjectKeys(
        transformedObj.children!
      ) as T[];
    }
    return transformedObj;
  });
  return response;
}

export const getModuleName = (moduleId: string) => {
    const modules = useModulesStore.getState().modules;
    const moduleName =
      modules.find((module: Module) => module.id === moduleId)?.name || "";
    return moduleName;
  };
