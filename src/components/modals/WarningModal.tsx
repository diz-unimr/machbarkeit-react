/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button } from "@components/buttons/Button";
import PopupModal from "./PopupModal";
import type { WarningChoice, WarningConfig } from "@/components/modals/types";
import { buttonLabels } from "@/app/constants/uiTexts";
import { Fragment } from "react";

type WarningModalProps = WarningConfig & {
  open: boolean;
  onClick: (choice: WarningChoice) => void;
};

export const WarningModal = ({
  open,
  title,
  message,
  options,
  onClick,
}: WarningModalProps) => {
  const buttons: Record<WarningChoice, React.ReactNode> = {
    cancel: (
      <Button
        id="cancel-btn"
        type="secondary"
        label={buttonLabels.cancel.toLocaleUpperCase("de-DE")}
        onClick={() => onClick("cancel")}
      />
    ),
    confirm: (
      <Button
        id="confirm-btn"
        type="primary"
        label={buttonLabels.confirm.toLocaleUpperCase("de-DE")}
        onClick={() => onClick("confirm")}
      />
    ),
    delete: (
      <Button
        id="delete-btn"
        type="primary"
        label={buttonLabels.delete.toLocaleUpperCase("de-DE")}
        className="bg-red-800 text-white border-red-800 hover:bg-red-800"
        onClick={() => onClick("delete")}
      />
    ),
    "replace global": (
      <Button
        id="replace-global-filter-btn"
        type="primary"
        label={buttonLabels.updateGlobalFilter.toLocaleUpperCase("de-DE")}
        className="normal-case"
        onClick={() => onClick("replace global")}
      />
    ),
    "replace all": (
      <Button
        id="replace-all-filter-btn"
        type="primary"
        label={buttonLabels.replaceAllFilters.toLocaleUpperCase("de-DE")}
        className="normal-case"
        onClick={() => onClick("replace all")}
      />
    ),
  };

  return (
    <PopupModal open={open} title={title} message={message}>
      {options.map((option) => (
        <Fragment key={option}>{buttons[option]}</Fragment>
      ))}
    </PopupModal>
  );
};
