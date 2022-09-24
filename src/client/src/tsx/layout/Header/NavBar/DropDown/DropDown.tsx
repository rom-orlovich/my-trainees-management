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
  disableClickOutSide?: boolean;
  setS?: React.Dispatch<React.SetStateAction<boolean>>;
} & PropsBasic;

function DropDown<T extends object>({
  dataLI,
  className,
  children,
  liProps,
  messageNotFound,
  disableClickOutSide,
  setS,
  Li,
}: DropDownProps<T>) {
  // const dispatch = useAppDispatch();
  const menusSlice = useAppSelector((state) => state.menusSlice);
  const dropDownRef = useRef<HTMLLIElement | null>(null);

  // const handleClickEvent = () => {
  //   dispatch(setOneDropDownOn(liProps?.id || ""));
  // };

  const isVisible = useHideUnFocusElement(dropDownRef, setS);
  // if (messageNotFound) {
  //   // console.log(setS);
  //   console.log('state[liProps?.id || ""]', menusSlice[liProps?.id || ""]);
  //   console.log("isVisible", isVisible);
  //   console.log("disableClickOutSide", disableClickOutSide);
  // }
  return (
    <li
      // onClick={handleClickEvent}
      {...liProps}
      className={style.main_li}
      ref={dropDownRef}
    >
      {children}
      {(disableClickOutSide || isVisible) &&
        (dataLI.length > 0 ? (
          <List
            className={genClassName(style.drop_down_list, className)}
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
