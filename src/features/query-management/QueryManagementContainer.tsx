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
        className="h-full"
        headerClassName="text-2xl font-bold text-black border-b-1 border-gray-300"
        bodyClassName="pt-5"
      >
        <div className="h-full flex flex-col gap-6">
          <QueryJobs />
          <SavedQueries />
        </div>
      </Card>
    </div>
  );
};

export default QueryManagementContainer;
