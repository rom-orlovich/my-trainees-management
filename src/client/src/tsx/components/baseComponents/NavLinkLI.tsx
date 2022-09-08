import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavLinkLIProps } from "./baseComponentsTypes";

//Li with link for Navbar/Sidebar components
function NavLinkLI({
  liProps,
  linkData: { to, text, icon },
  children,
  className,
}: NavLinkLIProps) {
  return (
    <li className={className} {...liProps}>
      <NavLink
        className={({ isActive }) => {
          return isActive ? className : "";
        }}
        to={to}
      >
        {icon ? (
          <>
            <span>{icon}</span>
            {text}
            <span></span>
          </>
        ) : (
          children || text
        )}
      </NavLink>
    </li>
  );
}

export default NavLinkLI;
