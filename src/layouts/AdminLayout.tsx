import { Link, Outlet, useLocation } from "react-router-dom";
import { ProLayout } from "@ant-design/pro-components";
import { useSidebarMenus } from "@/layouts/useSidebarMenus.tsx";
import { Typography } from "antd";
import { useAccountProfile } from "@/query/hooks/account.ts";
import { AvatarDropdown } from "@/layouts/components/AvatarDropdown.tsx";

export const AdminLayout = () => {
  const location = useLocation();
  const sidebarMenus = useSidebarMenus();
  const account = useAccountProfile();

  return (
    <ProLayout
      title={"后台管理系统"}
      avatarProps={{
        src: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        title: <Typography>{account.data?.username}</Typography>,
        render: (_props, avatarChildren) => {
          return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
        },
      }}
      layout={"side"}
      location={{
        pathname: location.pathname,
      }}
      fixSiderbar
      route={sidebarMenus}
      menuItemRender={(item, defaultDom) => {
        if (item.children || !item.path) return defaultDom;

        return (
          <Link
            to={item.path}
            state={{
              label: item.name,
              path: item.path,
            }}
          >
            {defaultDom}
          </Link>
        );
      }}
    >
      <Outlet />
    </ProLayout>
  );
};
