import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";

import { musclesGroupApi } from "../../redux/api/hooksAPI";
import { MusclesGroupTableAPI } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

const transformMuscleGroup = ({
  muscles_group_name,
  muscles_group_id,
}: MusclesGroupTableAPI) => {
  return { muscles_group_id, muscles_group: muscles_group_name };
};

function MusclesGroupTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = musclesGroupApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}>
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
    </MainRoute>
  );
}

export default MusclesGroupTable;
