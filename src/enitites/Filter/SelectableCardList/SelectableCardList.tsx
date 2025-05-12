import { SortableCard } from "../SortableCard/SortableCard";

interface SelectableCardListProps {
  items: {
    id: number;
    message: string;
  }[];
}

export const SelectableCardList = ({ items }: SelectableCardListProps) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <SortableCard key={item.id} item={item} />
      ))}
    </div>
  );
};
