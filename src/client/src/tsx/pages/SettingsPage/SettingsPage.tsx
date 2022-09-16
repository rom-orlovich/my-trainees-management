import React from "react";
import { Link } from "react-router-dom";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";

function SettingsPage() {
  return (
    <MainRoute mainRoutes={APP_ROUTE.SETTINGS_ROUTE}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "0.5rem",
        }}
      >
        <Link to={APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}> Muscles Groups</Link>
        <Link to={APP_ROUTE.LOCATION_ROUTE}> Locations</Link>
        <Link to={APP_ROUTE.EXERCISES_LIST_ROUTE}> Exercises List</Link>
        <Link to={APP_ROUTE.CITY_ROUTE}>Cities </Link>
        <Link to={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}>Equipment </Link>
      </div>
    </MainRoute>
  );
}

export default SettingsPage;
