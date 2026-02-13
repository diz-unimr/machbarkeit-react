/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { useEffect } from "react";
import useModulesStore from "@app/store/modules-store";
import getModules from "@app/services/moduleService";

const useModules = () => {
  const modules = useModulesStore((s) => s.modules);
  const setModules = useModulesStore((s) => s.setModules);

  useEffect(() => {
    const fetchModule = async () => {
      const modules = await getModules();
      if (modules) setModules(modules);
    };
    fetchModule();
  }, []);

  return modules;
};

export default useModules;
