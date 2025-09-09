/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

type UploadButtonProp = {
  id: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function UploadButton({
  id,
  label,
  onChange,
}: UploadButtonProp) {
  return (
    <>
      <input
        id={id}
        type="file"
        accept="application/json"
        hidden
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="min-h-[36px] px-[10px] py-[6px] rounded-md border border-[#0072DA] font-bold text-sm text-center cursor-pointer hover:bg-[#0072DA] hover:text-white active:brightness-110"
      >
        {label}
      </label>
    </>
  );
}
