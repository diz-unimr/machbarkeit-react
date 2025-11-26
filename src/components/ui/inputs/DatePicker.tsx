/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import TextFloating from "@components/ui/inputs/TextFloating";

type DatePickerProps = {
  id?: string;
  label: string;
  value: string;
  onChange: (date: string) => void;
};
export default function DatePicker({
  id,
  label,
  value,
  onChange,
}: DatePickerProps) {
  return (
    <div className="flex relative">
      <input
        id={id}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type="date"
        aria-label="date"
        className="m-[3px] px-3 border rounded-md"
      />
      <TextFloating id={id} label={label} />
    </div>
  );
}
