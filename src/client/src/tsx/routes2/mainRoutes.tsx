import { createBrowserRouter } from "react-router-dom";
import { APP_ROUTE } from "../routes/appRoutesConstants";
import { authRoutes } from "./authRoutes";
import { dashboardRoutes } from "./dashboardRoutes/dashboardRoutes";

import PersistedLogin from "./utilities/PersistedLogin";

export const mainRoutes = createBrowserRouter([
  {
    path: APP_ROUTE.HOME_PAGE,
    element: <PersistedLogin />,
    children: [...authRoutes, ...dashboardRoutes],
    errorElement: <h1>Page is Not Found</h1>,
  },
]);
