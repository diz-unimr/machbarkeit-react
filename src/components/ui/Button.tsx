/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

type ButtonProp = {
  id: string;
  label: string;
};

export default function Button({ id, label }: ButtonProp) {
  return (
    <button
      id={id}
      className="w-fit min-h-[40px] font-bold pl-[8px] pr-[8px] m-1 rounded-lg !bg-[#e5eff5]"
    >
      {label}
    </button>
  );
}
