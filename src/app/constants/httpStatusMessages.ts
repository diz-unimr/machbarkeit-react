/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { QueryJobStatus } from "@/features/query-management/type";

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
    className: string;
  }
> = {
  pending: {
    label: "Ausstehend",
    className: "border-yellow-200 bg-yellow-50 text-yellow-700",
  },
  running: {
    label: "Wird ausgeführt",
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
  completed: {
    label: "Abgeschlossen",
    className: "border-green-200 bg-green-50 text-green-700",
  },
  failed: {
    label: "Fehlgeschlagen",
    className: "border-red-200 bg-red-50 text-red-700",
  },
  default: {
    label: "Unbekannt",
    className: "border-gray-200 bg-gray-50 text-gray-500",
  },
};
