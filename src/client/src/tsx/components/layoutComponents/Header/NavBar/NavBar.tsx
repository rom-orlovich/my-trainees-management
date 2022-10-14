import {
  LinkData,
  PropsBasic,
} from "../../../baseComponents/baseComponentsTypes";
import List from "../../../baseComponents/List/List";
import style from "./NavBar.module.scss";
import DropDown from "./DropDown/DropDown";

import NavLinkLI from "../../../baseComponents/NavLinkLI";
import AlertsNotification from "./AlertNotification/AlertsNotification";

import { authApi } from "../../../../redux/api/authAPI";

import { NavBarNavLinkLI } from "../../../../layout/NavBarLinks";

function DropDownNavLinkLI({
  data,
  className,
}: { data: LinkData } & PropsBasic) {
  const [logout] = authApi.useLazyLogoutQuery();
  const handleLogOut = () => logout({}).unwrap();
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

function NavBarLi(props: NavBarNavLinkLI<LinkData>) {
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

function NavBar({ navBarLinks }: { navBarLinks: NavBarNavLinkLI<LinkData>[] }) {
  return (
    <List
      className={style.navBar}
      dataArr={navBarLinks}
      LI={NavBarLi}
      insertChildLast={false}
    >
      <AlertsNotification className={style.alert_icon} />
    </List>
  );
}

export default NavBar;
