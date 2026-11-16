/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { ReactNode } from "react";

type TableHeaderProps = {
  children: ReactNode;
  gridClass: string;
  className?: string;
};

type TableRowProps = {
  children: ReactNode;
  gridClass: string;
  isExpanded?: boolean;
  onClick?: () => void;
  className?: string;
};

type TableCellProps = {
  children: ReactNode;
  className?: string;
};

// Header
export const TableHeader = ({
  children,
  gridClass,
  className = "",
}: TableHeaderProps) => {
  return (
    <div
      className={`${gridClass} grid shrink-0 items-center gap-2 rounded-md bg-[#FAFAFA] px-4 py-3 pr-[28px] text-center ${className}`}
    >
      {children}
    </div>
  );
};

// Row
export const TableRow = ({
  children,
  gridClass,
  isExpanded = false,
  onClick,
  className = "",
}: TableRowProps) => {
  return (
    <div
      className={`${gridClass} grid items-center gap-2 px-3 py-2 text-center ${
        onClick ? "cursor-pointer" : ""
      } ${
        isExpanded ? "bg-blue-50 text-blue-950" : "hover:bg-gray-50"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Cell
export const TableCell = ({ children, className = "" }: TableCellProps) => {
  return <div className={`min-w-0 ${className}`}>{children}</div>;
};
