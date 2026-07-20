/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect } from "react";
import useQueryManagementStore from "@app/store/query-management-store";
import { getQueryJobs, getSavedQueries } from "@/app/services/query-service";

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

      if (queryJobs) {
        setQueryJobs(queryJobs);
      }

      if (savedQueries) {
        setSavedQueries(savedQueries);
      }
    };

    fetchQueries();
  }, [setQueryJobs, setSavedQueries]);

  return {
    queryJobs,
    savedQueries,
  };
};

export default useQueries;
