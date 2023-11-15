import { Outlet } from "react-router-dom";
import { PageContainer } from "@ant-design/pro-components";

export const SystemLayout = () => {
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}
      content={<Outlet />}
    />
  );
};
