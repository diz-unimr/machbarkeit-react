/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { QueryReference } from "@/features/query-management/types";
import {
  Play,
  Pencil,
  Save,
  Trash,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

type Action = "start" | "restart" | "edit" | "save" | "delete";

type ActionsButtonProps = {
  queryReference: QueryReference;
  actions: Action[];
  onStart?: (queryReference: QueryReference) => void;
  onEdit?: (queryReference: QueryReference) => void;
  onSave?: (queryReference: QueryReference) => void;
  onDelete?: (queryReference: QueryReference) => void;
};

const ActionsButton = ({
  queryReference,
  actions = ["start", "restart", "edit", "save", "delete"],
  onStart,
  onEdit,
  onSave,
  onDelete,
}: ActionsButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buttonClass =
    "inline-flex m-0! h-8 w-8 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";

  return (
    <div className="relative flex items-center justify-center">
      <div className="hidden items-center justify-center md:flex">
        {actions.includes("start") && (
          <button
            type="button"
            className={buttonClass}
            aria-label="Abfrage starten"
            title="Abfrage starten"
            onClick={() => onStart?.(queryReference)}
          >
            <Play size={15} strokeWidth={1.8} />
          </button>
        )}

        {actions.includes("restart") && (
          <button
            type="button"
            className={buttonClass}
            aria-label="Abfrage neu starten"
            title="Abfrage neu starten"
            onClick={() => onEdit?.(queryReference)}
          >
            <RefreshCw size={15} strokeWidth={1.8} />
          </button>
        )}

        {actions.includes("edit") && (
          <button
            type="button"
            className={buttonClass}
            aria-label="Bearbeiten"
            title="Bearbeiten"
            onClick={() => onEdit?.(queryReference)}
          >
            <Pencil size={15} strokeWidth={1.8} />
          </button>
        )}

        {actions.includes("save") && (
          <button
            type="button"
            className={buttonClass}
            aria-label="Speichern"
            title="Speichern"
            onClick={() => onSave?.(queryReference)}
          >
            <Save size={15} strokeWidth={1.8} />
          </button>
        )}

        {actions.includes("delete") && (
          <button
            type="button"
            className={buttonClass}
            aria-label="Löschen"
            title="Löschen"
            onClick={() => onDelete?.(queryReference)}
          >
            <Trash size={15} strokeWidth={1.8} />
          </button>
        )}
      </div>

      {/* Mobile: Dropdown menu */}
      <div className="relative md:hidden">
        <button
          type="button"
          className={buttonClass}
          aria-label="Weitere Aktionen"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <MoreHorizontal size={18} />
        </button>

        {isMenuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-1 min-w-40 rounded-md border border-gray-200 bg-white p-1 shadow-lg"
          >
            {actions.includes("start") && (
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onStart?.(queryReference);
                  setIsMenuOpen(false);
                }}
              >
                <Play size={15} />
                Abfrage starten
              </button>
            )}

            {actions.includes("restart") && (
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onEdit?.(queryReference);
                  setIsMenuOpen(false);
                }}
              >
                <RefreshCw size={15} />
                Abfrage wiederverwenden
              </button>
            )}

            {actions.includes("edit") && (
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onEdit?.(queryReference);
                  setIsMenuOpen(false);
                }}
              >
                <Pencil size={15} />
                Bearbeiten
              </button>
            )}

            {actions.includes("save") && (
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  onSave?.(queryReference);
                  setIsMenuOpen(false);
                }}
              >
                <Save size={15} />
                Speichern
              </button>
            )}

            {actions.includes("delete") && (
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={() => {
                  onDelete?.(queryReference);
                  setIsMenuOpen(false);
                }}
              >
                <Trash size={15} />
                Löschen
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionsButton;
