import { useAuthStore } from "@/shared/store/auth.store.ts";
import { Navigate } from "react-router-dom";
import { AdminLayout } from "@/layouts/AdminLayout.tsx";
import { appQueryClient } from "@/query/query-client.ts";
import { queryKeys } from "@/query/query-keys.ts";
import { useAccountProfile } from "@/query/hooks/account.ts";
import { PropsWithChildren } from "react";
import { PageLoading } from "@ant-design/pro-components";

export const AuthorizeWrap = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to={"/sign-in"} replace />;
  }
  return (
    <InitAccessProfile>
      <AdminLayout />
    </InitAccessProfile>
  );
};

export const InitAccessProfile = ({ children }: PropsWithChildren) => {
  const accountProfile = useAccountProfile();

  if (accountProfile.isLoading) {
    return <PageLoading />;
  }
  return children;
};

export const authorizeLoader = async () => {
  return appQueryClient.fetchQuery({
    ...queryKeys.account.profile(),
  });
};
