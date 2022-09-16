import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { musclesGroupApi } from "../../redux/api/hooksAPI";
import { MusclesGroupTableAPI } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

function MusclesGroupPage({ mainName }: PageTableProps) {
  const { useGetItemsQuery, useDeleteItemMutation } = musclesGroupApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.MUSCLES_GROUP_LIST_ROUTE}>
      <TablePagination<MusclesGroupTableAPI>
        queriesOptions={{ mainName }}
        nameData={"Muscles Group List"}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default MusclesGroupPage;
