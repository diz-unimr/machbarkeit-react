/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { toast } from "sonner";
import type { ReactNode } from "react";

export const toastSuccess = (
  title: string,
  description: string | ReactNode,
) => {
  toast.success(title, {
    description: description,
    duration: 4000,
  });
};

export const toastError = (title: string, description: string | ReactNode) => {
  toast.error(title, {
    description: description,
    duration: 4000,
  });
};
