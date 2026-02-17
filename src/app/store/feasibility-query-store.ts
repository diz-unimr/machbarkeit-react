/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
    SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";

type FeasibilityQueryStore = {
  isQueryRunning: boolean;
  startQueryRunning: () => void;
  stopQueryRunning: () => void;
};

const useFeasibilityQueryStore = create<FeasibilityQueryStore>((set) => ({
  isQueryRunning: false,

  startQueryRunning: () => {
    set(() => ({ isQueryRunning: true }));
  },
  stopQueryRunning: () => {
    set(() => ({ isQueryRunning: false }));
  },
}));

export default useFeasibilityQueryStore;
