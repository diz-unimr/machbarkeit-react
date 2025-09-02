/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { PrimaryButton } from "../Button";
import { type Module } from "../../../features/ontology/type";

type ModuleButtonProps = {
  module: Module;
  onClick: (id: string) => void;
};

export function ModuleButton({ module, onClick }: ModuleButtonProps) {
  return (
    <PrimaryButton
      id={module.id}
      bgColor={module.color}
      className="text-white font-normal"
      onClick={onClick}
    >
      {module.name}
    </PrimaryButton>
  );
}
