/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

const folderImg = <img src="/folder.svg" alt="folder" />;

type OntologyButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function OntologyButton({ onClick }: OntologyButtonProps) {
  return (
    <button
      className="!w-10 !h-10 !min-w-auto !bg-[#5e6c78] hover:brightness-110 active:brightness-100 !rounded-sm"
      onClick={onClick}
    >
      {folderImg}
    </button>
  );
}
