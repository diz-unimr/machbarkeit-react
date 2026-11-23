/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { QueryJobStatus } from "@/features/query-management/types";

export const httpStatusMessages = {
  200: "",
  400: "Bitte mindestens 2 Buchstaben eingeben",
  401: "Zugriff nicht erlaubt",
  404: "Nicht gefunden",
  500: "Interner Serverfehler",
  network: "Netzwerkfehler",
  canceled: "Die Anfrage wurde abgebrochen",
} as const;

export const queryJobStatusMessages: Record<
  QueryJobStatus | "default",
  {
    label: string;
    borderColor: string;
    bgColor: string;
    textColor: string;
  }
> = {
  pending: {
    label: "Ausstehend",
    borderColor: "border-yellow-200",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
  },
  completed: {
    label: "Abgeschlossen",
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  error: {
    label: "Fehlgeschlagen",
    borderColor: "border-red-200",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
  },
  default: {
    label: "Unbekannt",
    borderColor: "border-gray-200",
    bgColor: "bg-gray-50",
    textColor: "text-gray-700",
  },
};
