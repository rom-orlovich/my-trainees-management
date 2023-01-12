/* eslint-disable camelcase */
import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { equipmentsApi } from "../../redux/api/hooksAPI";
import { EquipmentsTableAPI } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/components/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";
import { useAppDispatch } from "../../redux/hooks";
import { openModel } from "../../redux/slices/modelControllerSlices/modelControllerSlice";

export const transformDataEquipment = (arg: EquipmentsTableAPI) => {
  const { expense_id, equipment_id, equipment_name, ...rest } = arg;

  return { equipment_id, equipment: equipment_name, ...rest };
};
function EquipmentsListTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const dispatch = useAppDispatch();
  const { useGetItemsQuery, useDeleteItemMutation } = equipmentsApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={APP_ROUTE.EQUIPMENTS_LIST_ROUTE}
    >
      <TablePagination<EquipmentsTableAPI>
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Equipments List"}
        openEditModel={(id) => {
          dispatch(
            openModel({ displayContent: "equipmentForm", curParam: id })
          );
        }}
        transformFun={transformDataEquipment}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </InsteadOutletRoutes>
  );
}

export default EquipmentsListTable;
