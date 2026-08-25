/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

const TreePanel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-full pr-3 overflow-y-auto overflow-x-hidden">
      {children}
    </div>
  );
};
export default TreePanel;
