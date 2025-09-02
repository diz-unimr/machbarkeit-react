/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import arrowImg from "../../../assets/arrow.png";

type ArrowButtonProp = {
  id: string;
  isExpanded: boolean;
  onClick?: () => void;
};

export function ArrowButton({ id, isExpanded, onClick }: ArrowButtonProp) {
  return (
    <button
      onClick={onClick}
      aria-expanded="true"
      className="!min-w-auto !p-0 "
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
