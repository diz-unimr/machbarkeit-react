/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { Play, Pencil, Save, Trash } from "lucide-react";

type Action = "run" | "edit" | "save" | "delete";

type ActionsButtonProps = {
  queryId: string;
  actions: Action[];
  onStart?: (queryId: string) => void;
  onEdit?: (queryId: string) => void;
  onSave?: (queryId: string) => void;
};

const ActionsButton = ({
  queryId,
  actions = ["run", "edit", "save", "delete"],
  onStart,
  onEdit,
  onSave,
}: ActionsButtonProps) => {
  const buttonClass =
    "inline-flex m-0! h-8 w-8 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";

  return (
    <div className="flex items-center justify-center">
      {actions.includes("run") && (
        <button
          type="button"
          className={buttonClass}
          aria-label="Abfrage starten"
          title="Abfrage starten"
          onClick={() => onStart?.(queryId)}
        >
          <Play size={15} strokeWidth={1.8} />
        </button>
      )}

      {actions.includes("edit") && (
        <button
          type="button"
          className={buttonClass}
          aria-label="Bearbeiten"
          title="Bearbeiten"
          onClick={() => onEdit?.(queryId)}
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
          onClick={() => onSave?.(queryId)}
        >
          <Save size={15} strokeWidth={1.8} />
        </button>
      )}

      {actions.includes("delete") && (
        <button
          type="button"
          className={buttonClass}
          aria-label="Speichern"
          title="Speichern"
          onClick={() => onSave?.(queryId)}
        >
          <Trash size={15} strokeWidth={1.8} />
        </button>
      )}
    </div>
  );
};

export default ActionsButton;
