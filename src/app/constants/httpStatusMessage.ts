/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { QueryJobStatus } from "@/features/query-management/type";

export const httpStatusMessages: Record<number | string, string> = {
  200: "",
  400: "Bitte mindestens 2 Buchstaben eingeben",
  401: "Zugriff nicht erlaubt",
  404: "Nicht gefunden",
  500: "Interner Serverfehler",
  network: "Netzwerkfehler",
  canceled: "Die Anfrage wurde abgebrochen",
};

export const queryJobStatusMessages: Record<
  QueryJobStatus | "default",
  {
    label: string;
    className: string;
  }
> = {
  pending: {
    label: "Ausstehend",
    className: "text-yellow-400",
  },
  running: {
    label: "Wird ausgeführt",
    className: "text-blue-500",
  },
  completed: {
    label: "Abgeschlossen",
    className: "text-green-600",
  },
  failed: {
    label: "Fehlgeschlagen",
    className: "text-red-600",
  },
  default: {
    label: "Unbekannt",
    className: "text-gray-500",
  },
};
