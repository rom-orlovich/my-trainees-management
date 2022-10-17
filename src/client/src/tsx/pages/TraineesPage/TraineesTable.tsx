/* eslint-disable camelcase */
import React from "react";
import { useLocation } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { traineesApi } from "../../redux/api/hooksAPI";
import { TraineesTableExtendsAPI } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
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
    date_join,
    last_name,
    first_name,
    trainee_id,
    trainer_user_id,

    ...rest
  } = arg;

  return {
    id: arg.trainee_id,
    full_name: `${arg.first_name} ${arg.last_name}`,
    ...rest,
  };
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
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={[APP_ROUTE.TRAINEES_ROUTE, ""]}
    >
      <TablePagination<TraineesTableExtendsAPI>
        mainRoute={APP_ROUTE.TRAINEES_ROUTE}
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Trainees"}
        transformFun={transformDataTrainee}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </InsteadOutletRoutes>
  );
}

export default TraineesTable;
