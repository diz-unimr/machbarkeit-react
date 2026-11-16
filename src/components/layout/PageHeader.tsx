/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { ArrowLeft } from "lucide-react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  backLabel?: string;
  onBack?: () => void;
};

const PageHeader = ({
  title,
  subtitle,
  backLabel = "Zurück zur Startseite",
  onBack,
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 px-4 pb-6 shrink-0">
      {onBack && (
        <span
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span>{backLabel}</span>
        </span>
      )}
      <div>
        <p className="text-2xl font-bold text-[#01014F]">{title}</p>
        <p className="text-[#01014F]">{subtitle}</p>
      </div>
    </div>
  );
};

export default PageHeader;
