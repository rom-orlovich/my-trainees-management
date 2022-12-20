import { createBrowserRouter } from "react-router-dom";
import { APP_ROUTE } from "../routes/appRoutesConstants";
import { AuthRoutes } from "./AuthRoutes";
import { DashboardRoutes } from "./DashboardRoutes";

import PersistedLogin from "./utilities/PersistedLogin";

export const MainRoutes = createBrowserRouter([
  {
    path: APP_ROUTE.HOME_PAGE,
    element: <PersistedLogin />,
    children: [...AuthRoutes, ...DashboardRoutes],
    errorElement: <h1>Page is Not Found</h1>,
  },
]);
