import { generateNameWithEnv } from "@/shared/constants/process-env";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ISignInSuccessModel } from "@/query/models/auth.model.ts";
import dayjs from "dayjs";

interface AuthState extends Partial<ISignInSuccessModel> {
  expiryDate?: number;
}

interface AuthActions {
  setAuth: (params: ISignInSuccessModel) => void;
  clearAuth: () => void;
  isExpired: () => boolean;
}

interface AuthStore extends AuthState, AuthActions {}

export const useAuthStore = create(
  devtools(
    persist<AuthStore>(
      (set, get) => ({
        setAuth: (params) => {
          set({
            ...params,
            expiryDate: dayjs().add(params.expiresIn, "ms").unix(),
          });
        },
        clearAuth: () => {
          set({
            accessToken: "",
            expiresIn: -1,
          });
        },
        isExpired: () => dayjs().isAfter(get().expiryDate),
      }),

      {
        name: generateNameWithEnv("Authorization"),
      },
    ),
  ),
);
