import type { CriterionNode, SelectedCriteria } from "./type";
import FeasibilityCriterionItem from "./FeasibilityCriterionItem";
import { useSelectedCriteriaStore } from "@/app/store/selected-criteria-store";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  // arrayMove,
} from "@dnd-kit/sortable";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";

const SortableCriterion = ({
  item,
  index,
  logic,
}: {
  item: CriterionNode;
  index: number;
  logic?: string;
  onRemove: (uid: string) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.uid });
  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition: transition ?? "transform 200ms ease",
    visibility: isDragging ? ("hidden" as const) : undefined,
    willChange: "transform",
  };

  return (
    <FeasibilityCriterionItem
      index={index}
      item={item}
      logic={logic}
      dragProps={{ attributes, listeners, setNodeRef, style, isDragging }}
    />
  );
};

const FeasibilityCriteriaSortableList = ({
  selectedCriteria,
  onRemove,
}: {
  selectedCriteria: SelectedCriteria;
  onRemove: (uid: string) => void;
}) => {
  const reOrderCriteria = useSelectedCriteriaStore((s) => s.reOrderCriteria);
  const [activeId, setActiveId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const activeItem = useMemo(
    () => selectedCriteria.criteria.find((i) => i.uid === activeId) ?? null,
    [selectedCriteria, activeId],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragStart={({ active }) => {
        setActiveId(active.id as string);
      }}
      onDragEnd={({ active, over }) => {
        setActiveId(null);
        if (!over || active.id === over.id) return;
        // reorder
        reOrderCriteria(active, over, "inclusionCriteria");
      }}
    >
      <SortableContext
        items={selectedCriteria.criteria.map((i) => i.uid)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="flex flex-col gap-2">
          {selectedCriteria.criteria.map((item, idx) => (
            <SortableCriterion
              key={item.uid}
              item={item}
              logic={
                idx < selectedCriteria.criteria.length - 1
                  ? selectedCriteria.logics[idx]
                  : undefined
              }
              index={idx}
              onRemove={onRemove}
            />
          ))}
        </ul>
      </SortableContext>
      {/* UI Overlay */}
      <DragOverlay dropAnimation={{ duration: 100 }} zIndex={1}>
        {activeItem ? (
          <FeasibilityCriterionItem
            index={selectedCriteria.criteria.findIndex(
              (i) => i.uid === activeItem.uid,
            )}
            item={activeItem}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default FeasibilityCriteriaSortableList;
