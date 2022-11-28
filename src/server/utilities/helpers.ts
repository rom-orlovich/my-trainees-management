/* eslint-disable no-restricted-syntax */

import { GenericRecord } from "./types";

/**
 *
 * @param promise Gets the promise in pending state.
 * @returns Awaits the promise and return [res, undefined] in case
 * the promise is resolved or return [undefined,error] in case
 * the promise is rejected.
 */
export const promiseHandler = async <T, E = Error>(promise: Promise<T>) => {
  try {
    const res = await promise;
    return [res as T, undefined] as const;
  } catch (error) {
    return [undefined, error as E] as const;
  }
};
export const makeUniqueArr = (arr: any[]) => [...new Set(arr)];

/**
 *
 * @param data Gets  some data.
 * @param error Gets some error.
 * @returns [data,error] as const array.
 * @description Functions that return array of data and error are not constant.
 * The function return the array as constant array.
 */
export const dataOrErrorResponseAsConst = <T>(
  data: T,
  error: Error | undefined
) => {
  if (error) return [undefined, error] as const;
  return [data as T, undefined] as const;
};
export function createObjValuesArr(obj: object) {
  return Object.values(obj);
}
export function createObjKeysArr(obj: object) {
  return Object.keys(obj);
}

export const formatDate = (date: Date, plusDay = 1) => {
  const newDate = new Date(date);

  const formatted = new Date(
    newDate.getTime() + Math.abs(newDate.getTimezoneOffset() * 60000)
  );
  formatted.setDate(newDate.getDate() + plusDay);
  return formatted.toLocaleDateString("en-CA");
};

export const getFilename = (filename: string) =>
  filename.slice(__dirname.length + 1);

export interface AddToDate {
  yPlus?: number;
  mPlus?: number;
  dPlus?: number;
  hPlus?: number;
  minPlus?: number;
}

export const newDate = (date: Date | number | string, add?: AddToDate) => {
  const curDate = new Date(date);
  const year = curDate.getFullYear();
  const month = curDate.getMonth();
  const day = curDate.getDate();
  const hour = curDate.getHours();
  const minutes = curDate.getMinutes();

  return new Date(
    year + (add?.yPlus || 0),
    month + (add?.mPlus || 0),
    day + (add?.dPlus || 0),
    hour + (add?.hPlus || 0),
    minutes + (add?.minPlus || 0)
  );
};

export const shuffleArr = <T>(arr: T[]) => {
  const copyArr = arr.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
  }
  return copyArr;
};

export const sortBy = (arr: number[], isAscOrder = true) => {
  const ascOrder = (a: number, b: number) => a - b;
  const desOrder = (a: number, b: number) => b - a;
  const curOrder = isAscOrder ? ascOrder : desOrder;
  return arr.sort(curOrder);
};

export const filterArrObjBy = <T, K extends keyof T>(
  arr: T[],
  key: K,
  values: T[K][]
) => arr.filter((el) => values.includes(el[key]));

export const sortArrObjBy = <T extends GenericRecord<any>, K extends keyof T>(
  arr: T[],
  key: K,
  isAscOrder = true
) => {
  const ascOrder = (a: T, b: T) => a[key] - b[key];
  const desOrder = (a: T, b: T) => b[key] - a[key];
  const curOrder = isAscOrder ? ascOrder : desOrder;
  return arr.sort(curOrder);
};
export function getUniqueListBy<T>(arr: T[], key: keyof T) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}
