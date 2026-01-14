/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button } from "@/components/ui/buttons/Button";
import PopupModal from "@/components/ui/PopupModal";
import InputTextField from "@components/ui/inputs/InputTextField";
import { useState } from "react";

type SaveQueryModalProps = {
  open: boolean;
  onSaveFile: (fileName: string) => void;
  onCancel: () => void;
};

const SaveQueryModal = ({
  open,
  onSaveFile,
  onCancel,
}: SaveQueryModalProps) => {
  const [saveFileName, setSaveFileName] = useState<string>("");
  return (
    <PopupModal open={open} title="Abspeichern der aktuellen Suchanfrage">
      <div className="flex flex-col w-full gap-3">
        <InputTextField
          id="save-query-name"
          label="Dateiname"
          type="text"
          value={saveFileName}
          onChange={setSaveFileName}
          onClearText={() => setSaveFileName("")}
        />
        <div className="flex gap-3 justify-end">
          <Button
            id="cancel-save-btn"
            label="ABBRECHEN"
            type="secondary"
            onClick={() => {
              onCancel();
              setSaveFileName("");
            }}
          />
          <Button
            isActive={saveFileName.length > 0}
            id="confirm-save-btn"
            label="speichern"
            type="primary"
            onClick={() => {
              onSaveFile(saveFileName);
              setSaveFileName("");
            }}
          />
        </div>
      </div>
    </PopupModal>
  );
};

export default SaveQueryModal;
