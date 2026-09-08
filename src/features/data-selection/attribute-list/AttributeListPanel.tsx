/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import AttributeList from "./AttributeList";
import CollapsiblePanel from "../../../components/ui/CollapsiblePanel";

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
