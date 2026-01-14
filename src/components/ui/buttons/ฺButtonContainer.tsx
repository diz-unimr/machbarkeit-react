/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { twMerge } from "tailwind-merge";

type ButtonContainerType = {
  children?: React.ReactNode;
  className?: string;
  bgContainer?: string;
};

const ButtonContainer = ({
  children,
  className,
  bgContainer,
}: ButtonContainerType) => {
  return (
    <div
      className={twMerge(
        `flex w-full h-fit items-center justify-end gap-2 p-[clamp(6px,1vw,14px)] ${className}`
      )}
      style={{ backgroundColor: bgContainer }}
    >
      {children}
    </div>
  );
};
export default ButtonContainer;
