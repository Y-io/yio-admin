import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/query/query-keys.ts";

// 账户信息
export const useAccountProfile = () =>
  useQuery({
    ...queryKeys.account.profile(),
  });
