/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import axios, { type AxiosResponse, AxiosError } from "axios";
import type { Criterion } from "@app/types/ontologyType";
import {
  API_ONTOLOGY_URL,
  API_SEARCH_ONTOLOGY_URL,
} from "@app/constants/appConfig";
import transformObjectKeys from "@app/utils/transformObjectKeys";

/* function transformObjectKeys<T extends { children?: T[] }>(data: T[]): T[] {
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
} */

export async function getOntology(
  moduleId: string,
  /* searchText?: string = "", */
  signal?: AbortSignal
): Promise<[Criterion[] | null, number]> {
  let apiResponse: AxiosResponse;
  try {
    /* if (searchText.length > 0) {
      apiResponse = await axios.post(
        API_SEARCH_ONTOLOGY_URL,
        {
          module_id: moduleId,
          search_term: searchText,
          display: "tree",
        },
        {
          signal,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "max-age=3600",
          },
        }
      );
    } else {} */
    apiResponse = await axios.get(API_ONTOLOGY_URL + moduleId, {
      signal,
    });
    // Convert object keys to camelCase using lodash
    const response = transformObjectKeys(apiResponse.data) as Criterion[];
    return [response, apiResponse.status];
  } catch (error) {
    if ((error as AxiosError).code === "ERR_NETWORK") {
      alert("Network Error");
    }
    return [null, (error as AxiosError)?.status ?? 0]; // Return null and error status
  }
}

export async function getFlatOntology(
  moduleId: string,
  searchText: string,
  signal?: AbortSignal
): Promise<[Criterion[] | null, number]> {
  let apiResponse: AxiosResponse;
  try {
    apiResponse = await axios.post(
      API_SEARCH_ONTOLOGY_URL,
      {
        module_id: moduleId,
        search_term: searchText,
        display: "tree",
      },
      {
        signal,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "max-age=3600",
        },
      }
    );
    const response = transformObjectKeys(apiResponse.data) as Criterion[];
    return [response, apiResponse.status];
  } catch (error) {
    console.error("Error fetching flat ontology:", error);
    return [null, (error as AxiosError)?.status ?? 0]; // Return null and error status
  }
}
