import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { leadsApi } from "../../redux/api/hooksAPI";
import { LeadsTableAPI } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

export const transformDataLead = (arg: LeadsTableAPI) => {
  const {
    note_text,
    note_topic,
    lead_id,
    first_name,
    last_name,
    date_lead,
    ...rest
  } = arg;

  return {
    id: lead_id,
    date: date_lead,
    full_name: first_name + " " + last_name,
    ...rest,
  };
};
function LeadsTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = leadsApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.LEADS_ROUTE}>
      <TablePagination<LeadsTableAPI>
        mainRoute={APP_ROUTE.LEADS_ROUTE}
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Leads"}
        transformFun={transformDataLead}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default LeadsTable;
