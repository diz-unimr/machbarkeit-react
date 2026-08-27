/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

type KDSModuleName = "Person" | "Diagnose" | "Prozedur" | "Laboruntersuchung";

export type Metadata = {
  kdsModule: KDSModuleName;
  attributeName: string;
  attributeDescription: string;
  attributeExample: string;
  isAvailableInVna: boolean;
  isAvailableInDiz: boolean;
  availableSince: string;
};
