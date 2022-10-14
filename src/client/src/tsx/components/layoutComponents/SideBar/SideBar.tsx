import { SiGoogleads } from "react-icons/si";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillSchedule } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { FaUserShield } from "react-icons/fa";
import { LinkData, PropsBasic } from "../../baseComponents/baseComponentsTypes";
import { APP_ROUTE } from "../../../routes/routesConstants";
import style from "./SideBar.module.scss";
import NavLinkLI from "../../baseComponents/NavLinkLI";
import {
  getMenuSliceState,
  setOneDropDownOn,
} from "../../../redux/slices/menusSlice";
import { useAppSelector } from "../../../redux/hooks";
import useCheckRole from "../../../hooks/useCheckRole";
import List from "../../baseComponents/List/List";

const sideBarLinkTrainer: LinkData[] = [
  {
    to: APP_ROUTE.TRAINEES_ROUTE,
    text: "Trainees",
    icon: <BsFillPeopleFill className={style.icon} />,
  },
  {
    to: APP_ROUTE.LEADS_ROUTE,
    text: "Leads",
    icon: <SiGoogleads className={style.icon} />,
  },
  {
    to: APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE,
    text: "Training Program",
    icon: <AiFillSchedule className={style.icon} />,
  },
];
const sideBarLinkAdmin: LinkData[] = [
  {
    to: APP_ROUTE.USERS_ROUTE,
    text: "Users",
    icon: <FaUserShield className={style.icon} />,
  },

  ...sideBarLinkTrainer,
];

function Li(link: LinkData) {
  const dispatch = useDispatch();
  return (
    <NavLinkLI
      liProps={{
        onClick: () => {
          dispatch(setOneDropDownOn("hamburgerMenu"));
        },
      }}
      className={style.isActive}
      linkData={link}
    />
  );
}
function SideBar({ className }: PropsBasic) {
  const state = useAppSelector(getMenuSliceState);
  const dataArr = useCheckRole().isAdmin
    ? sideBarLinkAdmin
    : sideBarLinkTrainer;
  return (
    <section
      className={`${style.sideBar} ${className} ${
        state.hamburgerMenu ? style.display_block : ""
      }`}
    >
      <List dataArr={dataArr} LI={Li}></List>
    </section>
  );
}

export default SideBar;
