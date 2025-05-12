import type { FilterParameters } from "@/shared/context/FilterContext/FilterContext";
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface axiosResponseElements {
  page: number;
  elements: {
    id: number;
    message: string;
    position: number;
  }[];
  total: number;
}

export const fetchElements = async (filters: FilterParameters) => {
  try {
    const { data } = await axios.get<
      axiosResponseElements,
      AxiosResponse<axiosResponseElements, FilterParameters>,
      FilterParameters
    >(`${VITE_BACKEND_URL}/elements`, {
      params: { ...filters },
    });

    return {
      page: data.page ?? 1,
      elements: data.elements ?? [],
      total: data.total ?? 0,
    };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      page: 1,
      elements: [
        {
          id: 1,
          message: 'Тест',
          position: 0,
        },
        {
          id: 2,
          message: 'Тест1',
          position: 1,
        },
        {
          id: 3,
          message: 'Тест2',
          position: 2,
        },
        {
          id: 4,
          message: 'Тест3',
          position: 3,
        },
        {
          id: 5,
          message: 'Тест4',
          position: 4,
        },
        {
          id: 6,
          message: 'Тест5',
          position: 5,
        },
      ],
      total: 0,
    };
  }
};

export const useFetchItems = (filters: FilterParameters) => {
  return useQuery({
    queryKey: ["elements", filters.page],
    queryFn: () => fetchElements(filters),
    retryOnMount: false,
    refetchInterval: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
