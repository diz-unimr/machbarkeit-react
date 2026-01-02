/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button } from "./buttons/Button";

type PopupModalProps = {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function PopupModal({
  open,
  title = "Warnung",
  message,
  confirmLabel = "OK",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: PopupModalProps) {
  if (!open) return null;

  return (
    <div
      aria-modal
      role="dialog"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
    >
      <div className="bg-white rounded-lg px-7 py-6 min-w-[320px] max-w-[480px] shadow-[0_12px_32px_rgba(0,0,0,0.2)]">
        <h3 className="mb-3">{title}</h3>
        <p className="mb-5 leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-end">
          <Button
            type="secondary"
            id="cancel-btn"
            label={cancelLabel}
            onClick={onCancel}
          />
          <Button
            type="primary"
            id="confirm-btn"
            label={confirmLabel}
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
}
