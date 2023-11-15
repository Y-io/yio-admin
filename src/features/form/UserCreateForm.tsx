import { ProForm, ProFormText } from "@ant-design/pro-components";

export const UserCreateForm = () => {
  return (
    <ProForm>
      <ProFormText
        name={"username"}
        label={"账号"}
        placeholder={"清输入账号"}
      />
      <ProFormText
        name={"password"}
        label={"密码"}
        placeholder={"清输入密码"}
      />
    </ProForm>
  );
};
