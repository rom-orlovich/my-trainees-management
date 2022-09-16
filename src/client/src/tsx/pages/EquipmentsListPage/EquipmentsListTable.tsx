import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { equipmentsApi } from "../../redux/api/hooksAPI";
import { EquipmentsTable } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

export const tranformDataEquipment = (arg: EquipmentsTable) => {
  const { expense_id, ...rest } = arg;

  return rest;
};
function EquipmentsListTable({ name }: PageTableProps) {
  const { useGetItemsQuery, useDeleteItemMutation } = equipmentsApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}>
      <TablePagination<EquipmentsTable>
        // mainRoute={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}
        queriesOptions={{ name }}
        nameData={"Equipments List"}
        transformFun={tranformDataEquipment}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default EquipmentsListTable;
