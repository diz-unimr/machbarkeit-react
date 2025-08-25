/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

type ButtonProp = {
  id: string;
  label?: string;
  bgColor?: string;
  img?: string;
  className?: string;
  style?: React.CSSProperties;
};

type ModuleButtonProp = ButtonProp & { moduleName: string };

const moduleColors: Record<string, string> = {
  person: "#3498db",
  fall: "#e93f2f",
  diagnose: "#865bd1",
  prozedur: "#fbb016",
  laboruntersuchung: "#27ae60",
  unset: "unset",
};

function BaseButton({
  id,
  label,
  img,
  className,
  bgColor,
}: ButtonProp | ModuleButtonProp) {
  return (
    <button
      id={id}
      className={`min-w-[70px] min-h-[40px] align-middle whitespace-nowrap p-2 pl-3 pr-3 m-1 rounded-lg cursor-pointer ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {label}
      {img}
    </button>
  );
}

export function PrimaryButton(props: ButtonProp) {
  return <BaseButton {...props} bgColor="#e5eff5" className="font-bold" />;
}

export function ArrowButton(props: ButtonProp) {
  return <BaseButton {...props} />;
}

export function ModuleButton(props: ModuleButtonProp) {
  return (
    <BaseButton
      {...props}
      bgColor={moduleColors[props.moduleName]}
      className="text-white"
    />
  );
}

type IconButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // object ที่มี onClick
};

export function IconButton({ onClick }: IconButtonProps) {
  return (
    <button
      className="w-11 h-11 p-2.5 pl-3 pr-3 rounded-md !bg-[#5e6c78] cursor-pointer"
      onClick={onClick}
    >
      <svg
        width="20"
        height="20"
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
