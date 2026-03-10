/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

export type CodeSystem = "LOINC" | "SWISSLAB";
type SwisslabLoincTabProps = {
  color?: string;
  activeLabTab: CodeSystem;
  onChangeTab: (tab: CodeSystem) => void;
};
const SwisslabLoincTab = ({
  color,
  activeLabTab,
  onChangeTab,
}: SwisslabLoincTabProps) => {
  return (
    <div className="mb-5 px-8 border-b border-gray-200 ">
      <ul
        className="w-full flex gap-5 m-8 justify-center text-sm font-medium text-center"
        role="tablist"
      >
        {/* Tab: SWISSLAB */}
        <li className="flex-1" role="presentation">
          <div
            onClick={() => onChangeTab("SWISSLAB")}
            className={`inline-block w-full p-4 border-b-2 cursor-pointer ${
              activeLabTab === "SWISSLAB"
                ? "border-current"
                : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
            }`}
            style={
              activeLabTab === "SWISSLAB"
                ? {
                    color: color,
                    borderBottomColor: color,
                  }
                : {}
            }
            role="tab"
            aria-selected={activeLabTab === "SWISSLAB"}
          >
            Swisslab-Codes
          </div>
        </li>
        {/* Tab: LOINC */}
        <li className="flex-1" role="presentation">
          <div
            onClick={() => onChangeTab("LOINC")}
            className={`inline-block w-full p-4 border-b-2 cursor-pointer ${
              activeLabTab === "LOINC"
                ? "border-current"
                : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300"
            }`}
            style={
              activeLabTab === "LOINC"
                ? {
                    color: color,
                    borderBottomColor: color,
                  }
                : {}
            }
            role="tab"
            aria-selected={activeLabTab === "LOINC"}
          >
            LOINC-Codes
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SwisslabLoincTab;
