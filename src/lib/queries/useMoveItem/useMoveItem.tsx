import { useMutation } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";

interface MoveItemPayload {
  from: number;
  to: number;
  search: string;
}

const moveItemRequest = async (payload: MoveItemPayload) => {
  const response = await axios.put<
    MoveItemPayload,
    AxiosResponse<MoveItemPayload, unknown>,
    MoveItemPayload
  >(`${import.meta.env.VITE_BACKEND_URL}/elements/move`, payload);
  return response.data;
};

const useMoveItem = () => {
  return useMutation({
    mutationFn: moveItemRequest,
  });
};
export default useMoveItem;
