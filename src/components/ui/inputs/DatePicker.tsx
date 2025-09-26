/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import TextFloating from "./TextFloating";

type DatePickerProps = {
  id?: string;
  label: string;
};
export default function DatePicker({ id, label }: DatePickerProps) {
  return (
    <div className="flex relative">
      <input
        id={id}
        type="date"
        aria-label="date"
        className="w-[140px] h-[42px] m-[3px] px-3 border border-[#808080] rounded-md text-[15px]"
      />
      <TextFloating id={id} label={label} />
    </div>
  );
}
