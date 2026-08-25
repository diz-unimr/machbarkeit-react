/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import axios, { type AxiosResponse } from "axios";
import type { MetadataProps } from "@app/types/MetadataType";
import lodash from "lodash";
import login from "@app/services/loginService.ts";

export const getMetadata = async (): Promise<MetadataProps[] | null> => {
  try {
    const url = `${import.meta.env.VITE_BACKEND_API_BASE}/mdr/ontology/metadata`;
    const apiResponse: AxiosResponse = await axios.get(url, {
      withCredentials: true,
    });
    const metadata: MetadataProps[] = apiResponse.data.map(
      (m: MetadataProps) => {
        const metadataEntry = lodash.mapKeys(m, (_, key) =>
          lodash.camelCase(key),
        );
        return metadataEntry;
      },
    );

    // sort modules
    const sortedModules = [...metadata].sort((a, b) =>
      a.attributeName.localeCompare(b.attributeName),
    );
    return sortedModules;
  } catch (_error) {
    // todo: error handling
    await login();
    return null;
  }
};
