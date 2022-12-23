import React from "react";
import { Link } from "react-router-dom";
import { APP_ROUTE } from "../../routes2/appRoutesConstants";
import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import { genClassName } from "../../utilities/helpersFun";
import style from "./SettingsPage.module.scss";

function BusinessDataPage() {
  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.SETTINGS_ROUTE}>
      <section className={genClassName(style.settings_page)}>
        <div className={genClassName(style.settings_page_header)}>
          <h1> Business Data </h1>
        </div>
        <div className={genClassName(style.settings_page_links)}>
          <Link to={APP_ROUTE.LOCATION_ROUTE}> Locations</Link>
          <Link to={APP_ROUTE.CITY_ROUTE}>Cities </Link>
          <Link to={APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}> Muscles Groups</Link>
          <Link to={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}>Equipment </Link>
          <Link to={APP_ROUTE.EXERCISES_LIST_ROUTE}> Exercises List</Link>
          <Link to={APP_ROUTE.PRODUCTS_ROUTE}> Products</Link>
          <Link to={APP_ROUTE.ACTIVITIES_ROUTE}> Activities</Link>
          <Link to={APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE}>
            Participants Groups List
          </Link>
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default BusinessDataPage;
