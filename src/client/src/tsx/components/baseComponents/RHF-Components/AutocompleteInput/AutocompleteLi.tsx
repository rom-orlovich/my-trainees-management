import React from "react";
import { AnyFun } from "../../../../types";
import {
  getEnteriesArrObj,
  getValuesArrObj,
} from "../../../../utlities/helpersFun";
import { ComponentProps, LiProps } from "../../baseComponentsTypes";

export const createStrFromValuesOfChosenKeys = <T extends Record<string, any>>(
  obj: T,
  keys: (keyof T)[]
) => {
  if (keys.length === 0) return getValuesArrObj(obj)[0];
  const keyValue = getEnteriesArrObj(obj);
  const keysFilter = keyValue.filter(([key, value]) => {
    return keys.includes(key);
  });
  const valueFilter = keysFilter.map(([key, value]) => value);
  return valueFilter.join(" ");
};

function AutocompleteLi<T extends Record<string, any>>({
  liProps,
  keys,
  id,
  handleOnClick,
  props,
  ...rest
}: { props: ComponentProps<T> } & {
  liProps?: LiProps;
} & { handleOnClick: AnyFun } & { keys: (keyof T)[]; id: keyof T }) {
  const obj = props as T;
  const liID = obj[id];

  let labelText = createStrFromValuesOfChosenKeys(obj, keys);
  const handleLiClick = () => {
    handleOnClick({ [obj[id]]: labelText });
  };
  return (
    <li onClick={handleLiClick} {...liProps} id={liID}>
      {labelText.slice(0, 25)}
    </li>
  );
}

export default AutocompleteLi;
