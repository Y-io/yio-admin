import { AccountSignInForm } from "@/features/form/AccountSignInForm.tsx";
import { useSignIn } from "@/query/hooks/auth.ts";
import { useAuthStore } from "@/shared/store/auth.store.ts";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { ProCard } from "@ant-design/pro-components";

export const SignInPage = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const setAuthState = useAuthStore((state) => state.setAuth);
  return (
    <ProCard
      layout={"center"}
      ghost
      style={{
        marginTop: 200,
      }}
    >
      <ProCard
        title={"登录"}
        layout={"center"}
        bordered
        colSpan={{ xs: 24, sm: 16, md: 12, lg: 8, xl: 8 }}
      >
        <AccountSignInForm
          style={{
            width: "100%",
          }}
          isKeyPressSubmit
          loading={signIn.isPending}
          onFinish={async (values) => {
            const res = await signIn.mutateAsync(values, {
              onSuccess(data) {
                void message.success("登录成功");
                setAuthState(data);
                navigate("/");
              },
              onError() {
                void message.error("登录失败");
              },
            });
            return Boolean(res);
          }}
        />
      </ProCard>
    </ProCard>
  );
};
