import { ProTable } from "@ant-design/pro-components";
import { useDeleteMenuMutation, useMenuListQuery } from "@/query/hooks/menu.ts";
import { Button, message, Popconfirm, Space } from "antd";
import { IMenuModel, MenuTypeEnum } from "@/query/models/menu.model.ts";
import { useCreateOrEditMenuForm } from "@/features/form/CreateOrEditMenuForm.tsx";
import { queryKeys } from "@/query/query-keys.ts";
import { useQueryClient } from "@tanstack/react-query";

export const MenuManagement = () => {
  const queryResult = useMenuListQuery();
  const menuModal = useCreateOrEditMenuForm();

  return (
    <ProTable
      rowKey={"id"}
      dataSource={queryResult.data}
      expandable={{
        expandIcon: ({ onExpand, record, expanded }) => {
          if (record.type === MenuTypeEnum.BUTTON)
            return (
              <span
                style={{
                  marginRight: 24,
                  marginTop: 5,
                }}
              />
            );

          return (
            <Button
              onClick={(e) => {
                onExpand(record, e);
              }}
              className={`ant-table-row-expand-icon  ant-table-row-expand-icon-${
                expanded ? "expanded" : "collapsed"
              }`}
            />
          );
        },
      }}
      columns={[
        { dataIndex: "name", title: "名称" },
        {
          dataIndex: "options",
          title: "操作",
          width: 100,
          align: "right",
          render: (_d, entity) => <MenuTableActions entity={entity} />,
        },
      ]}
      toolBarRender={() => {
        return [
          <Button
            key={"add"}
            type={"primary"}
            onClick={() => {
              void menuModal.show();
            }}
          >
            新增
          </Button>,
        ];
      }}
    />
  );
};

const MenuTableActions = ({ entity }: { entity: IMenuModel }) => {
  const queryClient = useQueryClient();
  const menuModal = useCreateOrEditMenuForm();
  const deleteMenu = useDeleteMenuMutation();
  const disabledDel = Boolean(entity.children.length);
  return (
    <Space>
      {entity?.type === MenuTypeEnum.DIRECTORY ? (
        <Button
          size={"small"}
          onClick={() => {
            void menuModal.show({
              parentId: entity.id,
            });
          }}
        >
          新增
        </Button>
      ) : null}
      <Button
        size={"small"}
        onClick={() => {
          void menuModal.show({
            initialValues: {
              id: entity.id,
              identify: entity.identify,
              name: entity.name,
              type: entity.type,
            },
          });
        }}
      >
        编辑
      </Button>

      <Popconfirm
        title={"确认删除该菜单？"}
        disabled={disabledDel}
        onConfirm={() => {
          if (deleteMenu.isPending) return;
          deleteMenu.mutate(entity.id, {
            onSuccess() {
              void queryClient.invalidateQueries({
                queryKey: queryKeys.menu.list._def,
              });
              void message.success("已删除！");
            },
            onError() {
              void message.warning("删除失败！");
            },
          });
        }}
      >
        <Button
          size={"small"}
          disabled={disabledDel}
          loading={deleteMenu.isPending}
        >
          删除
        </Button>
      </Popconfirm>
    </Space>
  );
};
