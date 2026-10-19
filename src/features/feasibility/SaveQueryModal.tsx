/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button } from "@/components/ui/buttons/Button";
import PopupModal from "@/components/ui/PopupModal";
import InputTextField from "@components/ui/inputs/InputTextField";
import {
  titleTexts,
  buttonLabels,
  placeholderTexts,
} from "@/app/constants/uiTexts";
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
    <PopupModal open={open} title={titleTexts.saveQuery}>
      <div className="flex flex-col w-full gap-3">
        <InputTextField
          id="save-query-name"
          label={placeholderTexts.fileName}
          type="text"
          value={saveFileName}
          onChange={setSaveFileName}
          onClearText={() => setSaveFileName("")}
        />
        <div className="flex gap-3 justify-end">
          <Button
            id="cancel-save-btn"
            label={buttonLabels.cancel.toLocaleUpperCase("de-DE")}
            type="secondary"
            onClick={() => {
              onCancel();
              setSaveFileName("");
            }}
          />
          <Button
            isActive={saveFileName.length > 0}
            id="confirm-save-btn"
            label={buttonLabels.save.toLocaleUpperCase("de-DE")}
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
