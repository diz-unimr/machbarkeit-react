/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

type CardProp = {
  header: string;
  children: React.ReactNode;
  className?: string;
};

export default function Card({ header, children, className }: CardProp) {
  return (
    <div
      className={`w-full flex flex-col
        relative 
        !border !border-[#9ea9b3]
        !rounded-[8px]
        shadow-[0_2px_4px_-1px_#0003,0_4px_5px_#00000024,0_1px_10px_#0000001f]
        ${className}`}
    >
      <div
        className="flex justify-center items-center
        h-[clamp(40px,10%,60px)]
        bg-[#5270a7]
        rounded-t-[6px]
        font-bold text-lg text-white"
      >
        {header}
      </div>
      <div className="flex flex-col w-full h-[90%] p-5">{children}</div>
    </div>
  );
}
