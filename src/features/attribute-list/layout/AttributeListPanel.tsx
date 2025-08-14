/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

type Prop = {
  header: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
};

export default function AttributeListPanel({ header, extra, children }: Prop) {
  return (
    <div className="flex flex-row flex-wrap w-full h-full">
      <div className="relative w-full !border !border-[#9ea9b3] !rounded-md shadow-[0_2px_4px_-1px_#0003,0_4px_5px_#00000024,0_1px_10px_#0000001f]">
        <div className="h-[clamp(45px,10%,60px)] flex justify-center items-center bg-[#5270a7] font-bold text-lg text-white">
          {header}
        </div>
        <div className="w-full h-[90%] gap-5 flex flex-col p-5">
          {extra}
          <div className="flex flex-col gap-2.5 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
