import { ProForm, ProFormRadio, ProFormText } from "@ant-design/pro-components";

import NiceModal, { antdDrawerV5 } from "@ebay/nice-modal-react";
import { IUpdateMenu, MenuTypeEnum } from "@/query/models/menu.model.ts";
import { useCreateMenuMutation } from "@/query/hooks/menu.ts";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/query/query-keys.ts";
import { Drawer } from "antd";

export const CreateOrEditMenuForm = NiceModal.create<{
  initialValues: IUpdateMenu;
  parentId?: string;
}>((props) => {
  const queryClient = useQueryClient();
  const drawer = NiceModal.useModal();
  const createMenuMutation = useCreateMenuMutation();

  const isAdd = useMemo(
    () => !props?.initialValues?.id,
    [props?.initialValues?.id],
  );

  return (
    <Drawer {...antdDrawerV5(drawer)} title={isAdd ? "新建菜单" : "编辑菜单"}>
      <ProForm
        initialValues={props.initialValues}
        loading={createMenuMutation.isPending}
        onFinish={async (values) => {
          if (isAdd) {
            await createMenuMutation.mutateAsync(
              {
                name: values.name,
                identify: values.identify,
                type: values.type,
                parentId: props?.parentId,
              },
              {
                onSuccess(data) {
                  queryClient.invalidateQueries({
                    queryKey: queryKeys.menu.list._def,
                  });
                  drawer.resolve(data);
                  drawer.hide();
                },
              },
            );
          }
        }}
      >
        <ProFormText name={"name"} label={"名称"} placeholder={"清输入名称"} />
        <ProFormText name={"identify"} label={"标识"} placeholder={"清输入"} />
        <ProFormRadio.Group
          name="type"
          label="类别"
          options={[
            {
              label: "目录",
              value: MenuTypeEnum.DIRECTORY,
            },
            {
              label: "按钮",
              value: MenuTypeEnum.BUTTON,
            },
          ]}
        />
      </ProForm>
    </Drawer>
  );
});

export const useCreateOrEditMenuForm = () =>
  NiceModal.useModal(CreateOrEditMenuForm);
