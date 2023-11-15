import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";

import { MenuProps } from "antd";
import type { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/shared/store/auth.store.ts";

export type GlobalHeaderRightProps = PropsWithChildren;

export const AvatarDropdown = ({ children }: GlobalHeaderRightProps) => {
  const navigate = useNavigate();
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "个人中心",
      onClick: () => {
        navigate("/account/profile");
      },
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "个人设置",
      onClick: () => {
        navigate("/account/settings");
      },
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        queryClient.clear();
        clearAuth();
        navigate("/sign-in", { replace: true });
      },
      label: "退出登录",
    },
  ];

  return (
    <Dropdown
      menu={{
        selectedKeys: [],
        onClick: (event) => {
          const { key } = event;
          if (key === "logout") {
            return;
          }
        },
        items: menuItems,
      }}
    >
      {children}
    </Dropdown>
  );
};
