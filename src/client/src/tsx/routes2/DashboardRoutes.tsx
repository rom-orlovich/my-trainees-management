import { RouteObject } from "react-router-dom";

import Dashboard from "../Dashboard";
import { APP_ROUTE } from "../routes/appRoutesConstants";
import { SharedProtectedRoutesChildren } from "./SharedProtectedRoutes";
import MainRouteByRole from "./utilities/MainRouteByRole";
import { SharedProtectedRoutes } from "./utilities/ProtectedRoute";

export const DashboardRoutes: RouteObject[] = [
  {
    path: APP_ROUTE.HOME_PAGE,
    element: <Dashboard />,
    children: [
      { path: "", element: <MainRouteByRole /> },
      {
        path: "",
        element: <SharedProtectedRoutes />,
        children: SharedProtectedRoutesChildren,
      },
    ],
  },
];
