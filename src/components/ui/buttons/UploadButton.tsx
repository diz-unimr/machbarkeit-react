/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

type UploadButtonProp = {
  id: string;
  label: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const UploadButton = ({ id, label, onChange }: UploadButtonProp) => {
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
        className="min-h-[36px] px-[clamp(9px,1vw,12px)] py-[clamp(6px,1vw,8px)] text-[clamp(10px,1vw,12px)] rounded-md border-[1.5px] border-[#0072DA] font-bold text-center cursor-pointer hover:bg-[#0072DA] hover:text-white active:brightness-110"
      >
        {label}
      </label>
    </>
  );
};
export default UploadButton;
