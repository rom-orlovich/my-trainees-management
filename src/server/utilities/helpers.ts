/* eslint-disable no-restricted-syntax */
/**
 *
 * @param promise Gets the promise in pending state.
 * @returns Awaits the promise and return [res, undefined] in case
 * the promise is resolved or return [undefined,error] in case
 * the promise is rejected.
 */
export const promiseHandler = async <T>(promise: Promise<T>) => {
  try {
    const res = await promise;
    return [res as T, undefined] as const;
  } catch (error) {
    return [undefined, error as Error] as const;
  }
};
export const makeUniqeArr = (arr: any[]) => [...new Set(arr)];

/**
 *
 * @param data Gets  some data.
 * @param error Gets some error.
 * @returns [data,error] as const array.
 * @description Functions that return array of data and error are not constant.
 * The function return the array as constant array.
 */
export const dataOrErrorResponeAsConst = <T>(
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