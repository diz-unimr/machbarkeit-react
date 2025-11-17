/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { ArrowButton } from "@components/ui/buttons/ArrowButton";
import AttributeList from "../AttributeList";
import accordionArrow from "@assets/accordion-arrow.svg";

type AttributeListPanelProps = {
  onSetPanelStatus: () => void;
  isAttributeListPanelOpen: boolean;
};

export default function AttributeListPanel({
  onSetPanelStatus,
  isAttributeListPanelOpen,
}: AttributeListPanelProps) {
  return (
    <div className="flex flex-col border-b-[1.5px] border-[var(--color-border)]">
      <div className="flex justify-between px-4 py-3">
        <p className="font-medium">Attributliste</p>
        <ArrowButton
          id="characteristic-btn"
          image={accordionArrow}
          width="28"
          mode="rotate-left"
          isExpanded={isAttributeListPanelOpen}
          onClick={onSetPanelStatus}
        />
      </div>
      <div
        className="flex flex-col w-full h-[70vh] p-2"
        style={{ display: isAttributeListPanelOpen ? "flex" : "none" }}
      >
        <AttributeList />
      </div>
    </div>
  );
}
