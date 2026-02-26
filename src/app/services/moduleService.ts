/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import axios, { type AxiosResponse, AxiosError } from "axios";
import type { Module } from "@app/types/ontologyType";
import { getModuleColor } from "@app/utils/moduleUtils";
import lodash from "lodash";
import login from "@app/services/loginService.ts";

const getModules = async (): Promise<Module[] | null> => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_API_BASE}/mdr/ontology/modules`;
    const apiResponse: AxiosResponse = await axios.get(url, {
      withCredentials: true,
    });
    const modules: Module[] = apiResponse.data.map((m: Module) => {
      const module = lodash.mapKeys(m, (_, key) => lodash.camelCase(key));
      module.color = getModuleColor(module["fdpgCdsCode"] as string);
      return module;
    });
    return modules;
  } catch (error) {
    // todo: error handling
    await login();
    return null;
  }
};

export default getModules;
