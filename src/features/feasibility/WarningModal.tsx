/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button } from "@/components/ui/buttons/Button";
import PopupModal from "@/components/ui/PopupModal";
import type { SelectedChoice } from "./feasibility-builder/type";

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
      label="Bestätigen"
      onClick={() => onClick("confirm")}
    />
  );
  const cancelBtn = (
    <Button
      type="secondary"
      id="cancel-btn"
      label="ABBRECHEN"
      onClick={() => onClick("cancel")}
    />
  );
  const deleteBtn = (
    <Button
      type="primary"
      id="delete-btn"
      label="LÖSCHEN"
      className="bg-red-800 text-white border-red-800 hover:bg-red-800"
      onClick={() => onClick("delete")}
    />
  );
  const replaceAllFilterBtn = (
    <Button
      type="primary"
      id="replace-all-filter-btn"
      label="Alle Filter ersetzen"
      className="normal-case"
      onClick={() => onClick("replace all")}
    />
  );
  const replaceGlobalFilterBtn = (
    <Button
      type="primary"
      id="replace-global-filter-btn"
      label="Nur globale Filter aktualisieren"
      className="normal-case"
      onClick={() => onClick("replace global")}
    />
  );

  let warningTitle;
  let warningText;
  let btnGroup;

  if (isDeleteAction) {
    warningTitle = "Globalen Filter löschen";
    warningText =
      "Sind Sie sicher, dass Sie den globalen Filter löschen möchten?";
    btnGroup = (
      <>
        {cancelBtn}
        {deleteBtn}
      </>
    );
  } else if (hasAnyLocalFilter) {
    warningTitle = "Globalen Filter anwenden";
    warningText = (
      <>
        Einige Kriterien verwenden derzeit lokale Filter. Möchten Sie nur
        bestehende globale Filter aktualisieren oder alle Filter ersetzen?
      </>
    );
    btnGroup = (
      <>
        {cancelBtn}
        {replaceGlobalFilterBtn}
        {replaceAllFilterBtn}
      </>
    );
  } else {
    warningTitle = "Globalen Filter anwenden";
    warningText =
      "Möchten Sie den neuen globalen Filter auf alle Kriterien anwenden?";
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
