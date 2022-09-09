import React from "react";
import { Link } from "react-router-dom";
import List from "../../components/baseComponents/List";
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
        <Link to={APP_ROUTE.MUSCULES_GROUP_LIST_ROUTE}> Muscles Groups</Link>
        <Link to={APP_ROUTE.LOCATION_ROUTE}> Locations</Link>
        <Link to={APP_ROUTE.NOTES_ROUTE}> Notes</Link>
        <Link to={APP_ROUTE.CITY_ROUTE}>Cities </Link>
        <Link to={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}>Equipement </Link>
      </div>
    </MainRoute>
  );
}

export default SettingsPage;
