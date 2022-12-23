import { RouteObject } from "react-router-dom";
import { AdminOrTrainerProtectedRoutes } from "../utilities/ProtectedRoute";
import { traineesRoutes } from "./adminOrTrainerProtectedRoutes/traineesRoutes";

export const adminTrainerProtectedRoutes: RouteObject = {
  path: "",
  element: <AdminOrTrainerProtectedRoutes />,
  children: [traineesRoutes],
};
