/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import useModulesStore from "@app/store/modules-store";
import type { Criterion, Module } from "../types/ontologyType";

const setCriterionContext = (criterion: Criterion) => {
  const modules = useModulesStore.getState().modules;
  if (modules) {
    const module = modules.find(
      (module: Module) => module.id === criterion.moduleId
    );
    criterion.context = {
      code: module!.fdpgCdsCode || "",
      display: module!.name || "",
      system: module!.fdpgCdsSystem || "",
      version: module!.version || "",
    };
  }
  return criterion;
};

export default setCriterionContext;
