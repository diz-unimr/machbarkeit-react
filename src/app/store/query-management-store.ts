/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import type { QueryJob, SavedQuery } from "@/features/query-management/type";

type QueryManagementStore = {
  queryJobs: QueryJob[];
  savedQueries: SavedQuery[];
  setQueryJobs: (queryJobs: QueryJob[]) => void;
  setSavedQueries: (savedQueries: SavedQuery[]) => void;
  addQueryJob: (queryJob: QueryJob) => void;
  addSavedQuery: (savedQuery: SavedQuery) => void;
  updateQueryJob: (updatedQuery: QueryJob) => void;
  updateSavedQuery: (updatedQuery: SavedQuery) => void;
};

const useQueryManagementStore = create<QueryManagementStore>((set) => ({
  queryJobs: [],
  savedQueries: [],

  setQueryJobs: (queryJobs) => set({ queryJobs }),
  setSavedQueries: (savedQueries) => set({ savedQueries }),

  addQueryJob: (queryJob) =>
    set((state) => ({ queryJobs: [...state.queryJobs, queryJob] })),
  addSavedQuery: (savedQuery) =>
    set((state) => ({ savedQueries: [...state.savedQueries, savedQuery] })),

  updateQueryJob: (updatedQuery) =>
    set((state) => ({
      queryJobs: state.queryJobs.map((q) =>
        q.id === updatedQuery.id ? updatedQuery : q,
      ),
    })),
  updateSavedQuery: (updatedQuery) =>
    set((state) => ({
      savedQueries: state.savedQueries.map((q) =>
        q.id === updatedQuery.id ? updatedQuery : q,
      ),
    })),
}));

export default useQueryManagementStore;
