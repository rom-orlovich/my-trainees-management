/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import useCheckRole from "../../hooks/useCheckRole";
import { nutritionMenusListApi } from "../../redux/api/hooksAPI";
import { NutritionMenuTableApi } from "../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../routes2/appRoutesConstants";
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
  mainName,
  nameData,
}: { nameData?: string } & {
  queriesOptions?: Record<string, any>;
  mainName: string;
}) {
  const [deleteItem] = nutritionMenusListApi.useDeleteItemMutation();
  const { isTrainee } = useCheckRole();
  return (
    <TablePagination
      transformFun={transformNutritionMenuList}
      deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      queriesOptions={{ ...queriesOptions, mainName }}
      editPagePath={`${APP_ROUTE.NUTRITION_MENUS_LIST_ROUTE}`}
      actions={{ delete: !isTrainee, edit: !isTrainee }}
      nameData={nameData || NUTRITION_MENU_NAME_DATA}
      getAllQuery={nutritionMenusListApi.useGetItemsQuery}
    />
  );
}

export default NutritionMenusTable;
