import { AxiosResponse } from "axios";
import { PromiseType } from "utility-types";

type AxiosInstanceFN = () => Promise<AxiosResponse<any>>;

type ExtractAxiosResponseType<T extends AxiosResponse<any>> =
  T extends AxiosResponse<infer U> ? U : never;

export const extractDataFromResponse = async <T extends AxiosInstanceFN>(
  fn: T,
): Promise<ExtractAxiosResponseType<PromiseType<ReturnType<T>>>> => {
  const res = await fn();
  return res.data;
};
