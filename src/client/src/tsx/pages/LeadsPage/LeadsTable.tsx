import React from "react";

import { TablePagniation } from "../../components/baseComponents/Tables/TablePagination";
import { LeadsFormProps } from "../../components/Forms/LeadForms/LeadForm";
import { leadsApi } from "../../redux/api/hooksAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utlities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

export const tranformDataLead = (arg: LeadsFormProps) => {
  const { note_id, note_text, name_topic, ...rest } = arg;

  return rest;
};
function LeadsTable({ name }: PageTableProps) {
  const { useGetItemsQuery, useDeleteItemMutation } = leadsApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.LEADS_ROUTE}>
      <TablePagniation<LeadsFormProps>
        mainRoute={APP_ROUTE.LEADS_ROUTE}
        queriesOptions={{ name }}
        nameData={"Leads"}
        transformFun={tranformDataLead}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default LeadsTable;
