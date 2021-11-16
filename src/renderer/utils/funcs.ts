import { createBrowserHistory } from 'history';
import { ENUM_KEY, Persistent } from './cache/persistent';
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
  return { ...item['x-effect-action'], type: 'link' };
};

export const getValueEnum = (key: string, isValueEnum = true) => {
  const enums = Persistent.getSession(ENUM_KEY);
  const currentEnum = enums?.[key] || [];
  if (isValueEnum && currentEnum.length) {
    return arrayToObject(currentEnum, 'value', (item) => {
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
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
/**
 * 大数字转换，将大额数字转换为万、千万、亿等
 * @param value 数字值
 */
export function toShortZHNumber(value: number) {
  const newValue = ['', '', ''];
  let fr = 1000;
  let num = 3;
  let text1 = '';
  let fm = 1;
  while (value / fr >= 1) {
    fr *= 10;
    num += 1;
  }
  if (num <= 4) {
    // 千
    newValue[0] = (value / 1000).toFixed(0) + '';
    newValue[1] = '千';
  } else if (num <= 8) {
    // 万
    text1 = (num - 4) / 3 > 1 ? '千万' : '万';
    // tslint:disable-next-line:no-shadowed-variable
    fm = text1 === '万' ? 10000 : 10000000;
    if (value % fm === 0) {
      newValue[0] = (value / fm).toFixed(0) + '';
    } else {
      newValue[0] = (value / fm).toFixed(2) + '';
    }
    newValue[1] = text1;
  } else if (num <= 16) {
    // 亿
    text1 = (num - 8) / 3 > 1 ? '千亿' : '亿';
    text1 = (num - 8) / 4 > 1 ? '万亿' : text1;
    text1 = (num - 8) / 7 > 1 ? '千万亿' : text1;
    // tslint:disable-next-line:no-shadowed-variable
    fm = 1;
    if (text1 === '亿') {
      fm = 100000000;
    } else if (text1 === '千亿') {
      fm = 100000000000;
    } else if (text1 === '万亿') {
      fm = 1000000000000;
    } else if (text1 === '千万亿') {
      fm = 1000000000000000;
    }
    if (value % fm === 0) {
      newValue[0] = (value / fm).toFixed(0) + '';
    } else {
      newValue[0] = (value / fm).toFixed(2) + '';
    }
    newValue[1] = text1;
  }
  if (value < 1000) {
    newValue[0] = value + '';
    newValue[1] = '';
  }
  return newValue.join('');
}

export function formatDuration(value: number) {
  const minute = Math.floor(value / 60);
  const secondLeft = value - minute * 60;
  return `${minute}:${
    secondLeft < 9 ? `0${secondLeft.toFixed(0)}` : secondLeft.toFixed(0)
  }`;
}
