import { RouteObject } from "react-router-dom";
import ActivitiesPage from "../../../pages/ActivitiesPage/ActivitiesPage";
import CitiesPage from "../../../pages/CitiesPage/CitiesPage";
import EquipmentsListPage from "../../../pages/EquipmentsListPage/EquipmentsListPage";
import ExercisesPage from "../../../pages/ExercisesPage/ExercisesPage";
import LocationsListPage from "../../../pages/LocationsPage/LocationsPage";
import MusclesGroupPage from "../../../pages/MusclesGroupPage/MusclesGroupPage";
import ParticipantsGroupPage from "../../../pages/ParticipantsGroupPage/ParticipantsGroupPage";
import ParticipantsGroupsListPage from "../../../pages/ParticipantsGroupsListPage/ParticipantsGroupsListPage";
import ProductsPage from "../../../pages/ProductsPage/ProductsPage";
import { APP_ROUTE } from "../../appRoutesConstants";

export const settingsRoutes: RouteObject = {
  path: APP_ROUTE.MISC_ROUTE,
  children: [
    { path: APP_ROUTE.EXERCISES_LIST_ROUTE, element: <ExercisesPage /> },
    { path: APP_ROUTE.EQUIPMENTS_LIST_ROUTE, element: <EquipmentsListPage /> },
    { path: APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE, element: <MusclesGroupPage /> },
    { path: APP_ROUTE.LOCATION_ROUTE, element: <LocationsListPage /> },
    { path: APP_ROUTE.CITY_ROUTE, element: <CitiesPage /> },
    { path: APP_ROUTE.PRODUCTS_ROUTE, element: <ProductsPage /> },
    { path: APP_ROUTE.ACTIVITIES_ROUTE, element: <ActivitiesPage /> },
    {
      path: APP_ROUTE.PARTICIPANTS_GROUPS_LIST_ROUTE,
      element: <ParticipantsGroupsListPage />,
      children: [
        {
          path: `:participantGroupListID/${APP_ROUTE.PARTICIPANTS_GROUP_ROUTE}`,
          element: <ParticipantsGroupPage />,
        },
      ],
    },
  ],
};
