/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect } from "react";
import { toast } from "sonner";
import QueryJobs from "./QueryJobs";
import useQueries from "@features/query-management/hooks/useQueries";
import SavedQueries from "./SavedQueries";
import handleSelectedQuery from "@/app/utils/handleSelectedQuery";
import type { QueryReference } from "./types";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import { useWarningConfirmation } from "@/app/hooks/useWarningConfirmation";
import { useFeasibilityQuery } from "@/app/hooks/useFeasibilityQuery";
import createQueryData from "@/app/utils/createQueryData";
import { confirmationMessages, titleTexts } from "@/app/constants/uiTexts";
import { deleteSavedQuery } from "@/app/services/query-management-service";
import useQueryManagementStore from "@/app/store/query-management-store";

type QueryManagementPanelProps = {
  onFeasibility: () => void;
};
const QueryManagementPanel = ({ onFeasibility }: QueryManagementPanelProps) => {
  const { queryJobs, savedQueries } = useQueries();
  console.log("query Jobs; ", queryJobs);
  console.log("saved Queries; ", savedQueries);

  const { startQuery } = useFeasibilityQuery();

  const { requestWarningConfirmation } = useWarningConfirmation();

  const selectedInclusionCriteria = useSelectedCriteriaStore(
    (s) => s.selectedInclusionCriteria,
  );
  const setSelectedCriteria = useSelectedCriteriaStore(
    (s) => s.setSelectedCriteria,
  );
  const removeSavedQuery = useQueryManagementStore((s) => s.removeSavedQuery);

  const handleStart = (queryReference: QueryReference) => {
    // Start query
    const queryData = createQueryData(selectedInclusionCriteria);
    if (!queryData) return;
    startQuery(queryData);
  };

  const handleEdit = async ({ type, id, name, query }: QueryReference) => {
    if (!query) return; // Warning?

    handleSelectedQuery(query, setSelectedCriteria);
    onFeasibility();
    /* onClose(); */
  };

  const handleSave = ({ type, id, name, query }: QueryReference) => {
    // Save query
  };

  const handleDelete = async ({ type, id }: QueryReference) => {
    // Delete query
    toast.error("Löschen fehlgeschlagen", {
      description: "Die Abfrage konnte nicht gelöscht werden.",
    });
    console.log("delete");
    const choice = await requestWarningConfirmation({
      title: titleTexts.deleteQuery,
      message: confirmationMessages.deleteQuery,
      options: ["cancel", "delete"],
    });

    if (choice === "cancel") return;
    if (choice === "delete") {
      // Delete draft query
      if (type === "savedQuery") {
        savedQueries.filter((q) => q.id !== id);
        const [success, errorMessage] = await deleteSavedQuery(id);
        if (!success) {
          console.error("Failed to delete saved query:", errorMessage);
        } else {
          removeSavedQuery(id);
        }
      }
    }
  };

  const handleRename = ({ type, id, name, query }: QueryReference) => {
    // Rename saved query
  };

  useEffect(() => {
    let cancelled = false;

    const fetchHistory = async () => {
      //const data = await getFeasibilityRequest();

      if (cancelled) return;

      //setAbfragen(data);
    };

    fetchHistory();

    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <div className="flex flex-1 min-h-0 h-full w-full flex-col gap-6">
      <QueryJobs
        queryJobs={queryJobs}
        onEdit={handleEdit}
        onSave={handleSave}
      />
      <SavedQueries
        savedQueries={savedQueries}
        onStart={handleStart}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default QueryManagementPanel;
