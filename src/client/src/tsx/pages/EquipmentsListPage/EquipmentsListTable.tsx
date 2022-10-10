import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { equipmentsApi } from "../../redux/api/hooksAPI";
import { EquipmentsTableAPI } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

export const transformDataEquipment = (arg: EquipmentsTableAPI) => {
  const { expense_id, equipment_id, equipment_name, ...rest } = arg;

  return { equipment_id, equipment: equipment_name, ...rest };
};
function EquipmentsListTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = equipmentsApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}>
      <TablePagination<EquipmentsTableAPI>
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Equipments List"}
        transformFun={transformDataEquipment}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default EquipmentsListTable;
