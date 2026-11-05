/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import ActionsButton from "@components/buttons/ActionsButton";
import CollapsiblePanel from "@/components/CollapsiblePanel";
import type {
  QueryReference,
  SavedQuery,
} from "@/features/query-management/types";
import { TableHeader, TableRow, TableCell } from "@components/QueryTable";
import QueryDetails from "./QueryDetails";
import { formatDateTime } from "@/app/utils/formatDateTime";
import { Bookmark } from "lucide-react";
import { commonTexts } from "@/app/constants/uiTexts";

type QueryJobsProps = {
  savedQueries: SavedQuery[];
  onStart: (queryReference: QueryReference) => void;
  onEdit: (queryReference: QueryReference) => void;
  onDelete: (queryReference: QueryReference) => void;
};

const SavedQueries = ({
  savedQueries,
  onStart,
  onEdit,
  onDelete,
}: QueryJobsProps) => {
  const [expandedQueryId, setExpandedQueryId] = useState<string | null>(null);
  const [isSavedQueriesExpanded, setIsSavedQueriesExpanded] =
    useState<boolean>(true);

  const gridColumns =
    "grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] items-center";

  return (
    <CollapsiblePanel
      icon={<Bookmark size={20} strokeWidth={2.5} color="#0A4CC5" />}
      label="Gespeicherte Abfragen"
      isPanelExpanded={isSavedQueriesExpanded}
      onToggleCriteriaPanel={() => setIsSavedQueriesExpanded((prev) => !prev)}
    >
      <div className="min-h-0 flex-1 flex flex-col gap-3">
        <TableHeader gridClass={gridColumns}>
          {/* <TableCell className="text-left font-medium">ID</TableCell> */}
          <TableCell className="font-medium">Name</TableCell>
          <TableCell className="font-medium">Erstelldatum</TableCell>
          <TableCell className="font-medium">Letzte Änderung</TableCell>
          <TableCell className="font-medium">Aktionen</TableCell>
        </TableHeader>
        <div
          className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="flex h-full min-h-full flex-col gap-2 items-center justify-center">
            {savedQueries.length === 0 ? (
              <p className="py-5 text-center text-gray-500">
                {commonTexts.noQueries}
              </p>
            ) : (
              savedQueries.map((savedQuery) => {
                const isExpanded = expandedQueryId === savedQuery.id;
                const { createdDate, createdTime } = formatDateTime(
                  savedQuery.createdAt,
                );

                return (
                  <div
                    key={savedQuery.id}
                    className={
                      isExpanded
                        ? "overflow-hidden rounded-lg border border-blue-300"
                        : ""
                    }
                  >
                    <TableRow
                      gridClass={gridColumns}
                      isExpanded={isExpanded}
                      onClick={() =>
                        setExpandedQueryId((currentId) =>
                          currentId === savedQuery.id ? null : savedQuery.id,
                        )
                      }
                    >

                      <TableCell className="break-words">
                        {/* {savedQuery.name} */} -
                      </TableCell>

                      <TableCell className="break-words">
                        <div>{createdDate}</div>
                        <div className="text-sm text-gray-500">
                          {createdTime}
                        </div>
                      </TableCell>

                      <TableCell className="break-words">
                        <div>{createdDate}</div>
                        <div className="text-sm text-gray-500">
                          {createdTime}
                        </div>
                      </TableCell>

                      <TableCell>
                        <div onClick={(event) => event.stopPropagation()}>
                          <ActionsButton
                            actions={["run", "edit", "delete"]}
                            onStart={onStart}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            queryReference={{
                              type: "savedQuery",
                              id: savedQuery.id,
                              name: savedQuery.name,
                              query: savedQuery.query,
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>

                    {isExpanded && (
                      <div className="bg-blue-50 p-2">
                        <QueryDetails
                          expandedQueryId={expandedQueryId}
                          queryDetails={null}
                        />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </CollapsiblePanel>
  );
};

export default SavedQueries;
