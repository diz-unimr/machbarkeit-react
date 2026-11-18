/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect } from "react";
import useQueryManagementStore from "@app/store/query-management-store";
import {
  getQueryJobs,
  getSavedQueries,
} from "@app/services/query-management-service";

const useQueries = () => {
  const queryJobs = useQueryManagementStore((s) => s.queryJobs);
  const savedQueries = useQueryManagementStore((s) => s.savedQueries);

  const setQueryJobs = useQueryManagementStore((s) => s.setQueryJobs);
  const setSavedQueries = useQueryManagementStore((s) => s.setSavedQueries);

  useEffect(() => {
    const fetchQueries = async () => {
      const [queryJobs, savedQueries] = await Promise.all([
        getQueryJobs(),
        getSavedQueries(),
      ]);

      if (queryJobs[0]) {
        setQueryJobs(queryJobs[0]);
      }

      if (savedQueries) {
        setSavedQueries(savedQueries);
      }
    };

    fetchQueries();
  }, [setQueryJobs, setSavedQueries]);

  useEffect(() => {
    const hasRunningQuery = queryJobs.some(
      (query) => query.status === "pending",
    );

    if (!hasRunningQuery) return;

    const intervalId = setInterval(async () => {
      const [jobs] = await getQueryJobs();

      if (jobs) {
        setQueryJobs(jobs);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [queryJobs, setQueryJobs]);

  return {
    queryJobs,
    savedQueries,
  };
};

export default useQueries;
