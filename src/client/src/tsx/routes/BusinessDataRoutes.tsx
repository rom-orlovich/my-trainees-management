import React from "react";
import { Route, Routes } from "react-router-dom";

import ActivitiesPage from "../pages/ActivitiesPage/ActivitiesPage";

import CitiesPage from "../pages/CitiesPage/CitiesPage";
import EquipmentsListPage from "../pages/EquipmentsListPage/EquipmentsListPage";
import ExercisesPage from "../pages/ExercisesPage/ExercisesPage";
import LocationsListPage from "../pages/LocationsPage/LocationsPage";
import MusclesGroupPage from "../pages/MusclesGroupPage/MusclesGroupPage";
import ParticipantsGroupPage from "../pages/ParticipantsGroupPage/ParticipantsGroupPage";

import ParticipantsGroupsListPage from "../pages/ParticipantsGroupsListPage/ParticipantsGroupsListPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import { APP_ROUTE } from "../routes2/appRoutesConstants";

const BusinessDataRoutes = () => (
  <Routes>
    <Route
      path={APP_ROUTE.EXERCISES_LIST_ROUTE}
      element={<ExercisesPage />}
    ></Route>

    <Route
      path={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}
      element={<EquipmentsListPage />}
    ></Route>

    <Route
      path={APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}
      element={<MusclesGroupPage />}
    ></Route>

    <Route
      path={APP_ROUTE.LOCATION_ROUTE}
      element={<LocationsListPage />}
    ></Route>

    <Route path={APP_ROUTE.CITY_ROUTE} element={<CitiesPage />}></Route>

    <Route path={APP_ROUTE.PRODUCTS_ROUTE} element={<ProductsPage />}></Route>

    <Route
      path={APP_ROUTE.ACTIVITIES_ROUTE}
      element={<ActivitiesPage />}
    ></Route>

    <Route
      path={APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE}
      element={<ParticipantsGroupsListPage />}
    >
      <Route
        path={`:id/${APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}`}
        element={<ParticipantsGroupPage />}
      ></Route>
    </Route>
  </Routes>
);
export default BusinessDataRoutes;
