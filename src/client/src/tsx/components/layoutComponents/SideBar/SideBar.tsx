import { useDispatch } from "react-redux";

import { LinkData, PropsBasic } from "../../baseComponents/baseComponentsTypes";

import style from "./SideBar.module.scss";
import NavLinkLI from "../../baseComponents/NavLinkLI";
import {
  getMenuSliceState,
  setOneDropDownOn,
} from "../../../redux/slices/menusSlice";
import { useAppSelector } from "../../../redux/hooks";

import List from "../../baseComponents/List/List";
import { authApi } from "../../../redux/api/authAPI";

function Li(link: LinkData) {
  const dispatch = useDispatch();
  const [logout] = authApi.useLazyLogoutQuery();
  const handleLogOut = () => logout({}).unwrap();
  const checkLogoutText = link.text === "Logout";
  const onClickProps = checkLogoutText ? { onClick: handleLogOut } : {};
  return (
    <NavLinkLI
      liProps={{
        onClick: () => {
          dispatch(setOneDropDownOn("hamburgerMenu"));
        },
        ...onClickProps,
      }}
      className={style.isActive}
      linkData={link}
    />
  );
}
function SideBar({
  className,
  sideBarLinks,
}: PropsBasic & { sideBarLinks: LinkData[] }) {
  const state = useAppSelector(getMenuSliceState);

  return (
    <section
      className={`${style.sideBar} ${className} ${
        state.hamburgerMenu ? style.display_block : ""
      }`}
    >
      <List dataArr={sideBarLinks} LI={Li}></List>
    </section>
  );
}

export default SideBar;
