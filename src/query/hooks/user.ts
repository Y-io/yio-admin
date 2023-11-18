import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/query/query-keys.ts";

export const useUserListQuery = () =>
  useQuery({
    ...queryKeys.user.list({
      page: 1,
      pageSize: 2,
      filter: {
        username: "",
      },
      orderBy: {
        username: "asc",
      },
    }),
  });
