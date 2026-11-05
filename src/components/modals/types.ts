/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { ReactNode } from "react";

export type WarningChoice =
  | "cancel"
  | "confirm"
  | "delete"
  | "replace global"
  | "replace all";

export type WarningOption = {
  value: WarningChoice;
  label: string;
  variant?: "primary" | "danger" | "secondary";
};

export type WarningConfig = {
  title: string;
  message: ReactNode;
  options: WarningChoice[];
};

export type WarningModalState = {
  open: boolean;
  title?: string;
  message?: string;
  options?: WarningOption[];
  resolver?: (choice: WarningChoice) => void;
};
