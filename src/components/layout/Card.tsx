/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useRef, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CardProp = {
  header?: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  isExpanded?: boolean;
  height?: string;
  extra?: ReactNode;
  children: ReactNode;
};

export default function Card({
  header,
  className,
  headerClassName,
  bodyClassName,
  isExpanded,
  height,
  extra,
  children,
}: CardProp) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollHeight = (ref.current?.scrollHeight || 0) + 20;

  return (
    <div
      ref={ref}
      className={`flex flex-col
        relative 
        border border-gray-400
        rounded-md
        shadow-[0_2px_4px_-1px_#0003,0_4px_5px_#00000024,0_1px_10px_#0000001f]
        bg-white
        ${className}`}
      style={{
        height: isExpanded ? `${scrollHeight}px` : height || undefined,
      }}
    >
      {/* header */}
      {header && (
        <div
          className={`flex justify-center items-center p-2 px-4
        h-[clamp(40px,10%,60px)]
        bg-[#5270a7]
        rounded-t-sm
        font-medium text-md text-white
        ${headerClassName}`}
        >
          {header}
        </div>
      )}
      {/* children */}
      <div
        /* w-auto h-[90%] */
        className={twMerge(
          "flex flex-col w-full h-full px-6 py-5",
          bodyClassName
        )}
      >
        {extra}
        {children}
      </div>
    </div>
  );
}
