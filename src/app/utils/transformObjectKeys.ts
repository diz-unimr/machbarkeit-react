/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import lodash from "lodash";

export default function transformObjectKeys<T extends { children?: T[] }>(
  data: T[]
): T[] {
  const response: T[] = data.map((obj: T) => {
    const transformedObj = lodash.mapKeys(obj, (_, key) =>
      lodash.camelCase(key)
    ) as unknown as T;
    if ("children" in transformedObj && transformedObj.children!.length > 0) {
      transformedObj.children = transformObjectKeys(
        transformedObj.children!
      ) as T[];
    }
    return transformedObj;
  });
  return response;
}
