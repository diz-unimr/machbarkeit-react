/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import downloadIcon from "@assets/download-file-icon.svg";
import { DeleteButton } from "@/components/ui/buttons/Button";
import useQueryManagementStore from "@/app/store/query-management-store";

const ActionsButton = ({ queryId }: { queryId: string }) => {
  const removeSavedQuery = useQueryManagementStore((s) => s.removeSavedQuery);

  return (
    <div className="flex w-full justify-center gap-6">
      <div className="relative flex group">
        <DeleteButton
          id={queryId}
          className="w-fit! py-0! px-0!"
          onClick={() => removeQueryJobs(queryId)}
        />
        <div
          className="pointer-events-none
        absolute
        left-1/2
        bottom-full
        -translate-x-1/2
        rounded
        bg-gray-800
        px-2
        py-1
        text-xs
        text-white
        opacity-0
        transition-opacity
        group-hover:opacity-100
      "
        >
          Löschen
        </div>
      </div>
      <div className="relative flex group">
        <button className="w-full py-0! px-0!">
          <img src={downloadIcon} alt="Download" />
        </button>
        <div
          className="pointer-events-none
        absolute
        left-1/2
        bottom-full
        -translate-x-1/2
        rounded
        bg-gray-800
        px-2
        py-1
        text-xs
        text-white
        opacity-0
        transition-opacity
        group-hover:opacity-100
      "
        >
          Herunterladen
        </div>
      </div>
    </div>
  );
};

export default ActionsButton;
