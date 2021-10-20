declare interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // Error message prompt type
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
}
interface Result<T = any> {
  status: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  data: T;
}

declare type Recordable<T = any> = Record<string, T>;

declare type Nullable<T> = T | null;
declare module '*.less';
type ValueOf<T> = T[keyof T];
