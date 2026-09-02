/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import axios, { type AxiosResponse } from "axios";
import Papa from "papaparse";
import type { Metadata } from "@/app/types/MetadataType";
import lodash from "lodash";
import login from "@/app/services/loginService.ts";
/* import kdsModule from "assets/xwiki_kds_modules.csv"; */

const getMetadata = async (): Promise<Metadata[] | null> => {
  try {
    const response = await fetch("src/assets/xwiki_kds_modules.csv");
    const csvText = await response.text();
    const result = Papa.parse<Metadata>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const metadata: Metadata[] = result.data.map((m) => {
      const metadataEntry = lodash.mapKeys(m, (_, key) =>
        lodash.camelCase(key),
      );

      return metadataEntry as Metadata;
    });

    const sortedMetadata = [...metadata].sort((a, b) => {
      const groupCompare = (a.additionalInformation ?? "").localeCompare(
        b.additionalInformation ?? "",
      );

      if (groupCompare !== 0) {
        return groupCompare;
      }
      return a.attributeName.localeCompare(b.attributeName);
    });

    return sortedMetadata;
  } catch (_error) {
    // todo: error handling
    await login();
    return null;
  }
};

export default getMetadata;
