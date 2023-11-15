import { Result, ResultProps } from "antd";
import { PropsWithChildren } from "react";

export type NotAuthorizedProps = PropsWithChildren<ResultProps>;
export const NotAuthorized = ({ children, ...props }: NotAuthorizedProps) => {
  return (
    <Result status="403" title="抱歉，您无权访问" {...props}>
      {children}
    </Result>
  );
};
