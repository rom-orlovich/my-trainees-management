import React from "react";
import { Link } from "react-router-dom";
import List from "../../components/baseComponents/List";
import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";

function SettingsPage() {
  return (
    <MainRoute mainRoutes={APP_ROUTE.SETTINGS_ROUTE}>
      <div>
        <Link to={APP_ROUTE.MUSCULES_GROUP_LIST_ROUTE}> MusclesGroups</Link>
        <Link to={APP_ROUTE.LOCATION_ROUTE}> Locations</Link>
        <Link to={APP_ROUTE.NOTE_ROUTES}> Notes</Link>
        <Link to={APP_ROUTE.CITY_ROUTE}>Cities </Link>
        <Link to={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}>Equipement </Link>
      </div>
    </MainRoute>
  );
}

export default SettingsPage;
