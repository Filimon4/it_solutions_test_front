import { SelectableCardList } from "@/enitites/Filter/SelectableCardList/SelectableCardList";
import usePaginatedItems from "@/hooks/usePaginatedItems";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useMoveItem from "@/lib/queries/useMoveItem/useMoveItem";

const Items = () => {
  const {
    search,
    allItems,
    fetchNextPage,
    moveItem,
    isError,
    isFetching,
    isSuccess,
    totalPages,
    page,
  } = usePaginatedItems("cachePageOne");
  const { mutate } = useMoveItem();
  const sensors = useSensors(useSensor(PointerSensor));

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (!isFetching && inView && page < totalPages) {
      fetchNextPage();
    }
  }, [inView]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = allItems.findIndex((item) => item.id === active.id);
    const newIndex = allItems.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    moveItem(oldIndex, newIndex);
    mutate({
      from: oldIndex,
      to: newIndex,
      search: search,
    });
  };

  if (isError) return <p className="text-red-500">Failed to load data</p>;

  return (
    <section className="h-screen flex flex-col overflow-hidden">
      <div className="h-full overflow-auto relative overflow-x-hidden">
        {allItems.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <>Погрузка данных...</>
          </div>
        ) : (
          <>
            <DndContext
              onDragEnd={handleDragEnd}
              sensors={sensors}
              collisionDetection={closestCenter}
              autoScroll={false}
            >
              <SortableContext
                items={allItems.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <SelectableCardList items={allItems} />
              </SortableContext>
            </DndContext>
            {isFetching && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <>Погрузка данных...</>
              </div>
            )}
            {isSuccess && <div ref={ref} className="h-10" />}
          </>
        )}
      </div>
    </section>
  );
};

export default Items;
