import { AiFillSchedule, AiOutlineLogout } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaMoneyBillAlt, FaUserShield } from "react-icons/fa";
import { IoNutritionSharp } from "react-icons/io5";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { SiGoogleads } from "react-icons/si";
import { LinkData } from "../components/baseComponents/baseComponentsTypes";
import { APP_ROUTE } from "../routes/appRoutesConstants";
import style from "../components/layoutComponents/SideBar/SideBar.module.scss";
import { relativePath } from "../utilities/helpersFun";
import Welcome from "../components/layoutComponents/Header/Welcome/Welcome";

export const TRAINEE_SIDE_BAR_LINKS: LinkData[] = [
  { to: relativePath(APP_ROUTE.PROFILE_ROUTE), icon: <Welcome /> },
  {
    to: APP_ROUTE.MY_WORKOUTS_ROUTE,
    text: "My Workouts",
    icon: <AiFillSchedule className={style.icon} />,
  },

  {
    to: APP_ROUTE.MY_NUTRITION_MENUS_LIST_ROUTE,
    text: "My Nutrition",
    icon: <IoNutritionSharp className={style.icon} />,
  },
  {
    to: `${APP_ROUTE.SCHEDULE_ROUTE}`,
    text: "My Schedule",
    icon: <AiFillSchedule className={style.icon} />,
  },
  {
    to: relativePath(APP_ROUTE.HOME_PAGE),
    text: "Logout",
    icon: <AiOutlineLogout className={style.icon} />,
  },
];

export const TRAINER_SIDE_BAR_LINKS: LinkData[] = [
  { to: relativePath(APP_ROUTE.PROFILE_ROUTE), icon: <Welcome /> },
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
    to: `/${APP_ROUTE.FINANCES_ROUTE}`,
    text: "Finances",
    icon: <FaMoneyBillAlt className={style.icon} />,
  },

  {
    to: `${APP_ROUTE.SCHEDULE_ROUTE}`,
    text: "Schedule",
    icon: <AiFillSchedule className={style.icon} />,
  },
  {
    to: relativePath(APP_ROUTE.MISC_ROUTE),
    text: "Misc",
    icon: <MdOutlineMiscellaneousServices className={style.icon} />,
  },
  {
    to: relativePath(APP_ROUTE.HOME_PAGE),
    text: "Logout",
    icon: <AiOutlineLogout className={style.icon} />,
  },
];
export const ADMIN_SIDE_BAR_LINKS: LinkData[] = [
  { to: relativePath(APP_ROUTE.PROFILE_ROUTE), icon: <Welcome /> },
  {
    to: APP_ROUTE.USERS_ROUTE,
    text: "Users",
    icon: <FaUserShield className={style.icon} />,
  },

  ...TRAINER_SIDE_BAR_LINKS.slice(1),
];
