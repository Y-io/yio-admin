import { ProForm, ProFormProps, ProFormText } from "@ant-design/pro-components";
import { ILoginRequest } from "@/query/models/auth.model.ts";

export type AccountLoginFormProps = ProFormProps<ILoginRequest>;

export const AccountSignInForm = (props: AccountLoginFormProps) => {
  return (
    <ProForm<ILoginRequest> {...props}>
      <ProFormText
        name={"username"}
        label={"账号"}
        placeholder={"清输入账号"}
      />
      <ProFormText.Password
        name={"password"}
        label={"密码"}
        placeholder={"清输入密码"}
      />
    </ProForm>
  );
};
