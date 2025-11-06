/* SPDX-FileCopyrightText: Nattika Jugkaeo <nattika.jugkaeo@uni-marburg.de>
	SPDX-License-Identifier: AGPL-3.0-or-later */

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";
import type { Criterion } from "../features/ontology/type";
import { useOntologyStore } from "./ontology-store";

enableMapSet();

type Store = {
  checkedItems: Set<string>;
  selectedItems: Record<string, Criterion>;
  addCheckedItem: (criteria: Criterion) => void;
  deleteCheckedItem: (criteria: Criterion) => void;
  toggleCheckedItem: (criteria: Criterion, isChecked: boolean) => void;
  toggleSelectedItem: (
    criteria: Criterion,
    action: "check" | "uncheck"
  ) => void;
  clearItems: () => void;
};

let flattenCriteriaCache: Record<string, Record<string, Criterion>> | null =
  null;

const getFlattenCriteria = () => {
  if (!flattenCriteriaCache) {
    flattenCriteriaCache = useOntologyStore.getState().flattenCriterion;
  }
  return flattenCriteriaCache;
};

const traverseChildrenNode = (children: Criterion[], isChecked: boolean) => {
  const { toggleCheckedItem, toggleSelectedItem } = useItemsStore.getState();
  for (const child of children) {
    toggleCheckedItem(child, isChecked);
    toggleSelectedItem(child, "uncheck");
    if (child.children) {
      traverseChildrenNode(child.children, isChecked);
    }
  }
};

const handleParent = (
  criterion: Criterion,
  currentSelectedItem: Criterion,
  isChecked: boolean
) => {
  const { toggleCheckedItem, toggleSelectedItem } = useItemsStore.getState();
  // get parent data from flattenCriteriaCache
  const flattenCriteria = getFlattenCriteria();
  let parent: Criterion | undefined =
    flattenCriteria[criterion.moduleId][criterion.parentId!];

  while (parent) {
    if (!parent.selectable) break;
    // call checkedItems inside while loop for reactive
    const { checkedItems } = useItemsStore.getState();

    if (isChecked) {
      const areAllChildrenChecked = parent.children?.every((child) =>
        checkedItems.has(child.id)
      );
      // all children are checked, check parent
      if (areAllChildrenChecked) {
        toggleCheckedItem(parent, isChecked);
        currentSelectedItem = parent;
      } else break;
    } else {
      // if unchecked
      if (checkedItems.has(parent.id)) {
        toggleCheckedItem(parent, isChecked);
        toggleSelectedItem(parent, "uncheck");

        // check sibling and add them to selectedItems
        parent.children?.forEach((child) => {
          const isChildChecked = checkedItems.has(child.id);
          if (isChildChecked) toggleSelectedItem(child, "check");
        });
      }
    }
    // set ancestor if available
    parent = parent.parentId
      ? flattenCriteria[parent.moduleId][parent.parentId!]
      : undefined;
  }
  return currentSelectedItem;
};

export const handleCheckbox = (criterion: Criterion, isChecked: boolean) => {
  const { toggleCheckedItem, toggleSelectedItem } = useItemsStore.getState();
  let currentSelectedItem: Criterion = criterion;

  // toggle current item
  toggleCheckedItem(criterion, isChecked);

  // handle all children
  if (criterion.children?.length) {
    traverseChildrenNode(criterion.children, isChecked);
  }
  // handle parent chain
  if (criterion.parentId) {
    currentSelectedItem = handleParent(
      criterion,
      currentSelectedItem,
      isChecked
    );
  }

  toggleSelectedItem(currentSelectedItem, isChecked ? "check" : "uncheck");
};

export const useItemsStore = create<Store>()(
  immer((set) => ({
    checkedItems: new Set<string>(),
    selectedItems: {} as Record<string, Criterion>,

    addCheckedItem: (criterion: Criterion) =>
      set((state) => {
        state.checkedItems.add(criterion.id);
      }),

    deleteCheckedItem: (criterion: Criterion) =>
      set((state) => {
        state.checkedItems.delete(criterion.id);
      }),

    toggleCheckedItem: (criterion: Criterion, isChecked: boolean) =>
      set((state) => {
        if (isChecked) state.checkedItems.add(criterion.id);
        else state.checkedItems.delete(criterion.id);
      }),

    toggleSelectedItem: (criterion: Criterion, action: "check" | "uncheck") =>
      set((state) => {
        if (action === "check") state.selectedItems[criterion.id] = criterion;
        else delete state.selectedItems[criterion.id];
      }),

    toggleSelectedItem2: (criterion: Criterion, isChecked: boolean) =>
      set((state) => {
        if (isChecked) state.selectedItems[criterion.id] = criterion;
        else delete state.selectedItems[criterion.id];
      }),

    clearItems: () =>
      set((state) => {
        state.checkedItems.clear();
        state.selectedItems = {};
      }),
  }))
);
