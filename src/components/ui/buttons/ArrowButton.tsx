/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import accordionArrow from "@assets/accordion-arrow.svg";

type ArrowButtonProp = {
  id: string;
  image?: string;
  width?: string;
  mode?: "rotate-left" | "rotate-right" | "flip";
  isExpanded: boolean;
  className?: string;
  hasChildren?: boolean;
  onClick?: () => void;
};

const ArrowButton = ({
  id,
  image = accordionArrow,
  width = "15",
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
        style={{
          width: `clamp(10px, 1vw + 0.5rem, ${width}px)`,
        }}
        className={`mt-0.5
          ${
            mode === "rotate-right"
              ? `transition-all duration-300 ${
                  isExpanded ? "rotate-270" : "rotate-180"
                }`
              : mode === "rotate-left"
                ? `transition-all duration-300 ${
                    isExpanded ? "-rotate-90" : "rotate-0"
                  }`
                : `${isExpanded ? "scale-x-[1]" : "scale-x-[-1]"}`
          }`}
        src={image}
        //width={width}
        height="14px"
        alt="arrow icon"
      />
    </button>
  );
};

export default ArrowButton;
