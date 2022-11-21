import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

export const getKeysArrObj = <T extends object>(obj: T) => Object.keys(obj);
export const getValuesArrObj = <T extends object>(obj: T) => Object.values(obj);
export const getEntriesArrObj = <T extends object>(obj: T) =>
  Object.entries(obj);
export const uniqueObjArr = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T
) => [...new Map(arr.map((item) => [item[key], item])).values()];
export const capitalFirstLetter = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

export const formatDate = (date: Date, plusDay = 1, timeStamp = false) => {
  const newDate = new Date(date);

  const formatted = new Date(
    newDate.getTime() + Math.abs(newDate.getTimezoneOffset() * 60000)
  );
  formatted.setDate(newDate.getDate() + plusDay);

  if (timeStamp) return formatted.toISOString().slice(0, -1);
  return formatted.toLocaleDateString("en-CA");
};

export const checkIfStrIsValidDate = (value: string) => {
  if (value.split("-").length <= 2) return value;
  const parseDate = Date.parse(value);
  if (Number.isNaN(parseDate)) return value;
  return formatDate(new Date(parseDate));
};

export const newDate = (
  date: Date,
  add?: {
    yPlus?: number;
    mPlus?: number;
    dPlus?: number;
    hPlus?: number;
    minPlus?: number;
  }
) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return new Date(
    year + (add?.yPlus || 0),
    month + (add?.mPlus || 0),
    day + (add?.dPlus || 0),
    hour + (add?.hPlus || 0),
    minutes + (add?.minPlus || 0)
  );
};

export const deleteFunMutation = <T extends MutationTrigger<any>>(
  id: string,
  deleteItem: T
) => {
  deleteItem(id).unwrap().catch(console.log).then(console.log);
};
export const getEndPoint = (pathName: string) => {
  const pathNameArr = pathName.split("/");
  return pathNameArr.at(-1);
};
// Checks if the sec value is equal or include in the first value.
// If the first value is type of array so the function check the includes
// else the function will equal the values.
export const checkSecValueIncludeOrEqualFirstValue = <T>(
  val: T | T[],
  val2: T
) => {
  if (Array.isArray(val)) {
    return val.includes(val2);
  }
  return val === val2;
};

export const genClassName = (...str: (string | undefined)[]) =>
  str.map((str) => `${str || ""}`).join(" ");

export const delayFun = (fun: (...arg: any[]) => any, timeout: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(fun());
    }, timeout);
  });
export const relativePath = (path: string) => `/${path}`;
