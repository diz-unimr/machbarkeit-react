/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";

type FeasibilityQueryStore = {
  patientCount: number | null;
  errorMessageResult: string | null;
  isQueryRunning: boolean;
  setPatientCount: (queryResult: number | null) => void;
  setErrorMessageResult: (errorMessage: string | null) => void;
  startQueryRunning: () => void;
  stopQueryRunning: () => void;
};

const useFeasibilityQueryStore = create<FeasibilityQueryStore>((set) => ({
  patientCount: null,
  errorMessageResult: null,
  isQueryRunning: false,

  setPatientCount: (queryResult) => {
    set({ patientCount: queryResult });
  },

  setErrorMessageResult: (errorMessage) => {
    set({ errorMessageResult: errorMessage });
  },

  startQueryRunning: () => {
    set(() => ({ isQueryRunning: true }));
  },

  stopQueryRunning: () => {
    set(() => ({ isQueryRunning: false }));
  },
}));

export default useFeasibilityQueryStore;
