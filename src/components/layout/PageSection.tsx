/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import type { ReactNode } from "react";

type PageSectionProps = {
  id: string;
  sectionClass?: ReactNode;
  children: ReactNode;
};
const PageSection = ({ id, sectionClass, children }: PageSectionProps) => {
  return (
    <section
      id={id}
      className={`flex flex-col w-full h-full min-h-0 p-5 mx-auto overflow-hidden bg-[#F4F6FE] ${sectionClass}`}
    >
      {children}
    </section>
  );
};

export default PageSection;
