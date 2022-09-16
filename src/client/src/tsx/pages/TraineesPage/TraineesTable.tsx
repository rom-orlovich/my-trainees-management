import React from "react";
import { useLocation } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { traineesApi } from "../../redux/api/hooksAPI";
import { TraineeGetRes } from "../../redux/api/interfaceAPI";
import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

export const transformDataTrainee = (arg: TraineeGetRes) => {
  const {
    training_programs_list_id,

    location_id,
    nutrition_programs_list_id,
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
  name?: string;
}
function TraineesTable({ name }: PageTableProps) {
  const { useGetItemsQuery, useDeleteItemMutation } = traineesApi;
  const [deleteItem] = useDeleteItemMutation();
  const pathName = useLocation().pathname;

  return (
    <MainRoute mainRoutes={[APP_ROUTE.TRAINEES_ROUTE, ""]}>
      <TablePagination<TraineeGetRes>
        mainRoute={APP_ROUTE.TRAINEES_ROUTE}
        queriesOptions={{ name }}
        nameData={"Trainees"}
        transformFun={transformDataTrainee}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default TraineesTable;
