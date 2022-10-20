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

export const cl = (tn: string, tn2: string, obj: Record<string, any>) => {
  if (tn.includes(tn2)) {
    console.log("log", obj);
  }
};
