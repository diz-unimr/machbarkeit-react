/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

type ButtonContainerType = {
  children?: React.ReactNode;
  className?: string;
  bgContainer?: string;
};

export default function ButtonContainer({
  children,
  className,
  bgContainer,
}: ButtonContainerType) {
  return (
    <div
      className={`flex items-center justify-end gap-2 ${className}`}
      style={{ backgroundColor: bgContainer }}
    >
      {children}
    </div>
  );
}
