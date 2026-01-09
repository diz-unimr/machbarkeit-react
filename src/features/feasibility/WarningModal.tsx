/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button } from "@/components/ui/buttons/Button";
import PopupModal from "@/components/ui/PopupModal";
import type { SelectedChoice } from "./feasibility-builder/type";

type WarningModalProps = {
  open: boolean;
  hasAnyGlobalFilter: boolean;
  onClick: (choice: SelectedChoice) => void;
};

export default function WarningModal({
  open,
  hasAnyGlobalFilter,
  onClick,
}: WarningModalProps) {
  return (
    <PopupModal
      open={open}
      title="Global Filter Warning"
      message="Auf Filter in allen Elemente ersetzen"
    >
      <>
        <Button
          type="secondary"
          id="cancel-btn"
          label="Abbrechen"
          onClick={() => onClick("cancel")}
        />
        <Button
          type="primary"
          id="confirm-btn"
          label="Bestätigen"
          onClick={() => onClick("replace all")}
        />
        {hasAnyGlobalFilter ? (
          <Button
            type="primary"
            id="confirm-global-btn"
            label="Nur auf globalen Filter"
            onClick={() => onClick("replace global")}
          />
        ) : null}
      </>
    </PopupModal>
  );
}
