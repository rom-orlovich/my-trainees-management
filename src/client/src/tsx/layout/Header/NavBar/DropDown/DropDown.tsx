import React, { MouseEvent, useRef } from "react";
import {
  ComponentProps,
  LiProps,
  PropsBasic,
} from "../../../../components/baseComponents/baseComponentsTypes";

import List from "../../../../components/baseComponents/List/List";
import useHideUnFocusElement from "../../../../hooks/useHideUnFocusElement";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  // setOneDropDownOff,
  setOneDropDownOn,
} from "../../../../redux/slices/menusSlice";
import { genClassName } from "../../../../utilities/helpersFun";
import style from "./DropDown.module.scss";

export type DropDownProps<T extends object> = {
  dataLI: T[];
  Li: (props: PropsBasic & { data: ComponentProps<T> }) => JSX.Element;
  liProps?: LiProps;
  messageNotFound?: string;
} & PropsBasic;

function DropDown<T extends object>({
  dataLI,
  className,
  children,
  liProps,
  messageNotFound,
  Li,
}: DropDownProps<T>) {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.menusSlice);
  const dropDownRef = useRef<HTMLLIElement | null>(null);
  const handleClickEvent = () => {
    dispatch(setOneDropDownOn(liProps?.id || ""));
  };
  const isVisible = useHideUnFocusElement(dropDownRef);

  return (
    <li
      onClick={handleClickEvent}
      {...liProps}
      className={style.main_li}
      ref={dropDownRef}
    >
      {children}
      {state[liProps?.id || ""] &&
        isVisible &&
        (dataLI.length > 0 ? (
          <List
            className={`${style.drop_down_list} ${className} `}
            dataArr={dataLI}
            LI={(data) => {
              return <Li data={data} className={style.sec_li}></Li>;
            }}
          />
        ) : messageNotFound ? (
          <ul
            className={genClassName(
              style.drop_down_list,
              style.messageNotFound,
              className
            )}
          >
            <p> {messageNotFound}</p>
          </ul>
        ) : (
          <></>
        ))}
    </li>
  );
}

export default DropDown;
