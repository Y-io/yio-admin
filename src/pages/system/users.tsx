import { useUserListQuery } from "@/query/hooks/user.ts";
import { ProTable } from "@ant-design/pro-components";

export const UserManagement = () => {
  const userQueryResult = useUserListQuery();
  console.log(userQueryResult.data);
  return (
    <ProTable
      rowKey={"id"}
      dataSource={userQueryResult.data?.list}
      columns={[
        { dataIndex: "username", title: "账号" },
        { dataIndex: "email", title: "邮箱" },
        { dataIndex: "roles", title: "角色" },
      ]}
    />
  );
};
