import { useFetchItems } from "@/lib/queries/useFetchItems/useFetchItems";
import { useFilterContext } from "@/shared/context/FilterContext/FilterContext";
import { useEffect, useMemo, useState } from "react";

const usePaginatedItems = (cachePageName: string) => {
  const { search, page, size, setPage } = useFilterContext();
  const [allItems, setAllItems] = useState<
    { id: number; message: string; position: number }[]
  >([]);

  const { data, isError, isFetching, isSuccess, refetch } = useFetchItems({
    search: search,
    page: page,
    size: size,
  });
  console.log(data);

  const refetchItems = (search: string = "") => {
    const cachedPage = localStorage.getItem(`${search}-${cachePageName}`);
    if (cachedPage) {
      setAllItems((prev) => {
        const newItems = JSON.parse(cachedPage).filter(
          (item: { id: number; message: string }) =>
            !prev.find((existing) => existing.id === item.id)
        );
        return [...prev, ...newItems];
      });
    } else {
      if (allItems.length === 0) {
        refetch();
      }
    }
  };

  const totalPages = useMemo(() => {
    return data?.total || 1;
  }, [data, isFetching, isSuccess, isError]);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    setPage(1);
    refetchItems();
    refetch();
  }, [search]);

  useEffect(() => {
    if (data?.elements) {
      setAllItems((prev) => {
        const newItems = data.elements.filter(
          (item: { id: number; message: string; position: number }) =>
            !prev.find((existing) => existing.id === item.id)
        );
        return [...prev, ...newItems];
      });
    }
  }, [data]);

  useEffect(() => {
    if (page === 1 && data?.elements?.length && data.page === 1) {
      localStorage.setItem(
        `${search}-${cachePageName}`,
        JSON.stringify(data.elements)
      );
    }
  }, [data, page]);

  useEffect(() => {
    refetchItems();
  }, []);

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    setAllItems((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated.map((item, idx) => ({ ...item, position: idx }));
    });
  };

  return {
    search,
    totalPages,
    page,
    allItems,
    fetchNextPage,
    moveItem,
    isError,
    isFetching,
    isSuccess,
  };
};

export default usePaginatedItems;
