/* eslint-disable no-restricted-syntax */
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
