/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import type { FeasibilityQueryData } from "../feasibility/feasibility-builder/types";

export type QueryJobStatus = "pending" | "completed" | "error";

export type QueryJob = {
  id: string;
  date: string;
  query: FeasibilityQueryData;
  status: QueryJobStatus;
  result: number;
  duration: string;
};

export type SavedQuery = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  query: FeasibilityQueryData;
};

export type QueryReference =
  | {
      type: "queryJob";
      id: string;
      name?: string;
      query: FeasibilityQueryData;
    }
  | {
      type: "savedQuery";
      id: string;
      name?: string;
      query?: FeasibilityQueryData;
    }
  | {
      type: "draftQuery";
      id: string;
      name?: string;
      query?: FeasibilityQueryData;
    };
