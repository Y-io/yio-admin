import Result from "antd/es/result";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <Result
    status={404}
    title={"404"}
    subTitle={"未找到当前页面"}
    extra={<Link to="/home">返回主页</Link>}
  />
);
