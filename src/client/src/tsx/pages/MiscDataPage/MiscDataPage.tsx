import { FaCity, FaRunning } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import {
  GiBiceps,
  GiWeight,
  GiWeightLiftingUp,
  GiSellCard,
} from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { Link } from "react-router-dom";

import { LinkData } from "../../components/baseComponents/baseComponentsTypes";
import List from "../../components/baseComponents/List/List";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import InsteadOutletRoutes from "../../routes/components/InsteadOutletRoutes";
import { genClassName } from "../../utilities/helpersFun";
import style from "./MiscDataPage.module.scss";
import Card from "../../components/baseComponents/Card/Card";

const miscDataArr: LinkData[] = [
  {
    to: APP_ROUTE.LOCATION_ROUTE,
    text: "Locations",
    icon: <IoLocationSharp className={style.icon_link} />,
  },
  {
    to: APP_ROUTE.CITY_ROUTE,
    text: "Cities",
    icon: <FaCity className={style.icon_link} />,
  },
  {
    to: APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE,
    text: "Muscles Groups",
    icon: <GiBiceps className={style.icon_link} />,
  },
  {
    to: APP_ROUTE.EQUIPMENTS_LIST_ROUTE,
    text: "Equipments",
    icon: <GiWeight className={style.icon_link} />,
  },
  {
    to: APP_ROUTE.EXERCISES_LIST_ROUTE,
    text: "Exercises",
    icon: <GiWeightLiftingUp className={style.icon_link} />,
  },
  {
    to: APP_ROUTE.PRODUCTS_ROUTE,
    text: "Products",
    icon: <GiSellCard className={style.icon_link} />,
  },
  {
    to: APP_ROUTE.ACTIVITIES_ROUTE,
    text: "Activities",
    icon: <FaRunning className={style.icon_link} />,
  },
  {
    to: APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE,
    text: " Participants Groups",
    icon: <HiUserGroup className={style.icon_link} />,
  },
];

function MiscDataPage() {
  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.MISC_ROUTE}>
      <section className={genClassName(style.misc_page)}>
        <div className={style.misc_page_links_container}>
          <List
            className={genClassName(style.misc_page_links)}
            dataArr={miscDataArr}
            LI={(data) => (
              <li {...data.liProps} className={style.li_link}>
                <Link to={data.to}>
                  {data.text} {data.icon}
                </Link>
              </li>
            )}
          />
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default MiscDataPage;
