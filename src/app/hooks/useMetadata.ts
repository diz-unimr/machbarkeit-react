/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import useMetadataStore from "@app/store/metadata-store";
import getMetadata from "@app/services/metadataService";

const useMetadata = () => {
  const metadata = useMetadataStore((s) => s.metadata);
  const setMetadata = useMetadataStore((s) => s.setMetadata);

  useEffect(() => {
    const fetchMetadata = async () => {
      const metadata = await getMetadata();
      if (metadata) setMetadata(metadata);
    };
    fetchMetadata();
  }, []);

  return metadata;
};

export default useMetadata;
