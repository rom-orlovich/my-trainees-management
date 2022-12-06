import React, { MouseEventHandler } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AnyFun } from "../../../../types";
import {
  getEntriesArrObj,
  getValuesArrObj,
} from "../../../../utilities/helpersFun";
import { ComponentProps, LiProps } from "../../baseComponentsTypes";
import { IconOption } from "./AutocompleteInput";

export const createStrFromValuesOfChosenKeys = <T extends Record<string, any>>(
  obj: T,
  keys: (keyof T)[]
) => {
  if (keys.length === 0) return getValuesArrObj(obj)[0];
  const keyValue = getEntriesArrObj(obj);
  const keysFilter = keyValue.filter(([key, value]) => keys.includes(key));
  const valueFilter = keysFilter.map(([key, value]) => value);
  return valueFilter.join(" ");
};

function AutocompleteLi<T extends Record<string, any>>({
  liProps,
  keys,
  id,
  handleOnClick,
  props,
  editOption,
}: { props: ComponentProps<T> } & {
  liProps?: LiProps;
} & { handleOnClick: AnyFun } & { keys: (keyof T)[]; id: keyof T } & {
  editOption?: IconOption;
}) {
  const nav = useNavigate();
  const obj = props as T;
  const liID = obj[id];

  const labelText = createStrFromValuesOfChosenKeys(obj, keys);
  const handleLiClick: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(".editOption")) {
      if (editOption) {
        if (editOption.link)
          if (typeof editOption.link === "function") {
            nav(editOption.link(liID));
          } else nav(editOption.link as any);
        if (editOption.onClick) {
          editOption.onClick(liID);
        }
      }
    } else handleOnClick({ [obj[id]]: labelText });
  };

  return (
    <li onClick={handleLiClick} {...liProps} id={liID}>
      {labelText.slice(0, 25)}
      {editOption && <AiFillEdit onClick={() => {}} className="editOption" />}
    </li>
  );
}

export default AutocompleteLi;
