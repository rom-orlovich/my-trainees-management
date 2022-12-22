import { RouteObject } from "react-router-dom";

import Dashboard from "../Dashboard";
import { APP_ROUTE } from "../routes/appRoutesConstants";
import { sharedProtectedRoutes } from "./sharedProtectedRoutes";
import MainRouteByRole from "./utilities/MainRouteByRole";
import { SharedProtectedRoutes } from "./utilities/ProtectedRoute";

export const dashboardRoutes: RouteObject[] = [
  {
    path: APP_ROUTE.HOME_PAGE,
    element: <Dashboard />,
    children: [
      { path: "", element: <MainRouteByRole /> },

      {
        path: "",
        element: <SharedProtectedRoutes />,
        children: sharedProtectedRoutes,
      },
    ],
  },
];
