/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import axios, { type AxiosResponse, AxiosError } from "axios";
import type { Module } from "../features/ontology/type";
import { getTabColor } from "../utils/utilities";
import { API_MODULES_URL } from "../constants/appConfig"
import lodash from "lodash";

export default async function getModules(): Promise<Module[] | null> {
	try {
		const apiResponse: AxiosResponse = (await axios.get(API_MODULES_URL))
		const response: Module[] = apiResponse.data.map((module: Module) => {
			const modules = lodash.mapKeys(module, (_, key) => lodash.camelCase(key))
			modules.color = getTabColor(modules.name)
			return modules
		})
		return response
	} catch (error) {
		console.log((error as AxiosError).message)
		alert((error as AxiosError).message)
		return null
	}
}