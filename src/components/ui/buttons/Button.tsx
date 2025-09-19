/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { twMerge } from "tailwind-merge";

/* disabled button 
  bg-color: #ededed;
  text-color: #222222;

*/

type ButtonProp = {
  id: string;
  type?: "primary" | "secondary" | "danger";
  label: string;
  color?: string;
  isActive?: boolean;
  className?: string;
  onClick?: (id: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export function Button({
  id,
  type = "primary",
  label,
  className,
  color = undefined,
  isActive = true,
  onClick,
}: ButtonProp) {
  const baseClass =
    "!min-w-[80px] font-bold text-sm border border-[var(--btn-bg)] bg-[var(--btn-bg)] hover:bg-[var(--btn-bg)]";
  /* const isActiveClass = !isActive
    ? "!cursor-not-allowed !opacity-45"
    : "cursor-auto hover:brightness-90 active:brightness-100"; */
  const isActiveClass = isActive && "hover:brightness-90 active:brightness-100";

  let typeClass = "";
  switch (type) {
    case "primary":
      typeClass = "text-white";
      break;
    case "secondary":
      typeClass = "bg-transparent text-black px-2.5 py-1.5 hover:text-white";
      break;
    case "danger":
      typeClass = "flex items-center gap-1 border-none hover:text-red-700";
      break;
  }

  const buttonClass = twMerge(baseClass, typeClass, isActiveClass, className);

  return (
    <button
      id={id}
      className={buttonClass}
      style={
        {
          "--btn-bg": color || "#0072DA",
        } as React.CSSProperties
      }
      disabled={!isActive}
      onClick={() => onClick?.(id)}
    >
      {label}
      {type === "danger" && (
        <img src="./delete.png" className="!w-[22px] !h-[16px]" />
      )}
    </button>
  );
}

export function SubmitButton({ className, ...props }: ButtonProp) {
  return <Button type="primary" className={className} {...props}></Button>;
}

export function CancelButton({ className, ...props }: ButtonProp) {
  return <Button type="secondary" className={className} {...props}></Button>;
}

export function DeleteButton({ className, ...props }: ButtonProp) {
  return (
    <Button
      type="danger"
      className={className}
      color="transparent"
      {...props}
    ></Button>
  );
}
