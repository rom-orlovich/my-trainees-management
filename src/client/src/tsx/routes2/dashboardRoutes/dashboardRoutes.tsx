import { RouteObject } from "react-router-dom";

import Dashboard from "../../Dashboard";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { sharedProtectedRoutes } from "./sharedProtectedRoutes/sharedProtectedRoutes";
import MainPageRouteByRole from "../utilities/MainPageRouteByRole";
import { adminTrainerProtectedRoutes } from "./adminOrTrainerProtectedRoutes/adminOrTrainerProtectedRoutes";

export const mainPageRouteByRole = {
  path: "",
  element: <MainPageRouteByRole />,
};

export const dashboardRoutes: RouteObject[] = [
  {
    path: APP_ROUTE.HOME_PAGE,
    element: <Dashboard />,
    children: [
      mainPageRouteByRole,
      sharedProtectedRoutes,
      adminTrainerProtectedRoutes,
    ],
  },
];
