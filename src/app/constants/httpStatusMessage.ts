/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

export const httpStatusMessages: Record<number | string, string> = {
  200: "",
  400: "Bitte mindestens 2 Buchstaben eingeben",
  401: "Zugriff nicht erlaubt",
  404: "Nicht gefunden",
  500: "Interner Serverfehler",
  network: "Netzwerkfehler",
  canceled: "Die Anfrage wurde abgebrochen",
};
