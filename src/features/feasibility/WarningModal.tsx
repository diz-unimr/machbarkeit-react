/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button } from "@/components/ui/buttons/Button";
import PopupModal from "@/components/ui/PopupModal";
import type { SelectedChoice } from "./feasibility-builder/type";

type WarningModalProps = {
  open: boolean;
  hasAnyGlobalFilter: boolean;
  hasGlobalFilterDeleteAction?: boolean;
  onClick: (choice: SelectedChoice) => void;
};

const WarningModal = ({
  open,
  hasAnyGlobalFilter,
  hasGlobalFilterDeleteAction,
  onClick,
}: WarningModalProps) => {
  console.log(hasGlobalFilterDeleteAction);
  return (
    <PopupModal
      open={open}
      title="Global Filter Warning"
      message={
        hasGlobalFilterDeleteAction
          ? "Sind Sie sicher, dass Sie den globalen Filter löschen möchten?"
          : "Auf Filter in allen Elemente ersetzen"
      }
    >
      <Button
        type="secondary"
        id="cancel-btn"
        label="ABBRECHEN"
        onClick={() => onClick("cancel")}
      />

      <Button
        type="primary"
        id="confirm-btn"
        label="Bestätigen"
        onClick={() =>
          onClick(hasGlobalFilterDeleteAction ? "confirm" : "replace all")
        }
      />

      {hasAnyGlobalFilter && !hasGlobalFilterDeleteAction && (
        <Button
          type="primary"
          id="confirm-global-btn"
          label="Nur auf globalen Filter"
          onClick={() => onClick("replace global")}
        />
      )}
    </PopupModal>
  );
};

export default WarningModal;
