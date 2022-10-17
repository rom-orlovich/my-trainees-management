import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";

import { musclesGroupApi } from "../../redux/api/hooksAPI";
import { MusclesGroupTableAPI } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

const transformMuscleGroup = ({
  muscles_group_name,
  muscles_group_id,
}: MusclesGroupTableAPI) => ({
  muscles_group_id,
  muscles_group: muscles_group_name,
});

function MusclesGroupTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = musclesGroupApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}
    >
      <TablePagination<MusclesGroupTableAPI>
        queriesOptions={{ mainName, ...queriesOptions }}
        transformFun={transformMuscleGroup}
        nameData={"Muscles Group List"}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={
          useGetUserLoginData().authState.user?.role === "admin"
            ? (id) => deleteFunMutation(id, deleteItem)
            : undefined
        }
      />
    </InsteadOutletRoutes>
  );
}

export default MusclesGroupTable;
