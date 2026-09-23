/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button } from "@/components/ui/buttons/Button";
import PopupModal from "@/components/ui/PopupModal";
import type { SelectedChoice } from "./feasibility-builder/type";
import {
  buttonLabels,
  titleTexts,
  confirmationMessages,
} from "@/app/constants/uiTexts";

type WarningModalProps = {
  open: boolean;
  hasAnyLocalFilter: boolean;
  isDeleteAction?: boolean;
  minWidth?: string;
  minHeight?: string;
  onClick: (choice: SelectedChoice) => void;
};

const WarningModal = ({
  open,
  hasAnyLocalFilter,
  isDeleteAction,
  onClick,
}: WarningModalProps) => {
  const confirmBtn = (
    <Button
      type="primary"
      id="confirm-btn"
      label={buttonLabels.confirm}
      onClick={() => onClick("confirm")}
    />
  );
  const cancelBtn = (
    <Button
      type="secondary"
      id="cancel-btn"
      label={buttonLabels.cancel.toLocaleUpperCase("de-DE")}
      onClick={() => onClick("cancel")}
    />
  );
  const deleteBtn = (
    <Button
      type="primary"
      id="delete-btn"
      label={buttonLabels.delete.toLocaleUpperCase("de-DE")}
      className="bg-red-800 text-white border-red-800 hover:bg-red-800"
      onClick={() => onClick("delete")}
    />
  );
  const replaceAllFilterBtn = (
    <Button
      type="primary"
      id="replace-all-filter-btn"
      label={buttonLabels.replaceAllFilters}
      className="normal-case"
      onClick={() => onClick("replace all")}
    />
  );
  const updateGlobalFilterBtn = (
    <Button
      type="primary"
      id="replace-global-filter-btn"
      label={buttonLabels.updateGlobalFilter}
      className="normal-case"
      onClick={() => onClick("replace global")}
    />
  );

  let warningTitle;
  let warningText;
  let btnGroup;

  if (isDeleteAction) {
    warningTitle = titleTexts.deleteGlobalFilter;
    warningText = confirmationMessages.deleteGlobalFilter;
    btnGroup = (
      <>
        {cancelBtn}
        {deleteBtn}
      </>
    );
  } else if (hasAnyLocalFilter) {
    warningTitle = titleTexts.applyGlobalFilter;
    warningText = <>{confirmationMessages.updateOrReplaceFilters}</>;
    btnGroup = (
      <>
        {cancelBtn}
        {updateGlobalFilterBtn}
        {replaceAllFilterBtn}
      </>
    );
  } else {
    warningTitle = titleTexts.applyGlobalFilter;
    warningText = confirmationMessages.applyGlobalFilterToAll;
    btnGroup = (
      <>
        {cancelBtn}
        {confirmBtn}
      </>
    );
  }

  return (
    <PopupModal open={open} title={warningTitle} message={warningText}>
      {btnGroup}
    </PopupModal>
  );
};

export default WarningModal;
