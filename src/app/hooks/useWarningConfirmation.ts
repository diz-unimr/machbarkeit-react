/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import type { WarningConfig, WarningChoice } from "@components/modals/types";

type WarningModalState = WarningConfig & {
  open: boolean;
  resolver?: (choice: WarningChoice) => void;
};

export const useWarningConfirmation = () => {
  const [warningModal, setWarningModal] =
    useState<WarningModalState>({
      open: false,
      title: "",
      message: "",
      options: [],
    });

  const requestWarningConfirmation = (
    config: WarningConfig
  ): Promise<WarningChoice> => {
    return new Promise((resolve) => {
      setWarningModal({
        ...config,
        open: true,
        resolver: resolve,
      });
    });
  };

  const handleWarningChoice = (choice: WarningChoice) => {
    warningModal.resolver?.(choice);

    setWarningModal({
      open: false,
      title: "",
      message: "",
      options: [],
    });
  };

  return {
    warningModal,
    requestWarningConfirmation,
    handleWarningChoice,
  };
};