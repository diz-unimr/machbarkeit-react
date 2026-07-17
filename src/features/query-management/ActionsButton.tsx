/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import deleteIcon from "@assets/trash-icon.svg";
import downloadIcon from "@assets/download-file-icon.svg";

const ActionsButton = ({ queryId }: { queryId: string }) => {
  return (
    <div className="flex w-full justify-center gap-6">
      <div className="relative flex">
        <button className="w-full py-0! px-0!">
          <img src={deleteIcon} alt="Delete" />
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
          Delete
        </div>
      </div>
      <div className="relative flex">
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
          Download
        </div>
      </div>
    </div>
  );
};

export default ActionsButton;
