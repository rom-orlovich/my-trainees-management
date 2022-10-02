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
  alertNotificationState?: boolean;
  setAlertNotificationState?: React.Dispatch<React.SetStateAction<boolean>>;
} & PropsBasic;

function DropDown<T extends object>({
  dataLI,
  className,
  children,
  liProps,
  messageNotFound,
  alertNotificationState,
  setAlertNotificationState,
  Li,
}: DropDownProps<T>) {
  const dispatch = useAppDispatch();
  const menusSliceState = useAppSelector((state) => state.menusSlice);
  const dropDownRef = useRef<HTMLLIElement | null>(null);
  const isMenuSliceStateOpen = menusSliceState[liProps?.id || ""];

  // Close the dropdown after click on li. Otherwise, the dropdown will stay open.
  const handleClickEvent = () => {
    dispatch(setOneDropDownOn(liProps?.id || ""));
  };
  const isVisible = useHideUnFocusElement(
    dropDownRef,
    setAlertNotificationState
  );

  return (
    <li
      {...liProps}
      className={style.main_li}
      ref={dropDownRef}
      onClick={handleClickEvent}
    >
      {children}
      {(alertNotificationState || (isMenuSliceStateOpen && isVisible)) &&
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
