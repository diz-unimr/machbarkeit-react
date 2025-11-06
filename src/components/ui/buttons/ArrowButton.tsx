/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import arrowImg from "/arrow.png";

type ArrowButtonProp = {
  id: string;
  isExpanded: boolean;
  hasChildren: boolean;
  onClick?: () => void;
};

export function ArrowButton({
  id,
  isExpanded,
  hasChildren,
  onClick,
}: ArrowButtonProp) {
  return (
    <button
      disabled={!hasChildren}
      onClick={onClick}
      aria-expanded="true"
      className={`!p-0 ${!hasChildren && "!opacity-0 !m-[3px]"}`}
    >
      <img
        key={id}
        className={`mt-0.5 transition-all duration-300 ${isExpanded ? "rotate-90" : "rotate-0"}`}
        src={arrowImg}
        alt="arrow icon"
      />
    </button>
  );
}
