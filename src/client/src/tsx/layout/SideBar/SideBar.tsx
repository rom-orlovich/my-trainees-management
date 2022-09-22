import React, { ReactNode } from "react";
import { APP_ROUTE } from "../../routes/routesConstants";

import {
  LinkData,
  PropsBasic,
} from "../../components/baseComponents/baseComponentsTypes";
import List from "../../components/baseComponents/List/List";

import { useAppSelector } from "../../redux/hooks";
import NavLinkLI from "../../components/baseComponents/NavLinkLI";
import { SiGoogleads } from "react-icons/si";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillSchedule } from "react-icons/ai";
import style from "./SideBar.module.scss";
import { useDispatch } from "react-redux";
import { setOneDropDownOn } from "../../redux/slices/menusSlice";

const sideBarLink: LinkData[] = [
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
    text: "Programs",
    icon: <AiFillSchedule className={style.icon} />,
  },
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
  const state = useAppSelector((state) => state.menusSlice);
  return (
    <section
      className={`${style.sideBar} ${className} ${
        state["hamburgerMenu"] ? style.display_block : ""
      }`}
    >
      <List dataArr={sideBarLink} LI={Li}></List>
    </section>
  );
}

export default SideBar;
