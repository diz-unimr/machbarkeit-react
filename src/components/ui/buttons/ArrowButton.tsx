/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import accordionArrow from "@assets/accordion-arrow.svg";

type ArrowButtonProp = {
  id: string;
  image?: string;
  width?: string;
  height?: string;
  mode?: "rotate-left" | "rotate-right" | "flip";
  isExpanded: boolean;
  className?: string;
  hasChildren?: boolean;
  onClick?: () => void;
};

const ArrowButton = ({
  id,
  image = accordionArrow,
  width = "16",
  height = "16",
  mode = "rotate-right",
  isExpanded,
  className,
  hasChildren = true,
  onClick,
}: ArrowButtonProp) => {
  return (
    <button
      disabled={!hasChildren}
      onClick={onClick}
      aria-expanded={isExpanded}
      className={`p-0! mr-0! ${className ?? ""} ${!hasChildren && "opacity-0!"}`}
    >
      <img
        key={id}
        className={`mt-0.5 
          ${
            mode === "rotate-right"
              ? `transition-all duration-300 ${
                  isExpanded ? "rotate-90" : "rotate-0"
                }`
              : mode === "rotate-left"
                ? `transition-all duration-300 ${
                    isExpanded ? "-rotate-90" : "rotate-0"
                  }`
                : `${isExpanded ? "scale-x-[1]" : "scale-x-[-1]"}`
          }`}
        src={image}
        width={width}
        height={height}
        alt="arrow icon"
      />
    </button>
  );
};

export default ArrowButton;
