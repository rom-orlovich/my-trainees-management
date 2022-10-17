import React from "react";
import { Link } from "react-router-dom";

import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { genClassName } from "../../utilities/helpersFun";
import style from "./SettingsPage.module.scss";

function SettingsPage() {
  return (
    <InsteadOutletRoutes InsteadOutletRoutesPaths={APP_ROUTE.SETTINGS_ROUTE}>
      <section className={genClassName(style.settings_page)}>
        <div className={genClassName(style.settings_page_header)}>
          <h1> Business Data </h1>
        </div>
        <div className={genClassName(style.settings_page_links)}>
          <Link to={APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}> Muscles Groups</Link>
          <Link to={APP_ROUTE.LOCATION_ROUTE}> Locations</Link>
          <Link to={APP_ROUTE.EXERCISES_LIST_ROUTE}> Exercises List</Link>
          <Link to={APP_ROUTE.CITY_ROUTE}>Cities </Link>
          <Link to={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}>Equipment </Link>
        </div>
      </section>
    </InsteadOutletRoutes>
  );
}

export default SettingsPage;
