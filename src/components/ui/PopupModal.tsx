/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { ReactNode } from "react";
import Card from "./Card";

type PopupModalProps = {
  open: boolean;
  title?: string;
  message?: string | ReactNode;
  children: ReactNode;
};

const PopupModal = ({
  open,
  title = "Warnung",
  message,
  children,
}: PopupModalProps) => {
  if (!open) return null;

  return (
    <div className="flex fixed inset-0 bg-black/50 items-center justify-center z-9999">
      <Card
        header={title}
        headerClassName="text-2xl"
        className={`flex max-w-fit`}
      >
        <p className="mb-5 leading-relaxed">{message}</p>
        <div className="flex gap-3 justify-center">{children}</div>
      </Card>
    </div>
  );
};
export default PopupModal;
