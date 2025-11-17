/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import axios, { type AxiosResponse, AxiosError } from "axios";
import type { Module } from "@app/types/ontology";
import { getTabColor } from "@app/utils/utilities";
import { API_MODULES_URL } from "@app/constants/appConfig";
import lodash from "lodash";

export default async function getModules(): Promise<Module[] | null> {
  try {
    const apiResponse: AxiosResponse = await axios.get(API_MODULES_URL);
    const modules: Module[] = apiResponse.data.map((m: Module) => {
      const module = lodash.mapKeys(m, (_, key) => lodash.camelCase(key));
      module.color = getTabColor(m.name);
      return module;
    });
    return modules;
  } catch (error) {
    console.log((error as AxiosError).message);
    alert((error as AxiosError).message);
    return null;
  }
}

/* 
	[User clicks "Load Merkmale"]
			↓
	Component → useMerkmale() (hook)  add cleaned data into store
			↓
	useMerkmale → getMerkmale() (service)  cleaning data
			↓
	getMerkmale → /api/merkmale (API)
			↓
	Backend → Database → returns JSON
			↓
	Service clean data → store → UI render
*/
