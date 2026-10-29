/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { FeasibilityQueryData } from "../feasibility/feasibility-builder/type";

export type QueryJobStatus = "pending" | "running" | "completed" | "failed";

export type QueryJob = {
  id: string;
  userId: string;
  name: string;
  status: QueryJobStatus;
  createdAt: string;
  lastExecutedAt: string;
  resultCode: number;
  resultMessage: string | null;
  resultDuration: number | null;
  query: FeasibilityQueryData;
};

export type SavedQuery = {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  lastExecutedAt: string | null;
  lastResultMessage: string; /* on last execution */
  lastResultDuration: number;
  query: FeasibilityQueryData;
};
