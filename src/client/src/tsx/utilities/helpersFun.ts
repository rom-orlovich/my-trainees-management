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

export interface AddToDate {
  yPlus?: number;
  mPlus?: number;
  dPlus?: number;
  hPlus?: number;
  minPlus?: number;
}

export interface SetDate {
  setYear?: number;
  setMonth?: number;
  setDay?: number;
  setHour?: number;
  setMinutes?: number;
}

export const curDateTime = (date?: Date | number | string) => {
  const curDate = date ? new Date(date) : new Date();
  const year = curDate.getFullYear();
  const month = curDate.getMonth();
  const day = curDate.getDate();
  const hour = curDate.getHours();
  const minutes = curDate.getMinutes();

  return { year, month, day, hour, minutes };
};

export const setInDate = (set: SetDate, date?: Date | number | string) => {
  const curDate = date ? new Date(date) : new Date();
  set?.setYear && curDate.setFullYear(set?.setYear);
  set?.setMonth && curDate.setMonth(set?.setMonth);
  set?.setDay && curDate.setDate(set?.setDay);
  set?.setHour && curDate.setHours(set?.setHour);
  set?.setMinutes && curDate.setMinutes(set?.setMinutes);

  return curDate;
};

export const addToDate = (date?: Date | number | string, add?: AddToDate) => {
  const { day, hour, minutes, month, year } = curDateTime(date);

  return new Date(
    year + (add?.yPlus || 0),
    month + (add?.mPlus || 0),
    day + (add?.dPlus || 0),
    hour + (add?.hPlus || 0),
    minutes + (add?.minPlus || 0)
  );
};

export const changeDateUTCtoLocal = (date: Date) =>
  new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));

export const getInputFormattedISO = (date: Date) =>
  date.toISOString().slice(0, -1);

export const setInputLocalDate = (date: Date) =>
  getInputFormattedISO(changeDateUTCtoLocal(date));

export const formatDate = (date: Date, plusDay = 1, timeStamp = false) => {
  const addToDate = new Date(date);
  const formatted = changeDateUTCtoLocal(addToDate);

  formatted.setDate(addToDate.getDate() + plusDay);

  if (timeStamp) return getInputFormattedISO(formatted);
  return formatted.toLocaleDateString("en-CA");
};

export const checkIfStrIsValidDate = (value: string) => {
  if (value.split("-").length <= 2) return value;
  const parseDate = Date.parse(value);
  if (Number.isNaN(parseDate)) return value;
  return formatDate(new Date(parseDate));
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
  // console.log(val, val2);
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
export const fixNum = (num: number, fix = 2) => Number(num.toFixed(fix));
