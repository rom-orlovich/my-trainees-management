import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

export const getKeysArrObj = <T extends object>(obj: T) => Object.keys(obj);
export const getValuesArrObj = <T extends object>(obj: T) => Object.values(obj);
export const getEnteriesArrObj = <T extends object>(obj: T) =>
  Object.entries(obj);

export const captialFirstLetter = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();
export const formatDate = (date: Date) => {
  const newDate = new Date(date);

  const formated = new Date(
    newDate.getTime() + Math.abs(newDate.getTimezoneOffset() * 60000)
  );
  formated.setDate(newDate.getDate() + 1);
  return formated.toLocaleDateString("en-CA");
};

export const checkIfStrIsValidDate = (value: string) => {
  if (value.split("-").length <= 2) return value;
  const parseDate = Date.parse(value);
  if (isNaN(parseDate)) return value;
  else {
    return formatDate(new Date(parseDate));
  }
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
//Checks if the sec value is equal or include in the first value.
// If the first value is type of array so the function check the includes
// else the function will equal the values.
export const checkSecValueIncludeOrEqualFirstValue = <T>(
  val: T | T[],
  val2: T
) => {
  if (Array.isArray(val)) {
    return val.includes(val2);
  } else return val === val2;
};
