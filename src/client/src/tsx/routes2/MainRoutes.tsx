import { createBrowserRouter } from "react-router-dom";
import { APP_ROUTE } from "../routes/appRoutesConstants";
import { AuthRoutes } from "./AuthRoutes";
import PersistedLogin from "./utilities/PersistedLogin";

export const mainRoutes = createBrowserRouter([
  {
    path: APP_ROUTE.HOME_PAGE,
    element: <PersistedLogin />,
    children: [{ path: "", children: AuthRoutes }],
  },
]);
