/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
SPDX-License-Identifier: AGPL-3.0-or-later */

import { useCallback, useState, type DragEvent } from "react";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import { DRAG_DATA_FORMATS } from "@app/constants/dragTypes";
import type { Criterion } from "@app/types/ontologyType";
import type { DropZone, CriterionNode } from "../type";
import generateId from "@/app/utils/generateUID";

const useCriteriaDnD = () => {
  const { addNewCriteria } = useSelectedCriteriaStore();
  const [activeZone, setActiveZone] = useState<DropZone | null>(null);

  const uid = generateId();

  const dropZoneClasses = useCallback(
    (zone: DropZone) =>
      /* min-h-[180px] */
      `flex flex-col gap-3 border-2 border-dashed rounded-md px-4 py-4 transition-colors ${
        activeZone === zone
          ? "border-blue-500 bg-blue-50"
          : "border-[var(--color-border)] bg-white"
      }`,
    [activeZone],
  );

  const handleDragOver = useCallback(
    (zone: DropZone) => (event: DragEvent<HTMLDivElement>) => {
      const expectedType =
        zone === "attribute"
          ? DRAG_DATA_FORMATS.ATTRIBUTE
          : DRAG_DATA_FORMATS.CRITERION;
      if (event.dataTransfer.types.includes(expectedType)) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        setActiveZone(zone);
      } else {
        event.dataTransfer.dropEffect = "none";
      }
    },
    [],
  );

  const handleCriteriaDrop = useCallback(
    (zone: Exclude<DropZone, "attribute">) =>
      (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setActiveZone(null);
        const data = event.dataTransfer.getData(DRAG_DATA_FORMATS.CRITERION);
        event.dataTransfer.clearData(DRAG_DATA_FORMATS.CRITERION);
        if (!data) return;
        const criterion = JSON.parse(data) as Criterion;
        const newCriterion: CriterionNode = {
          uid: uid,
          criterion,
          isExpanded: false,
        };
        addNewCriteria(newCriterion, zone);
      },
    [addNewCriteria, uid],
  );

  const handleDragLeave = useCallback(
    (zone: DropZone) => (event: DragEvent<HTMLDivElement>) => {
      const related = event.relatedTarget as Node | null;
      if (!related || !event.currentTarget.contains(related)) {
        setActiveZone((current) => (current === zone ? null : current));
      }
    },
    [],
  );

  return {
    activeZone,
    dropZoneClasses,
    handleDragOver,
    handleDragLeave,
    handleCriteriaDrop,
  };
};

export default useCriteriaDnD;
