/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { twMerge } from "tailwind-merge";

export type ButtonProp = {
  id: string;
  type?: "primary" | "secondary" | "tertiary" | "danger";
  label: string;
  color?: string;
  isActive?: boolean;
  className?: string;
  onClick?: (id: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export const Button = ({
  id,
  type = "primary",
  label,
  className,
  color = undefined,
  isActive = true,
  onClick,
}: ButtonProp) => {
  const baseClass =
    "!min-w-[80px] font-bold border-[1.5px] border-[var(--btn-bg)] bg-[var(--btn-bg)] hover:bg-[var(--btn-bg)]";

  const isActiveClass =
    isActive && "hover:shadow-md transition-all duration-150";

  let typeClass = "";
  switch (type) {
    case "primary":
      typeClass = "text-white uppercase hover:border-gray-300";
      break;
    case "secondary":
      typeClass = "bg-transparent border-none px-2.5 py-1.5 hover:text-white";
      break;
    case "tertiary":
      typeClass = `w-fit! min-w-0! bg-transparent! border-none! m-0! px-1! text-[var(--btn-bg)] ${isActive ? "hover:underline" : null} hover:bg-transparent hover:shadow-none!`;
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
        <img src="/delete.png" className="!w-[22px] !h-[16px]" />
      )}
    </button>
  );
};

export const TertiaryButton = ({
  id,
  label,
  isActive = true,
  className,
  onClick,
}: {
  id: string;
  label: string;
  isActive?: boolean;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <span
      role="button"
      aria-disabled={isActive}
      id={id}
      onClick={onClick}
      className={`flex text-sm font-medium ${!isActive ? "cursor-not-allowed opacity-50 pointer-events-none" : "text-gray-500 cursor-pointer hover:underline hover:text-gray-800"}  ${className}`}
    >
      {label}
    </span>
  );
};

export const SubmitButton = ({ className, ...props }: ButtonProp) => {
  return <Button type="primary" className={className} {...props}></Button>;
};

export const CancelButton = ({ className, ...props }: ButtonProp) => {
  return <Button type="secondary" className={className} {...props}></Button>;
};

export const DeleteButton = ({ className, ...props }: ButtonProp) => {
  return (
    <Button
      type="danger"
      className={className}
      color="transparent"
      {...props}
    ></Button>
  );
};
