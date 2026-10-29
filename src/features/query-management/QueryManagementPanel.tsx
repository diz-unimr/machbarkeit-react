/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import Card from "@components/Card";
import QueryJobs from "./QueryJobs";
import SavedQueries from "./SaveQueries";

type QueryManagementContainerProps = {
  onClose: () => void;
};

const QueryManagementPanel = ({ onClose }: QueryManagementContainerProps) => {
  return (
    <div className="flex w-full h-screen p-6 mx-auto overflow-hidden">
      <Card
        header="Abfrageverwaltung"
        subHeader="Abfrageverlauf und gespeicherte Abfragen verwalten"
        className="h-full min-h-0"
        headerClassName="text-2xl font-bold text-black border-b-1 border-gray-300"
        bodyClassName="flex-1 min-h-0 overflow-hidden pt-5"
        onClose={onClose}
      >
        <div className="h-full flex flex-col gap-6">
          <QueryJobs />
          <SavedQueries />
        </div>
      </Card>
    </div>
  );
};

export default QueryManagementPanel;
