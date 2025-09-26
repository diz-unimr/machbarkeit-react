/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

export default function TreePanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto overflow-x-hidden">
      {children}
    </div>
  );
}
