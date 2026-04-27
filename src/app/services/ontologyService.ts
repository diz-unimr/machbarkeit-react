/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import axios, { type AxiosResponse, AxiosError } from "axios";
import type { Criterion } from "@app/types/ontologyType";
import transformObjectKeys from "@app/utils/transformObjectKeys";
import login from "@app/services/loginService.ts";

export const getConcept = async (id: string): Promise<Criterion | null> => {
  let response: AxiosResponse;
  const url = `${import.meta.env.VITE_BACKEND_API_BASE}/mdr/ontology/concepts/${id}`;

  try {
    response = await axios.get(url, {
      withCredentials: true,
    });
    const conceptResponse = transformObjectKeys([response.data]) as Criterion[];
    return conceptResponse[0];
  } catch (error) {
    // todo: error handling
    console.log(error);
    await login();
    return null;
  }
};

export const getOntology = async (
  moduleId: string,
  signal?: AbortSignal,
  // activeLabTab?: string,
): Promise<[Criterion[] | null, number]> => {
  let apiResponse: AxiosResponse;
  try {
    const url = `${import.meta.env.VITE_BACKEND_API_BASE}/mdr/ontology/tree/`;
    apiResponse = await axios.get(url + moduleId, {
      withCredentials: true,
      signal,
    });
    // Convert object keys to camelCase using lodash
    const response = transformObjectKeys(apiResponse.data) as Criterion[];

    return [response, apiResponse.status];
  } catch (error) {
    // todo: error handling
    console.log(error);
    await login();
    return [null, (error as AxiosError)?.status ?? 0]; // Return null and error status
  }
};

export const getFlatOntology = async (
  moduleId: string,
  searchText: string,
  signal?: AbortSignal,
): Promise<[Criterion[] | null, number]> => {
  let apiResponse: AxiosResponse;
  try {
    const url = `${import.meta.env.VITE_BACKEND_API_BASE}/mdr/ontology/concepts/search`;
    apiResponse = await axios.post(
      url,
      {
        module_id: moduleId,
        search_term: searchText,
        display: "tree",
      },
      {
        signal,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "max-age=3600",
        },
      },
    );
    const response = transformObjectKeys(apiResponse.data) as Criterion[];
    return [response, apiResponse.status];
  } catch (error) {
    console.error("Error fetching flat ontology:", error);
    return [null, (error as AxiosError)?.status ?? 0]; // Return null and error status
  }
};
