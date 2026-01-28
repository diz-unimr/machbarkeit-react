/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import axios, { AxiosError, type AxiosResponse } from "axios";
import type { FeasibilityQueryData } from "@features/feasibility/feasibility-builder/type";

const feasibilityQuery = async (
  data: FeasibilityQueryData,
  abortController: AbortController,
): Promise<[number | null, string | null]> => {
  let numberOfPatients: number | null = null;
  let errorMessage: string | null = null;

  try {
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_API_BASE + "/feasibility/request",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortController.signal,
        withCredentials: true,
      },
    );

    // check if accepted
    if (response.status === 202) {
      // check location header
      const poll = response.headers.location;
      numberOfPatients = await new Promise((resolve, reject) => {
        const intervalId = setInterval(async () => {
          try {
            // poll result url
            const r: AxiosResponse = await axios.get(poll, {
              signal: abortController.signal,
              withCredentials: true,
              validateStatus(status) {
                return status < 400 || status === 404;
              },
            });
            // 404 => not yet ready
            if (r.status === 200) {
              clearInterval(intervalId);
              // result: parse response
              if (r && String(r.data)) {
                resolve(r.data);
              }
            }
          } catch (error) {
            clearInterval(intervalId);
            reject(error);
          }
        }, 1000);
      });
    }
  } catch (error) {
    if (
      (error as AxiosError).name === "CanceledError" ||
      (error as AxiosError).message === "canceled"
    ) {
      console.log("Request was canceled by user");
    } else if ((error as AxiosError).response) {
      errorMessage = ((error as AxiosError).response!.data as { error: string })
        .error;
      errorMessage = error ? "Found some error!" : null;
    }
  }
  return [numberOfPatients, errorMessage];
};

export default feasibilityQuery;
