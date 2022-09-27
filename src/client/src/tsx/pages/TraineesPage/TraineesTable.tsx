import React from "react";
import { useLocation } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { traineesApi } from "../../redux/api/hooksAPI";
import { TraineeTableAPI } from "../../redux/api/interfaceAPI";
import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";

// export const transformDataTrainee = (arg: TraineeTableAPI) => {
//   const {
//     training_programs_list_id,

//     location_id,
//     nutrition_programs_list_id,
//     birthday,
//     identify_num,
//     street,
//     phone_number,
//     city_name,
//     email,
//     subscription_plan_id,
//     ...rest
//   } = arg;

//   return rest;
// };
export const transformDataTrainee = (arg: TraineeTableAPI) => {
  const {
    // training_programs_list_id,

    location_id,
    // nutrition_programs_list_id,
    birthday,
    identify_num,
    street,
    phone_number,
    city_name,
    email,
    // subscription_plan_id,
    ...rest
  } = arg;

  return rest;
};
export interface PageTableProps {
  mainName?: string;
}
function TraineesTable({ mainName }: PageTableProps) {
  const { useGetItemsQuery, useDeleteItemMutation } = traineesApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={[APP_ROUTE.TRAINEES_ROUTE, ""]}>
      <TablePagination<TraineeTableAPI>
        mainRoute={APP_ROUTE.TRAINEES_ROUTE}
        queriesOptions={{ mainName }}
        nameData={"Trainees"}
        transformFun={transformDataTrainee}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default TraineesTable;
