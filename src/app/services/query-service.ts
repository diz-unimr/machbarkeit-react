/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import Papa from "papaparse";
import type { QueryJob, SavedQuery } from "@/features/query-management/type";

const CSVReader = <T>(fileName: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<T>(fileName, {
      download: true,
      header: true,

      complete: (results) => {
        resolve(results.data);
      },

      error: (error) => {
        reject(error);
      },
    });
  });
};

export const getSavedQueries = async (): Promise<SavedQuery[]> => {
  const results = await CSVReader<SavedQuery>("src/assets/query_jobs.csv");
  return results;
};

export const getQueryJobs = async (): Promise<QueryJob[]> => {
  const results = await CSVReader<QueryJob>("src/assets/query_jobs.csv");
  return results;
};
