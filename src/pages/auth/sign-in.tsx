import { AccountSignInForm } from "@/features/form/AccountSignInForm.tsx";
import { useSignIn } from "@/query/hooks/auth.ts";
import { useAuthStore } from "@/shared/store/auth.store.ts";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export const SignInPage = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const setAuthState = useAuthStore((state) => state.setAuth);
  return (
    <AccountSignInForm
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
            // console.log("失败", error);
          },
        });
        return Boolean(res);
      }}
    />
  );
};
