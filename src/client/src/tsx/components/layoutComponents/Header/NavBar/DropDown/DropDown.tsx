import React, { MouseEvent, useEffect, useRef } from "react";
import {
  ComponentProps,
  LiProps,
  PropsBasic,
} from "../../../../baseComponents/baseComponentsTypes";

import List from "../../../../baseComponents/List/List";
import useHideUnFocusElement from "../../../../../hooks/useHideUnFocusElement";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";

import {
  // setOneDropDownOff,
  setOneDropDownOn,
} from "../../../../../redux/slices/menusSlice";
import { genClassName } from "../../../../../utilities/helpersFun";
import style from "./DropDown.module.scss";

export type DropDownProps<T extends object> = {
  dataLI: T[];
  // eslint-disable-next-line no-unused-vars, no-undef
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
  setAlertNotificationState, // In order alerts notification dropdown will stay open after delete notification.
  Li,
}: DropDownProps<T>) {
  const dispatch = useAppDispatch();
  const menusSliceState = useAppSelector((state) => state.menusSlice);
  const dropDownRef = useRef<HTMLLIElement | null>(null);
  const isMenuSliceStateOpen = menusSliceState[liProps?.id || ""];

  // // Close other dropdown after click on specific li. Otherwise, the dropdown will stay open.
  const handleClickEvent = () => {
    dispatch(setOneDropDownOn(liProps?.id || ""));
  };

  const isVisible = useHideUnFocusElement(
    dropDownRef,
    setAlertNotificationState
  );

  const DropDownList = () => {
    // If alertNotification state is true, the alerts dropdown will stay open independently the state of isMenuSliceStateOpen and isVisible.
    // The isVisible state will be false if click event was executed outside the dropdown's elements area.
    // The isMenuSliceStateOpen will be true in one dropdown element if the dropdown was clicked
    // and false in other dropdowns's state.
    if (alertNotificationState || (isVisible && isMenuSliceStateOpen))
      if (dataLI.length > 0)
        // If there is any li the dropdown list will be display.
        // Else if there is message to display the message will display instead.
        return (
          <List
            className={genClassName(style.drop_down_list, className)}
            dataArr={dataLI}
            LI={(data) => <Li data={data} className={style.sec_li}></Li>}
          />
        );
      else if (messageNotFound)
        return (
          <ul
            className={genClassName(
              style.drop_down_list,
              style.messageNotFound,
              className
            )}
          >
            <p> {messageNotFound}</p>
          </ul>
        );
    return <></>;
  };

  return (
    <li
      {...liProps}
      className={style.main_li}
      ref={dropDownRef}
      onClick={handleClickEvent}
    >
      {children}
      <DropDownList />
    </li>
  );
}

export default DropDown;
