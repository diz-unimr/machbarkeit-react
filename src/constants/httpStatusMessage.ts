/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

export const httpStatusMessages: Record<number | string, string> = {
  200: "OK",
  400: "Bad request",
  401: "Unauthorized",
  404: "Not found",
  500: "Server error",
  network: "Network error",
  canceled: "Request canceled",
};