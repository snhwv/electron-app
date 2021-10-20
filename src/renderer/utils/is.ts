export function isFunction(val: unknown): val is Function {
  return typeof val === "function";
}
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    is(val, "Promise") &&
    isObject(val) &&
    isFunction(val.then) &&
    isFunction(val.catch)
  );
}

export function isString(val: unknown): val is string {
  return is(val, "String");
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, "Object");
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== "undefined";
}

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}
export function isFake(val: unknown): boolean {
  return isUnDef(val) || isNull(val) || val === "";
}
export function notFake(val: unknown): boolean {
  return !isFake(val);
}
