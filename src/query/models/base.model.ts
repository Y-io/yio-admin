export interface IBaseModal {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IPaginationRes<T = unknown> extends IPagination {
  total: number;
  list: T[];
}
