import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/query/query-keys.ts";
import { authorizedAxiosInstance } from "@/query/runtime.ts";
import { ICreateMenu } from "@/query/models/menu.model.ts";

export const useMenuListQuery = (id?: string) =>
  useQuery({
    ...queryKeys.menu.list(id),
  });

export const useCreateMenuMutation = () =>
  useMutation({
    mutationFn: (data: ICreateMenu) =>
      authorizedAxiosInstance.post("/menus", data),
  });

export const useDeleteMenuMutation = () =>
  useMutation({
    mutationFn: (id: string) => authorizedAxiosInstance.delete(`/menus/${id}`),
  });
