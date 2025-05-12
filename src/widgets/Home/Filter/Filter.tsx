import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/useDebounce";
import { useFilterContext } from "@/shared/context/FilterContext/FilterContext";
import { useCallback, useState, type ChangeEvent } from "react";

const Filter = () => {
  const { setSearch } = useFilterContext();
  const [localSearch, setLocalSearch] = useState("");

  const updateSearch = useCallback((newQuery: string) => {
    setSearch(newQuery);
  }, []);

  const debouncedSendSearch = useDebounce<(newQuery: string) => void>(
    updateSearch,
    500
  );

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    debouncedSendSearch(e.target.value);
  };

  return (
    <section className="flex flex-col md:flex-row gap-4 items-center">
      <div className="flex-1 w-full">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search items..."
          value={localSearch}
          onChange={(e) => onInputChange(e)}
        />
      </div>
    </section>
  );
};

export default Filter;
