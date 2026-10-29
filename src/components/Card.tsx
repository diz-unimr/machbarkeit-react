/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useRef, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";

type CardProp = {
  header?: ReactNode;
  subHeader?: string;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  isExpanded?: boolean;
  onClose?: () => void;
  height?: string;
  extra?: ReactNode;
  children: ReactNode;
};

const Card = ({
  header,
  subHeader,
  className,
  headerClassName,
  bodyClassName,
  isExpanded,
  onClose,
  height,
  extra,
  children,
}: CardProp) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollHeight = (ref.current?.scrollHeight || 0) + 20;
  return (
    <div
      ref={ref}
      className={twMerge(`flex flex-col w-full p-5
        relative 
        border-2 border-(--color-border)
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
          className={twMerge(
            "flex shrink-0 items-start justify-between gap-4",
            "rounded-t-sm border-b border-gray-300 pb-4",
            headerClassName,
          )}
        >
          <div className="min-w-0">
            <h2 className="text-2xl font-medium text-black">{header}</h2>

            {subHeader && (
              <p className="mt-1 text-sm font-normal text-gray-500">
                {subHeader}
              </p>
            )}
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Abfrageverwaltung schließen"
              title="Schließen"
              className="shrink-0 rounded-lg p-2 text-gray-500
                   transition hover:bg-gray-100 hover:text-gray-900
                   focus-visible:outline-2 focus-visible:outline-blue-500"
            >
              <X size={22} />
            </button>
          )}
        </div>
      )}

      {/* children */}
      <div className={twMerge("flex flex-col w-full h-full", bodyClassName)}>
        {extra}
        {children}
      </div>
    </div>
  );
};

export default Card;

/* {header && (
        <div
          className={`flex shrink-0 item-center justify-between py-2 
        h-[clamp(40px,10%,60px)]
        rounded-t-sm
        font-medium text-[#5e5e5e]
        ${headerClassName}`}
        >
          {header}
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Abfrageverwaltung schließen"
              title="Schließen"
              className="rounded-lg p-2 text-gray-500
                     transition hover:bg-gray-100 hover:text-gray-900
                     focus-visible:outline-2 focus-visible:outline-blue-500"
            >
              <X size={22} />
            </button>
          ) : null}
        </div>
      )} */
