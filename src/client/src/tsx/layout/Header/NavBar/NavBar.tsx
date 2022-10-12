import React, { ReactNode } from "react";

import { RiAddCircleFill } from "react-icons/ri";

import { FaUserCircle } from "react-icons/fa";
import { APP_ROUTE } from "../../../routes/routesConstants";
import {
  LinkData,
  PropsBasic,
} from "../../../components/baseComponents/baseComponentsTypes";
import List from "../../../components/baseComponents/List/List";
import style from "./NavBar.module.scss";
import DropDown from "./DropDown/DropDown";

import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import NavLinkLI from "../../../components/baseComponents/NavLinkLI";
import AlertsNotification from "./AlertNotification/AlertsNotification";

import { authApi } from "../../../redux/api/authAPI";

import { relativePath } from "../../../utilities/helpersFun";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

interface NavBarNavLinkLIs<T> {
  id?: string;
  element: ReactNode;
  dataLinks: T[];
}

function Welcome() {
  return (
    <>
      <span style={{ fontWeight: "400" }}> Welcome, </span>
      <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
        {`${useGetUserLoginData().authState.user?.username}!`}
      </span>
    </>
  );
}
const navBarLink: NavBarNavLinkLIs<LinkData>[] = [
  {
    id: "addIconButton",
    element: <RiAddCircleFill className={style.add_icon} />,
    dataLinks: [
      {
        to: `/${APP_ROUTE.TRAINEES_ROUTE}/${APP_ROUTE.TRAINEES_ROUTE_ADD}`,
        text: "Add Trainee",
      },
      {
        to: `/${APP_ROUTE.LEADS_ROUTE}/${APP_ROUTE.LEADS_ROUTE_ADD}`,
        text: "Add Lead",
      },
    ],
  },

  {
    id: "profileButton",
    element: <FaUserCircle className={style.profile_icon} />,
    dataLinks: [
      { to: relativePath(APP_ROUTE.PROFILE_ROUTE), icon: <Welcome /> },
      // { to: relativePath(APP_ROUTE.PROFILE_ROUTE), text: "Profile" },
      {
        to: relativePath(APP_ROUTE.SETTINGS_ROUTE),
        text: "Setting",
      },
      { to: relativePath(APP_ROUTE.LOGIN_ROUTE), text: "Logout" },
    ],
  },
  {
    id: "hamburgerMenu",
    element: <HamburgerMenu />,
    dataLinks: [],
  },
];

function DropDownNavLinkLI({
  data,
  className,
}: { data: LinkData } & PropsBasic) {
  const [logout] = authApi.useLazyLogoutQuery();
  const handleLogOut = () => {
    logout({}).unwrap();
  };
  const checkLogoutText = data.text === "Logout";
  const onClickProps = checkLogoutText ? { onClick: handleLogOut } : {};
  return (
    <NavLinkLI
      liProps={{
        className,
        ...onClickProps,
      }}
      linkData={data}
    />
  );
}

function NavBarLi(props: NavBarNavLinkLIs<LinkData>) {
  const className =
    props?.id === "profileButton" ? style.profile_drop_down : "";

  return props.id !== "hamburgerMenu" ? (
    <DropDown
      className={className}
      liProps={{ id: props.id }}
      Li={DropDownNavLinkLI}
      dataLI={props.dataLinks}
    >
      {props.element}
    </DropDown>
  ) : (
    <>{props.element}</>
  );
}

function NavBar() {
  return (
    <List
      className={style.navBar}
      dataArr={navBarLink}
      LI={NavBarLi}
      insertChildLast={false}
    >
      <AlertsNotification className={style.alert_icon} />
    </List>
  );
}

export default NavBar;
