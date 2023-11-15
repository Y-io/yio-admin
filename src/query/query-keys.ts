import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { authorizedAxiosInstance } from "@/query/runtime.ts";
import { IAccountModel } from "@/query/models/account.model.ts";
import { extractDataFromResponse } from "@/query/util.ts";

export const queryKeys = createQueryKeyStore({
  account: {
    profile: () => ({
      queryKey: [""],
      queryFn: () =>
        extractDataFromResponse(() =>
          authorizedAxiosInstance.get<IAccountModel>("/account/profile"),
        ),
    }),
  },
});
