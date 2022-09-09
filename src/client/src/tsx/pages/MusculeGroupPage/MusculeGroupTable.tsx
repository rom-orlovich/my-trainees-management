import React from "react";

import { TablePagniation } from "../../components/baseComponents/Tables/TablePagination";

import { musculesGroupApi } from "../../redux/api/hooksAPI";
import { MusculesGroupTable as MusculesGroupTableAPI } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utlities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

function MusculesGroupTable({ name }: PageTableProps) {
  const { useGetItemsQuery, useDeleteItemMutation } = musculesGroupApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.MUSCULES_GROUP_LIST_ROUTE}>
      <TablePagniation<MusculesGroupTableAPI>
        queriesOptions={{ name }}
        nameData={"Muscules Group List"}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default MusculesGroupTable;