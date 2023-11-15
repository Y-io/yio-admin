import { MenuDataItem } from "@ant-design/pro-components";
import { useMemo } from "react";

export const useSidebarMenus = () => {
  return useMemo<MenuDataItem>(() => {
    return {
      path: "/",
      children: [
        {
          name: "Dashboard",
          path: "/dashboard",
        },
        {
          name: "系统管理",
          path: "/system",
          children: [
            {
              name: "用户管理",
              path: "/system/users",
            },
            {
              name: "菜单管理",
              path: "/system/menus",
            },
            {
              name: "角色管理",
              path: "/system/roles",
            },
            {
              name: "组织管理",
              path: "/system/organizations",
            },
          ],
        },
        {
          name: "账户中心",
          path: "/account",
          hideInMenu: true,
          children: [
            {
              name: "基本设置",
              path: "/account/profile",
              hideInMenu: true,
            },
          ],
        },
      ],
    };
  }, []);
};
