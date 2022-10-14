import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  getMenuSliceState,
  setOneDropDownOn,
} from "../../../../redux/slices/menusSlice";
import style from "./HamburgerMenu.module.scss";

function HamburgerMenu() {
  const state = useAppSelector(getMenuSliceState);
  const dispatch = useAppDispatch();
  const handleClickEvent = () => {
    dispatch(setOneDropDownOn("hamburgerMenu"));
  };
  return (
    <div
      onClick={handleClickEvent}
      className={`${style.hamburger_menu} ${
        state.hamburgerMenu ? style.close : ""
      } `}
    >
      <div className={style.first}></div>
      <div className={style.sec}></div>
      <div className={style.third}></div>
    </div>
  );
}

export default HamburgerMenu;
