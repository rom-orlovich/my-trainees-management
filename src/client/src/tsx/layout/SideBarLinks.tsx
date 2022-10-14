import { AiFillSchedule } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa";
import { IoNutritionSharp } from "react-icons/io5";
import { SiGoogleads } from "react-icons/si";
import { LinkData } from "../components/baseComponents/baseComponentsTypes";
import { APP_ROUTE } from "../routes/appRoutesConstants";
import style from "../components/layoutComponents/SideBar/SideBar.module.scss";

export const TRAINEE_SIDE_BAR_LINKS: LinkData[] = [
  {
    to: APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE,
    text: "My Trainings",
    icon: <AiFillSchedule className={style.icon} />,
  },

  {
    to: APP_ROUTE.COMING_SOON,
    text: "My Nutrition",
    icon: <IoNutritionSharp className={style.icon} />,
  },
];

export const TRAINER_SIDE_BAR_LINKS: LinkData[] = [
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
    text: "Trainings",
    icon: <AiFillSchedule className={style.icon} />,
  },
  {
    to: APP_ROUTE.COMING_SOON,
    text: "Nutrition",
    icon: <IoNutritionSharp className={style.icon} />,
  },
];
export const ADMIN_SIDE_BAR_LINKS: LinkData[] = [
  {
    to: APP_ROUTE.USERS_ROUTE,
    text: "Users",
    icon: <FaUserShield className={style.icon} />,
  },

  ...TRAINER_SIDE_BAR_LINKS,
];
