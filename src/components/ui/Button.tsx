/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import arrowImg from "../../assets/arrow-collapse.png";

type ButtonProp = {
  id: string;
  children?: React.ReactNode;
  bgColor?: string;
  className?: string;
  isActive?: boolean;
  onClick?: (id: string) => void;
  // style?: React.CSSProperties;
};

export function PrimaryButton({
  id,
  children,
  className,
  bgColor,
  isActive = true,
  onClick,
}: ButtonProp) {
  return (
    <>
      <button
        id={id}
        className={`font-bold text-sm text-white ${className} ${
          !isActive
            ? "!cursor-default opacity-30"
            : "cursor-auto hover:brightness-90 active:brightness-100"
        }`}
        style={{
          backgroundColor: bgColor || "#0072DA",
        }}
        disabled={!isActive}
        onClick={() => onClick?.(id)}
      >
        {children}
      </button>
    </>
  );
}

export function SecondaryButton({
  id,
  children,
  className,
  isActive = true,
  onClick,
}: ButtonProp) {
  return (
    <button
      id={id}
      className={`font-bold text-sm border border-white ${className} ${
        !isActive ? "cursor-default bg-[#D1D6E2]" : "active:brightness-90"
      }`}
      style={{
        padding: "6px 10px",
      }}
      disabled={!isActive}
      onClick={() => onClick?.(id)}
    >
      {children}
    </button>
  );
}

export function ArrowButton({ id }: { id: string }) {
  return (
    <button aria-expanded="true" className="!min-w-auto !p-0 !m-0">
      <img
        key={id}
        className="transition-all duration-300 rotate-0"
        src={arrowImg}
        alt="arrow icon"
      />
    </button>
  );
}

type ToggleOntologyButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function ToggleOntologyButton({ onClick }: ToggleOntologyButtonProps) {
  return (
    <button
      className="!w-10 !h-10 !min-w-auto !bg-[#5e6c78] hover:brightness-110 active:brightness-100 !rounded-sm"
      onClick={onClick}
    >
      <svg
        width="16"
        height="16"
        data-v-23839f87=""
        role="img"
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="folder"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="svg-inline--fa fa-folder fa-w-16 fa-2x"
      >
        <path
          data-v-23839f87=""
          fill="white"
          d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z"
        ></path>
      </svg>
    </button>
  );
}
