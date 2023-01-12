import { RouteObject } from "react-router-dom";
import UsersPage from "../../pages/UsersPage/UsersPage";
import { APP_ROUTE } from "../appRoutesConstants";
import { AdminProtectedRoutes } from "../components/ProtectedRoute";

export const adminProtectedRoutes: RouteObject = {
  path: "",
  element: <AdminProtectedRoutes />,
  children: [
    {
      path: APP_ROUTE.USERS_ROUTE,
      element: <UsersPage />,
    },
  ],
};
