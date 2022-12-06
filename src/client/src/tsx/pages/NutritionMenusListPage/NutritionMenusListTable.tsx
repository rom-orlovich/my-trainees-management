/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { nutritionMenusListApi } from "../../redux/api/hooksAPI";
import { NutritionMenuTableApi } from "../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

import { NUTRITION_MENU_NAME_DATA } from "./NutritionMenusListPage";

const transformNutritionMenuList = ({
  date_start,
  profile_id,
  user_id,
  date_end,
  nutrition_menu_id,
  note_text,
  note_topic,

  ...rest
}: NutritionMenuTableApi) => ({
  nutrition_menu_id,
  program_type: (
    <Link
      to={`/${APP_ROUTE.NUTRITION_MENUS_LIST_ROUTE}/${nutrition_menu_id}/${APP_ROUTE.NUTRITION_MENU_ROUTE}?profileID=${profile_id}`}
    >
      {note_topic}
    </Link>
  ),
  date_start,
  date_end: date_end || "-",
  ...rest,
});
function NutritionMenusTable({
  queriesOptions,
  nameData,
}: { nameData?: string } & {
  queriesOptions?: Record<string, any>;
}) {
  const [deleteItem] = nutritionMenusListApi.useDeleteItemMutation();

  return (
    <TablePagination
      transformFun={transformNutritionMenuList}
      deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      queriesOptions={queriesOptions}
      editPagePath={`${APP_ROUTE.NUTRITION_MENUS_LIST_ROUTE}`}
      nameData={nameData || NUTRITION_MENU_NAME_DATA}
      getAllQuery={nutritionMenusListApi.useGetItemsQuery}
    />
  );
}

export default NutritionMenusTable;
