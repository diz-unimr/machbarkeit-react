/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import Card from "@/components/ui/Card";
import QueryJobs from "./QueryJobs";
import SavedQueries from "./SavedQueries";

/* type QueryManagementContainerProps = {

}; */

const QueryManagementContainer = () => {
  return (
    <div className="flex max-w-320 h-screen p-6 mx-auto overflow-hidden">
      <Card
        header="Abfrageverwaltung"
        headerClassName="text-2xl font-bold text-black border-b-1 border-gray-300"
      >
        <div className="flex flex-col p-5 overflow-hidden">
          <div className="flex flex-col gap-6">
            <QueryJobs />
            <SavedQueries />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QueryManagementContainer;
