import { RouteObject } from "react-router-dom";
import MyNutritionMenusPage from "../../pages/MyNutritionMenus/MyNutritionMenusPage";
import MyWorkoutsPage from "../../pages/MyWorkoutsPage/MyWorkoutsPage";
import { APP_ROUTE } from "../appRoutesConstants";
import { TraineeProtectedRoutes } from "../components/ProtectedRoute";

export const traineeProtectedRoutes: RouteObject = {
  path: "",
  element: <TraineeProtectedRoutes />,
  children: [
    {
      path: APP_ROUTE.MY_WORKOUTS_ROUTE,
      element: <MyWorkoutsPage />,
    },
    {
      path: APP_ROUTE.MY_NUTRITION_MENUS_LIST_ROUTE,
      element: <MyNutritionMenusPage />,
    },
  ],
};
