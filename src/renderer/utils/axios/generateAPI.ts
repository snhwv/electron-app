import { defHttp } from "./index";
import { is } from "../is";

const generateAPI = <T extends { [key: string]: (string & {}) | Recordable[] }>(
  apis: T
): {
  [key in keyof T]: (params?: Recordable) => Promise<any>;
} => {
  const keys = Object.keys(apis);
  const result: any = {};
  keys.forEach((item) => {
    const apiItem = (apis as any)[item];
    let val;
    if (typeof apiItem === "string") {
      const strArr = apiItem.split(" ");
      if (strArr.length === 1) {
        val = (params: any) => {
          return defHttp.get({
            url: strArr[0],
            params,
          });
        };
      } else {
        val = (data: any) =>
          (defHttp as any)[strArr[1]]({
            url: strArr[0],
            data,
          });
      }
    } else if (is(apiItem, "Object")) {
      val = (params: any) => defHttp.request({ ...apiItem, ...params });
    } else if (is(apiItem, "Array")) {
      val = (params: any) =>
        defHttp.request({ ...apiItem[0], ...params }, apiItem[1]);
    }
    result[item] = val;
  });
  return result;
};
export default generateAPI;
