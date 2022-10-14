import { FaUserCircle } from "react-icons/fa";
import { RiAddCircleFill } from "react-icons/ri";
import { ReactNode } from "react";
import { APP_ROUTE } from "../routes/routesConstants";
import { relativePath } from "../utilities/helpersFun";

import style from "../components/layoutComponents/Header/NavBar/NavBar.module.scss";
import Welcome from "../components/layoutComponents/Header/Welcome/Welcome";
import HamburgerMenu from "../components/layoutComponents/Header/HamburgerMenu/HamburgerMenu";
import { LinkData } from "../components/baseComponents/baseComponentsTypes";

export interface NavBarNavLinkLI<T> {
  id?: string;
  element: ReactNode;
  dataLinks: T[];
}

const profileButton = {
  id: "profileButton",
  element: <FaUserCircle className={style.profile_icon} />,
  dataLinks: [
    { to: relativePath(APP_ROUTE.PROFILE_ROUTE), icon: <Welcome /> },

    {
      to: relativePath(APP_ROUTE.SETTINGS_ROUTE),
      text: "Setting",
    },
    { to: relativePath(APP_ROUTE.LOGIN_ROUTE), text: "Logout" },
  ],
};

const hamburgerMenuButton = {
  id: "hamburgerMenu",
  element: <HamburgerMenu />,
  dataLinks: [],
};

export const ADMIN_NAV_BAR_LINKS: NavBarNavLinkLI<LinkData>[] = [
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
      {
        to: `/`,
        text: "Add Income",
      },
      {
        to: `/`,
        text: "Add Expense",
      },
    ],
  },

  profileButton,
  hamburgerMenuButton,
];

export const TRAINER_NAV_BAR_LINKS: NavBarNavLinkLI<LinkData>[] = [
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
      {
        to: `/`,
        text: "Add Income",
      },
      {
        to: `/`,
        text: "Add Expense",
      },
    ],
  },

  profileButton,
  hamburgerMenuButton,
];

export const TRAINEE_NAV_BAR_LINKS: NavBarNavLinkLI<LinkData>[] = [
  {
    id: "addIconButton",
    element: <RiAddCircleFill className={style.add_icon} />,
    dataLinks: [
      {
        to: `/`,
        text: "Update Exercise",
      },
      {
        to: `/`,
        text: "Add Weighing",
      },
    ],
  },

  profileButton,
  hamburgerMenuButton,
];