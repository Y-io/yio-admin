import { useMutation } from "@tanstack/react-query";
import { extractDataFromResponse } from "@/query/util.ts";
import { authorizedAxiosInstance } from "@/query/runtime.ts";
import type {
  ILoginRequest,
  ISignInSuccessModel,
} from "@/query/models/auth.model.ts";

export const useSignIn = () =>
  useMutation({
    mutationKey: ["auth", "sign-in"],
    mutationFn: (params: ILoginRequest) => {
      return extractDataFromResponse(() =>
        authorizedAxiosInstance.post<ISignInSuccessModel>(
          "/auth/sign-in",
          params,
        ),
      );
    },
  });
