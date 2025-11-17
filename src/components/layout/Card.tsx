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
      className={twMerge(`flex flex-col w-full
        relative 
        border-2 border-[var(--color-border)]
        rounded-md
        bg-white
        ${className}`)}
      style={{
        height: isExpanded ? `${scrollHeight}px` : height || undefined,
      }}
    >
      {/* header */}
      {header && (
        <div
          className={`flex justify-center items-center p-2 px-4
        h-[clamp(40px,10%,60px)]
        rounded-t-sm
        font-medium text-md text-[#5e5e5e]
        ${headerClassName}`}
        >
          {header}
        </div>
      )}
      {/* children */}
      <div
        className={twMerge(
          "flex flex-col w-full h-full py-5 px-6",
          bodyClassName
        )}
      >
        {extra}
        {children}
      </div>
    </div>
  );
}
