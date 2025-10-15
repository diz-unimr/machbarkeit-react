/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import axios, { type AxiosResponse, AxiosError } from "axios";
import type { Criterion } from "../features/ontology/type";
import { API_ONTOLOGY_URL, API_SEARCH_ONTOLOGY_URL } from "../constants/appConfig";
import { transformObjectKeys } from "../utils/utilities";

let controller: AbortController | null = null

export async function setAbortController(): Promise<void> {
	// if there is an existing abortController, abort the previous request
	if (controller) {
		controller.abort()
		controller = null
		await Promise.resolve()
	}
}

export async function fetchOntology(moduleId: string, searchText: string = ''): Promise<[Criterion[] | null, string]> {
	controller = new AbortController()
	let apiResponse: AxiosResponse
	try {
		if (searchText.length > 0) {
			apiResponse = await axios.post(API_SEARCH_ONTOLOGY_URL,
				{
					module_id: moduleId,
					search_term: searchText,
					display: 'tree',
				},
				{
					signal: controller.signal, // Attach the cancel token to the request
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
		} else {
			apiResponse = await axios.get(API_ONTOLOGY_URL + moduleId,
				{ signal: controller.signal })
		}
		// Convert object keys to camelCase using lodash
		const response = transformObjectKeys(apiResponse.data) as Criterion[]
		return [response, apiResponse.statusText]
	} catch (error) {
		if ((error as AxiosError).name === 'CanceledError' || (error as AxiosError).message === 'canceled') {
			return [null, (error as AxiosError).message] // Re-fetch the ontology data if the request was canceled
		}
		if ((error as AxiosError).code === 'ERR_NETWORK') {
			alert('Network Error')
		}
		return [null, (error as AxiosError)?.message] // Return null and error status
	} finally {
		controller = null
	}
}
