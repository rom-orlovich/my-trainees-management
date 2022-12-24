import { RouteObject } from "react-router-dom";
import { NutritionMenusListAddForm } from "../../../components/Forms/NutritionMenusListForms/NutritionMenusListAddForm";
import { NutritionMenusListEditForm } from "../../../components/Forms/NutritionMenusListForms/NutritionMenusListEditForm";
import NutritionMenuPage from "../../../pages/NutritionMenuPage/NutritionMenuPage";
import NutritionMenusListPage from "../../../pages/NutritionMenusListPage/NutritionMenusListPage";
import { APP_ROUTE } from "../../appRoutesConstants";

export const nutritionMenuByIDRoutes: RouteObject = {
  path: ":nutritionMenuID",
  children: [
    { path: "", element: <NutritionMenusListEditForm /> },

    {
      path: APP_ROUTE.NUTRITION_MENU_ROUTE,
      element: <NutritionMenuPage />,
    },
  ],
};

export const nutritionMenusListRoutes: RouteObject = {
  path: APP_ROUTE.NUTRITION_MENUS_LIST_ROUTE,
  element: <NutritionMenusListPage />,
  children: [
    nutritionMenuByIDRoutes,
    {
      path: APP_ROUTE.NUTRITION_MENUS_LIST_ADD,
      element: <NutritionMenusListAddForm />,
    },
  ],
};
