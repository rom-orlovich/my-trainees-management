import React from "react";
import { Link } from "react-router-dom";
import { nutritionMenusListApi } from "../../../../../redux/api/hooksAPI";
import { APP_ROUTE } from "../../../../../routes/appRoutesConstants";
import ListProfile from "../../../ListProfile/ListProfile";
import { TraineeProfileProps } from "../../TraineeProfile";
import { NUTRITION_MENUS_LIST_NAME } from "../ProgramsList";

function NutritionMenuList({ queryOptions }: TraineeProfileProps) {
  const nutritionMenusListPageLink = `/${APP_ROUTE.NUTRITION_MENUS_LIST_ROUTE}?profileID=${queryOptions?.profileID}`;
  return (
    <ListProfile
      dataNotFoundEl={
        <Link to={nutritionMenusListPageLink}>
          {NUTRITION_MENUS_LIST_NAME} Page
        </Link>
      }
      LI={(data) => {
        console.log(data);
        return <></>;
      }}
      useQuery={nutritionMenusListApi.useGetItemsQuery}
      heading={NUTRITION_MENUS_LIST_NAME}
      queryOptions={queryOptions}
      pagePath={nutritionMenusListPageLink}
    />
  );
}

export default NutritionMenuList;
