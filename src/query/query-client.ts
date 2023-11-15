import { QueryClient } from "@tanstack/react-query";
import type { UndefinedInitialDataOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      retry: (_failureCount, error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          // 当用户权限验证不通过或者失败，不再重试
          if (status === 401 || status === 403 || status === 409) return false;
        }
        return true;
      },
    },
  },
});

export type QueryDataOptions = Partial<
  Pick<UndefinedInitialDataOptions, "enabled"> & {
    refetchInterval: number | false;
  }
>;
