import React from "react";
import NavBar from "./NavBar/NavBar";
// import style from "./Header.module.scss";
import { PropsBasic } from "../../components/baseComponents/baseComponentsTypes";
import Brand from "./Brand/Brand";

function Header({ className }: PropsBasic) {
  return (
    <header className={`${className}`}>
      <Brand />
      <NavBar />
    </header>
  );
}

export default Header;
