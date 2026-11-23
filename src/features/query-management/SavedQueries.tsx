/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useState } from "react";
import ActionsButton from "@components/ui/buttons/ActionsButton";
import CollapsiblePanel from "@/components/ui/CollapsiblePanel";
import type {
  Attribute,
  QueryReference,
  SavedQuery,
} from "@/features/query-management/types";
import { TableHeader, TableRow, TableCell } from "@/components/ui/QueryTable";
import QueryDetails from "./QueryDetails";
import { formatDateTime } from "@/app/utils/formatDateTime";
import { Bookmark } from "lucide-react";
import { commonTexts } from "@/app/constants/uiTexts";
import Card from "@/components/ui/Card";

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

  const savedQueryAttributes: Attribute<SavedQuery>[] = [
    {
      name: "Name",
      showInRow: true,
      columnWidth: "minmax(0,2fr)",
      className: "min-w-0 max-w-[90%] truncate",
      render: (savedQuery: SavedQuery) =>
        savedQuery.name ?? `Abfrage ${savedQuery.id}`,
    },
    {
      name: "Erstelldatum",
      showInRow: true,
      columnWidth: "minmax(0,1fr)",
      className: "",
      render: (savedQuery: SavedQuery) => {
        const { date, time } = formatDateTime(savedQuery.createdAt);
        return (
          <>
            <div>{date}</div>
            <div className="text-xs text-[#64748B]">{time}</div>
          </>
        );
      },
    },
    {
      name: "Letzte Änderung",
      showInRow: true,
      columnWidth: "minmax(0,1.5fr)",
      className: "whitespace-nowrap",
      render: (savedQuery: SavedQuery) => {
        const { date, time } = formatDateTime(savedQuery.updatedAt);
        return (
          <>
            <div>{date}</div>
            <div className="text-xs text-[#64748B]">{time}</div>
          </>
        );
      },
    },
    {
      name: "Aktionen",
      showInRow: true,
      columnWidth: "minmax(0,1fr)",
      className: "justify-center",
      render: (savedQuery: SavedQuery) => (
        <div onClick={(event) => event.stopPropagation()}>
          <ActionsButton
            actions={["start", "edit", "delete"]}
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
      ),
    },
  ];

  const gridClass = {
    gridTemplateColumns: savedQueryAttributes
      .map((attribute) => attribute.columnWidth)
      .join(" "),
  };

  return (
    <Card>
      <CollapsiblePanel
        icon={<Bookmark size={24} strokeWidth={2.5} color="#16A34A" />}
        iconBg="#DCFCE7"
        title="Gespeicherte Abfragen"
        subtitle="Gespeicherte Abfragen"
        isPanelExpanded={isSavedQueriesExpanded}
        onToggleCriteriaPanel={() => setIsSavedQueriesExpanded((prev) => !prev)}
      >
        <div className="min-h-0 flex-1 flex flex-col gap-3">
          <div className="min-h-0 flex-1 flex flex-col gap-3 overflow-hidden">
            <TableHeader gridClass={gridClass}>
              {savedQueryAttributes.map((attribute) => (
                <TableCell key={attribute.name}>{attribute.name}</TableCell>
              ))}
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
                          gridClass={gridClass}
                          isExpanded={isExpanded}
                          onClick={() =>
                            setExpandedQueryId((currentId) =>
                              currentId === savedQuery.id
                                ? null
                                : savedQuery.id,
                            )
                          }
                        >
                          {savedQueryAttributes.map((attribute) => (
                            <TableCell
                              key={attribute.name}
                              className={attribute.className}
                            >
                              {attribute.render
                                ? attribute.render(savedQuery)
                                : "-"}
                            </TableCell>
                          ))}
                        </TableRow>

                        {isExpanded && (
                          <div className="bg-blue-50 p-2">
                            <QueryDetails
                              expandedQueryId={expandedQueryId}
                              queryDetails={savedQuery}
                              attributes={savedQueryAttributes}
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
        </div>
      </CollapsiblePanel>
    </Card>
  );
};

export default SavedQueries;
