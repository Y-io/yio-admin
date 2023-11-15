import { useAuthStore } from "@/shared/store/auth.store";
import { message } from "antd";
import type { CreateAxiosDefaults } from "axios";
import axiosStatic from "axios";
import { processEnv } from "@/shared/constants/process-env.ts";

const config: CreateAxiosDefaults = {
  baseURL: processEnv.BASE_API_URL + "/api/v1",
  timeout: 10000,
};

const getToken = () => {
  const authStore = useAuthStore.getState();

  return authStore?.accessToken ? `Bearer ${authStore.accessToken}` : "";
};

export const baseAxiosInstance = axiosStatic.create(config);

baseAxiosInstance.interceptors.request.use(
  (value) => value,
  (error) => {
    if (error?.code === "ECONNABORTED") {
      void message.error("服务器连接超时");
    }
  },
);

export const authorizedAxiosInstance = axiosStatic.create(config);

authorizedAxiosInstance.interceptors.request.use((value) => {
  value.headers.set("Authorization", getToken());
  return value;
});

authorizedAxiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const httpStatus = error?.response?.status;

    if (
      error.code === "ECONNABORTED" ||
      error.message === "Network Error" ||
      error.message.includes("timeout")
    ) {
      void message.error("服务器连接超时");
    } else if (httpStatus === 403) {
      void message.error("当前操作无权限");
    } else if (httpStatus === 409) {
      void message.error("该数据有其他关联，无法删除");
    }

    return Promise.reject(error);
  },
);
