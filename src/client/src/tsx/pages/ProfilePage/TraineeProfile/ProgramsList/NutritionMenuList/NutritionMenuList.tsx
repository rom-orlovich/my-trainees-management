import React from "react";
import { Link } from "react-router-dom";
import { nutritionMenusListApi } from "../../../../../redux/api/hooksAPI";
import { APP_ROUTE } from "../../../../../routes2/appRoutesConstants";
import ListProfile from "../../../ListProfile/ListProfile";
import { TraineeProfileProps } from "../../TraineeProfile";
import { NUTRITION_MENUS_LIST_NAME } from "../ProgramsList";
import NutritionMenuLi from "./NutritionMenuLi";

function NutritionMenuList({ queryOptions }: TraineeProfileProps) {
  const nutritionMenusListPageLink = `/${APP_ROUTE.NUTRITION_MENUS_LIST_ROUTE}?profileID=${queryOptions?.profileID}`;
  return (
    <ListProfile
      dataNotFoundEl={
        <Link to={nutritionMenusListPageLink}>
          {NUTRITION_MENUS_LIST_NAME} Page
        </Link>
      }
      LI={NutritionMenuLi}
      useQuery={nutritionMenusListApi.useGetItemsQuery}
      heading={NUTRITION_MENUS_LIST_NAME}
      queryOptions={queryOptions}
      pagePath={nutritionMenusListPageLink}
    />
  );
}

export default NutritionMenuList;
