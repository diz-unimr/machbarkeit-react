/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { twMerge } from "tailwind-merge";

type ButtonProp = {
  id: string;
  bgColor?: string;
  label?: string;
  className?: string;
  isActive?: boolean;
  onClick?: (id: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  // style?: React.CSSProperties;
};

function Button({
  id,
  label,
  className,
  bgColor,
  isActive = true,
  onClick,
}: ButtonProp) {
  const buttonClass = twMerge(
    "font-bold text-sm text-white bg-[var(--btn-bg)]",
    className
  );
  return (
    <button
      id={id}
      className={buttonClass}
      style={
        {
          "--btn-bg": bgColor || "#0072DA",
        } as React.CSSProperties
      }
      disabled={!isActive}
      onClick={() => onClick?.(id)}
    >
      {label}
    </button>
  );
}

export function PrimaryButton({
  className,
  isActive = true,
  ...props
}: ButtonProp) {
  return (
    <Button
      className={`
        ${
          !isActive
            ? "!cursor-default opacity-50"
            : "cursor-auto hover:brightness-90 active:brightness-100"
        }
        ${className}`}
      {...props}
    ></Button>
  );
}

export function SecondaryButton({ className, ...props }: ButtonProp) {
  return (
    <Button
      className={`px-2.5 py-1.5 border border-[#0072DA] hover:bg-[#0072DA] hover:text-white ${className}`}
      {...props}
    />
  );
}

export function ModuleButton(props: ButtonProp) {
  return <Button {...props} className="!min-w-[80px] font-normal" />;
}
