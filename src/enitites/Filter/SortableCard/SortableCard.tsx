import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

export const SortableCard = ({
  item,
}: {
  item: { id: number; message: string };
}) => {
  const [selected, setSelected] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`w-full ${selected ? "bg-muted" : ""}`}
    >
      <CardContent className="p-1 flex items-center gap-4">
        <Checkbox
          checked={selected}
          onCheckedChange={() => setSelected((prev) => !prev)}
        />
        <div>
          <h3 className="text-lg font-semibold">{item.id}</h3>
          <h3 className="text-lg font-semibold">{item.message}</h3>
        </div>
      </CardContent>
    </Card>
  );
};
