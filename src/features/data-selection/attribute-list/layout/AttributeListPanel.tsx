/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import AttributeList from "../AttributeList";
import CollapsiblePanel from "../../../../components/ui/CollapsiblePanel";

type AttributeListPanelProps = {
  onSetPanelStatus: () => void;
  isAttributeListPanelOpen: boolean;
};

const AttributeListPanel = ({
  onSetPanelStatus,
  isAttributeListPanelOpen,
}: AttributeListPanelProps) => {
  return (
    <CollapsiblePanel
      label="Attributliste"
      onToggle={onSetPanelStatus}
      isExpanded={isAttributeListPanelOpen}
    >
      <AttributeList />
    </CollapsiblePanel>
  );
};

export default AttributeListPanel;

{
  /* <div className="flex flex-col border-b-[1.5px] border-[var(--color-border)]">
      <div className="flex px-4 py-3">
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
    </div> */
}
