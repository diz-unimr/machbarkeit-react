/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import axios, { AxiosError } from "axios";
import type { QueryJob, SavedQuery } from "@/features/query-management/types";

export const getQueryJobs = async (): Promise<
  [QueryJob[] | null, string | null]
> => {
  let queryJobs: QueryJob[] | null = null;
  let errorMessage: string | null = null;

  try {
    const response = await axios.get(
      import.meta.env.VITE_BACKEND_API_BASE + "/feasibility/request",
      {
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      queryJobs = response.data;
    }
  } catch (error) {
    if ((error as AxiosError).response) {
      errorMessage = ((error as AxiosError).response!.data as { error: string })
        .error;
      errorMessage = error ? "Found some error!" : null;
    }
  }
  return [queryJobs, errorMessage];
};

export const getSavedQueries = async (): Promise<SavedQuery[] | null> => {
  const results = null;
  return results;
};

export const deleteSavedQuery = async (
  id: string,
): Promise<[boolean, string | null]> => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_API_BASE}/feasibility/request/${id}`,
      {
        withCredentials: true,
      },
    );

    return [true, null];
  } catch (error) {
    const axiosError = error as AxiosError<{ error?: string }>;

    return [
      false,
      axiosError.response?.data?.error ??
        axiosError.message ??
        "Failed to delete saved query.",
    ];
  }
};
