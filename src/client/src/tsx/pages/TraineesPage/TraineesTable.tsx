import React from "react";
import { useLocation } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { traineesApi } from "../../redux/api/hooksAPI";
import { TraineesTableExtendsAPI } from "../../redux/api/interfaceAPI";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/slices/authSlice";
import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

export const transformDataTrainee = (arg: TraineesTableExtendsAPI) => {
  const {
    location_id,
    user_id,
    profile_id,

    birthday,
    identify_num,
    street,
    phone_number,
    city_name,
    email,

    ...rest
  } = arg;

  return rest;
};
export interface PageTableProps {
  mainName?: string;
}
function TraineesTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = traineesApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={[APP_ROUTE.TRAINEES_ROUTE, ""]}>
      <TablePagination<TraineesTableExtendsAPI>
        mainRoute={APP_ROUTE.TRAINEES_ROUTE}
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Trainees"}
        transformFun={transformDataTrainee}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default TraineesTable;
