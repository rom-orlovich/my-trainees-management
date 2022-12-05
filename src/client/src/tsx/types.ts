/* eslint-disable no-unused-vars */
export type AnyFun = (...arg: any[]) => any;
export type OmitKey<T, K extends keyof T> = Omit<T, K>;
export type PickKey<T, K extends keyof T> = Pick<T, K>;
export type RequireKey<T, K extends keyof T> = OmitKey<T, K> &
  Required<PickKey<T, K>>;
export type GenericRecord<T> = Record<string, T>;
export type ExtractKey<T, K extends T> = Extract<T, K>;
export type ExcludeKey<T, K extends T> = Exclude<T, K>;
