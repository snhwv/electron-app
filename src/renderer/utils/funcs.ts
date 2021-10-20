import { createBrowserHistory } from "history";
import { ENUM_KEY, Persistent } from "./cache/persistent";
let history = createBrowserHistory();

export const goTo = function (path: string) {
  if (window.location.pathname !== path) {
    history.replace(path);
  }
};

export const arrayToObject = <T extends Recordable>(
  arr: T[],
  key: string,
  transfer?: (item: T) => any
) => {
  const obj: Recordable = {};
  arr.forEach((a: T) => (obj[a[key]] = transfer ? transfer(a) : a));
  return obj;
};

export const getAction = (item: any) => {
  return { ...item["x-effect-action"], type: "link" };
};

export const getValueEnum = (key: string, isValueEnum = true) => {
  const enums = Persistent.getSession(ENUM_KEY);
  const currentEnum = enums?.[key] || [];
  if (isValueEnum && currentEnum.length) {
    return arrayToObject(currentEnum, "value", (item) => {
      return {
        text: item.name,
      };
    });
  }
  return currentEnum;
};
export const getEnum = (key: string) => {
  const enums = Persistent.getSession(ENUM_KEY);
  const currentEnum = (enums?.[key] || []).map((item: any) => {
    return {
      value: item.value,
      label: item.name,
    };
  });
  return currentEnum;
};

export const overwriteMerge = (_destinationArray: any[], sourceArray: any[]) =>
  sourceArray;

export function guid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
