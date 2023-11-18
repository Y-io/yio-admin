import { Navigate, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/layouts/AdminLayout.tsx";

import { useAccountProfile } from "@/query/hooks/account.ts";
import { useCallback, useMemo } from "react";
import { PageLoading } from "@ant-design/pro-components";
import { AxiosError } from "axios";
import { useAuthStore } from "@/shared/store/auth.store.ts";
import { Button } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import Result from "antd/es/result";

export const AuthorizeWrap = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const accountProfile = useAccountProfile();

  const authorized = useMemo(() => {
    if (accountProfile.error && accountProfile.error instanceof AxiosError) {
      const status = accountProfile.error.response?.status;
      if (status === 401) {
        return false;
      }
    }
    return true;
  }, [accountProfile]);

  if (!accessToken) {
    // token 不存在表示从未登录
    return <Navigate to={"/sign-in"} replace />;
  }

  if (accountProfile.isPending) {
    return <PageLoading />;
  }

  if (!authorized) {
    // 登录失效
    return <Unauthorized />;
  }

  return <AdminLayout />;
};

export const Unauthorized = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const clearAuthStore = useAuthStore((state) => state.clearAuth);

  const onClick = useCallback(() => {
    clearAuthStore();
    queryClient.clear();
    navigate("/sign-in", {
      replace: true,
    });
  }, []);

  return (
    <Result
      title={"登录信息已过期"}
      status={"error"}
      extra={[
        <Button key={"go-sign-in"} type={"primary"} onClick={onClick}>
          去登录
        </Button>,
      ]}
    />
  );
};
