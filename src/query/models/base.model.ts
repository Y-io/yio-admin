export interface IBaseModal {
  created: string;
  updated: string;
}

export interface IPaginationRes<T = unknown> extends IPagination {
  total: number;
  list: T;
}
