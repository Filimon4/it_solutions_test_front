import { createContext, useContext, useState } from "react";

export interface FilterParameters {
  search: string; 
  page: number;
  size: number;
}

interface FilterContextType extends FilterParameters {
  setSearch: (value: string) => void;
  setPage: (value: number) => void;
  setSize: (value: number) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);

  return (
    <FilterContext.Provider value={{ search, setSearch, page, setPage, size, setSize }}>
      {children}
    </FilterContext.Provider>
  );
};
