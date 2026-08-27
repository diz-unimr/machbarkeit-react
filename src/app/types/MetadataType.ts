/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

type KDSModuleName =
  | "Person"
  | "Fall"
  | "Diagnose"
  | "Prozedur"
  | "Laboruntersuchung";

export type Metadata = {
  kdsModule: KDSModuleName;
  attributeName: string;
  attributeDescription: string;
  attributeExample: string;
  isAvailableInDiz: boolean;
  isAvailableInVna: boolean;
  availableSince: string;
  defaultAttribute?: boolean;
  additionalInformation?: string;
};
