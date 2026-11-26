/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import {
  Play,
  Pencil,
  Save,
  Trash,
  MoreHorizontal,
  CopyPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

type Action = "start" | "reuse" | "edit" | "save" | "delete";

type ActionsButtonProps = {
  actions: Action[];
  onStart?: () => void;
  onEdit?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
};

const ActionsButton = ({
  actions = ["start", "reuse", "edit", "save", "delete"],
  onStart,
  onEdit,
  onSave,
  onDelete,
}: ActionsButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const buttonClass =
    "inline-flex m-0! h-8 w-8 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";
  const menuItemClass =
    "flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100";

  // Action configuration
  const actionConfig: Record<
    Action,
    {
      label: string;
      title: string;
      icon: LucideIcon;
      onClick?: () => void;
      className?: string;
    }
  > = {
    start: {
      label: "Abfrage starten",
      title: "Abfrage starten",
      icon: Play,
      onClick: onStart,
    },
    reuse: {
      label: "Wiederverwenden",
      title: "Abfrage wiederverwenden",
      icon: CopyPlus,
      onClick: onEdit,
    },
    edit: {
      label: "Bearbeiten",
      title: "Bearbeiten",
      icon: Pencil,
      onClick: onEdit,
    },
    save: {
      label: "Speichern",
      title: "Speichern",
      icon: Save,
      onClick: onSave,
    },
    delete: {
      label: "Löschen",
      title: "Löschen",
      icon: Trash,
      onClick: onDelete,
      className: "text-red-600 hover:bg-red-50",
    },
  };

  const visibleActions = actions.map((action) => ({
    type: action,
    ...actionConfig[action],
  }));

  const handleAction = (callback?: () => void) => {
    callback?.();
    setIsMenuOpen(false);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Desktop */}
      <div className="hidden items-center justify-center md:flex">
        {visibleActions.map(({ type, label, title, icon: Icon, onClick }) => (
          <button
            key={type}
            type="button"
            className={buttonClass}
            aria-label={label}
            title={title}
            onClick={() => onClick?.()}
          >
            <Icon size={15} strokeWidth={1.8} />
          </button>
        ))}
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
            {visibleActions.map(
              ({ type, label, icon: Icon, onClick, className }) => (
                <button
                  key={type}
                  type="button"
                  role="menuitem"
                  className={`${menuItemClass} ${className ?? ""}`}
                  onClick={() => handleAction(onClick)}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionsButton;
