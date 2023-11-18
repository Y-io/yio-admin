import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { authorizedAxiosInstance } from "@/query/runtime.ts";
import { IAccountModel } from "@/query/models/account.model.ts";
import { extractDataFromResponse } from "@/query/util.ts";
import { IUserModel } from "@/query/models/user.model.ts";
import { IPaginationRes } from "@/query/models/base.model.ts";
import { IMenuModel } from "@/query/models/menu.model.ts";

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
  user: {
    list: (filter: any) => ({
      queryKey: [filter],
      queryFn: () =>
        extractDataFromResponse(() =>
          authorizedAxiosInstance.get<IPaginationRes<IUserModel>>("/users", {
            params: filter,
          }),
        ),
    }),
  },
  menu: {
    list: (id = "") => ({
      queryKey: [id],
      queryFn: () =>
        extractDataFromResponse(() =>
          authorizedAxiosInstance.get<IMenuModel[]>("/menus", {
            params: { id: id },
          }),
        ),
    }),
  },
});
