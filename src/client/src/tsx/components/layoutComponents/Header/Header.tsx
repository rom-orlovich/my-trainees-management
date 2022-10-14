import React from "react";
import NavBar from "./NavBar/NavBar";
// import style from "./Header.module.scss";
import { LinkData, PropsBasic } from "../../baseComponents/baseComponentsTypes";
import Brand from "./Brand/Brand";
import { NavBarNavLinkLI } from "../../../layout/NavBarLinks";

function Header({
  className,
  navBarLinks,
}: PropsBasic & { navBarLinks: NavBarNavLinkLI<LinkData>[] }) {
  return (
    <header className={`${className}`}>
      <Brand />
      <NavBar navBarLinks={navBarLinks} />
    </header>
  );
}

export default Header;
