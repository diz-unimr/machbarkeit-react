/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { Button } from "@/components/ui/buttons/Button";
import PageHeader from "@/components/layout/PageHeader";
import QueryManagementPanel from "./query-management/QueryManagementPanel";
import { Plus } from "lucide-react";
import PageSection from "@/components/layout/PageSection";

type QueryOverviewProps = {
  onFeasibility: () => void;
};

const QueryOverview = ({ onFeasibility }: QueryOverviewProps) => {
  return (
    <PageSection id="query-overview" sectionClass="max-w-450">
      <div className="flex max-h-30 shrink-0 items-center justify-between">
        <PageHeader
          title="Abfrageübersicht"
          subtitle="Abfrageverlauf und gespeicherte Abfragen verwalten"
        />
        <Button
          id="new-query"
          type="primary"
          label={
            <span className="flex items-center gap-2">
              <Plus size={14} strokeWidth="4" />
              Neue Abfrage
            </span>
          }
          onClick={onFeasibility}
        />
      </div>
      <div className="flex-1 min-h-0">
        <QueryManagementPanel onFeasibility={onFeasibility} />
      </div>
    </PageSection>
  );
};

export default QueryOverview;
