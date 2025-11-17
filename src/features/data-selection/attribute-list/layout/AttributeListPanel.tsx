/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { ArrowButton } from "@components/ui/buttons/ArrowButton";
import AttributeList from "../AttributeList";
import accordionArrow from "@assets/accordion-arrow.svg";

/* type Prop = {
  header: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
}; */

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

  // <div className="flex flex-row flex-wrap w-full h-full">
  {
    /* <div className="h-full min-h-[250px] relative !border !border-[#9ea9b3] !rounded-[8px] shadow-[0_2px_4px_-1px_#0003,0_4px_5px_#00000024,0_1px_10px_#0000001f]">
      <div className="h-[clamp(45px,10%,60px)] flex justify-center items-center bg-[#5270a7] font-bold text-lg text-white rounded-t-[6px]">
        {header}
      </div>
      <div className="w-full h-[90%] gap-5 flex flex-col p-5">
        {extra}
        <div className="flex flex-col gap-2.5 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </div> */
  }
  // </div>
}
