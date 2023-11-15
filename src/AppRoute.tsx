import { Navigate, Route, Routes } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout.tsx";
import { AuthLayout } from "@/layouts/AuthLayout.tsx";
import { AuthorizeWrap } from "@/layouts/AuthorizeWrap.tsx";
import { SignInPage } from "@/pages/auth/sign-in.tsx";
import { Dashboard } from "@/pages/dashboard.tsx";
import { UserManagement } from "@/pages/system/users.tsx";
import { MenuManagement } from "@/pages/system/menu.tsx";
import { RoleManagement } from "@/pages/system/roles.tsx";
import { OrganizationsManagement } from "@/pages/system/organizations.tsx";
import { SystemLayout } from "@/layouts/SystemLayout.tsx";
import { NotFound } from "@/pages/404.tsx";
import { AccountLayout } from "@/layouts/AccountLayout.tsx";
import { AccountProfile } from "@/pages/account/profile.tsx";

export const AppRoute = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<AuthLayout />}>
          <Route path={"/sign-in"} element={<SignInPage />} />
        </Route>
        <Route element={<AuthorizeWrap />}>
          <Route index element={<Navigate to={"/dashboard"} />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/system"} element={<SystemLayout />}>
            <Route path={"users"} element={<UserManagement />} />
            <Route path={"menus"} element={<MenuManagement />} />
            <Route path={"roles"} element={<RoleManagement />} />
            <Route
              path={"organizations"}
              element={<OrganizationsManagement />}
            />
          </Route>

          <Route path={"/account"} element={<AccountLayout />}>
            <Route path={"profile"} element={<AccountProfile />} />
          </Route>

          <Route path={"*"} element={<NotFound />} />
        </Route>
        <Route path={"*"} element={<NotFound />} />
      </Route>
    </Routes>
  );
};
