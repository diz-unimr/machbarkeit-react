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
      className={`min-w-[70px] min-h-[40px] align-middle whitespace-nowrap p-2 m-1 rounded-lg cursor-pointer !bg-[${bgColor}] ${className}`}
    >
      {label}
      {img}
    </button>
  );
}

/* export function PrimaryButton(props: ButtonProp) {
  return <BaseButton {...props} bgColor="#e5eff5" className="font-bold" />;
}

export function ArrowButton(props: ButtonProp) {
  return <BaseButton {...props} />;
} */

export function ModuleButton(props: ModuleButtonProp) {
  return (
    <BaseButton
      {...props}
      bgColor={moduleColors[props.moduleName]}
      className="text-white font-medium"
    />
  );
}
