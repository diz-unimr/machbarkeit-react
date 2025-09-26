/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

type TextFloatingProps = {
  id?: string;
  label: string;
};
export default function TextFloating({ id, label }: TextFloatingProps) {
  return (
    <label
      htmlFor={id}
      className="flex absolute left-0 -top-[20%] ml-4 px-1 bg-white text-[12px] cursor-none"
    >
      {label}
    </label>
  );
}
