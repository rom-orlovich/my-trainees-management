import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { leadsApi } from "../../redux/api/hooksAPI";
import { LeadsTable } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

export const transformDataLead = (arg: LeadsTable) => {
  const { note_text, name_topic, ...rest } = arg;

  return rest;
};
function LeadsTable({ name }: PageTableProps) {
  const { useGetItemsQuery, useDeleteItemMutation } = leadsApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.LEADS_ROUTE}>
      <TablePagination<LeadsTable>
        mainRoute={APP_ROUTE.LEADS_ROUTE}
        queriesOptions={{ name }}
        nameData={"Leads"}
        transformFun={transformDataLead}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default LeadsTable;
