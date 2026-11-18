/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import Splitter from "@/components/layout/Splitter";
import DataSelectionPanel from "./data-selection/DataSelectionPanel";
import FeasibilityQueryPanel from "./feasibility/feasibility-builder/FeasibilityQueryPanel";
import PageSection from "@/components/layout/PageSection";
import PageHeader from "@/components/layout/PageHeader";
import { useResetQueryData } from "@/app/hooks/useResetQueryData";

type FeasibilityQueryProps = {
  onBack: () => void;
};

const FeasibilityQuery = ({ onBack }: FeasibilityQueryProps) => {
  const { resetQueryData } = useResetQueryData();
  return (
    <PageSection id="feasibility-query" sectionClass="max-w-450">
      <div className="flex max-h-30 shrink-0 items-center justify-between">
        <PageHeader
          title="Machbarkeitsabfrage"
          subtitle="Kriterien definieren und Patientenanzahl ermitteln"
          backLabel="Zurück zur Abfrageübersicht"
          onBack={() => {
            onBack();
            resetQueryData();
          }}
        />
      </div>
      <div className="flex-1 min-h-0">
        <Splitter
          leftChild={({ toggleLeftPanel }) => (
            <DataSelectionPanel onToggle={toggleLeftPanel} />
          )}
          rightChild={<FeasibilityQueryPanel />}
        />
      </div>
    </PageSection>
  );
};

export default FeasibilityQuery;
