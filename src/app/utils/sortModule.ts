/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { Module } from "../types/ontologyType";

const MODULE_ORDER = ["Patient", "Diagnose", "Prozedur", "Laboruntersuchung"];

const sortModules = (modules: Module[]) => {
  return [...modules].sort(
    (a, b) => MODULE_ORDER.indexOf(a.name) - MODULE_ORDER.indexOf(b.name),
  );
};

export default sortModules;
