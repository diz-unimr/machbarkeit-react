/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { ReactNode } from "react";
import Card from "./Card";

type PopupModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  children: ReactNode;
};

export default function PopupModal({
  open,
  title = "Warnung",
  message,
  children,
}: PopupModalProps) {
  if (!open) return null;

  return (
    <div className="flex fixed inset-0 bg-black/50 items-center justify-center z-[9999]">
      <Card header={title} headerClassName="text-2xl" className="flex w-fit">
        <p className="mb-5 leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-center">
          {children}
          {/* <Button
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
          {extraButtons
            ? extraButtons.map((btn) => (
                <Button
                  type={btn.btnType}
                  id={btn.id}
                  label={btn.label}
                  onClick={btn.onClick}
                />
              ))
            : null} */}
        </div>
      </Card>
    </div>
    /* <div
      aria-modal
      role="dialog"
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
    >
      <div className="bg-white rounded-lg px-7 py-6 min-w-[320px] shadow-[0_12px_32px_rgba(0,0,0,0.2)]">
        <p className="ml-2 mb-3 text-2xl font-medium">{title}</p>
        <p className="ml-2 mb-5 leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-end">
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
              id="confirm-btn"
              label="Nur auf globalen Filter"
              onClick={() => onClick("replace global")}
            />
          ) : null}
        </div>
      </div>
    </div> */
  );
}
