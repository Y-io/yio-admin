import { IBaseModal } from "@/query/models/base.model.ts";

export enum MenuTypeEnum {
  DIRECTORY = "directory",
  BUTTON = "button",
}
export interface IMenuModel extends IBaseModal {
  name: string;
  identify: string;
  type: MenuTypeEnum;
  children: IMenuModel[];
  parent: IMenuModel;
}

export interface IUpdateMenu
  extends Pick<IMenuModel, "name" | "identify" | "type" | "id"> {
  parentId?: string;
}

export interface ICreateMenu extends Omit<IUpdateMenu, "id"> {}
