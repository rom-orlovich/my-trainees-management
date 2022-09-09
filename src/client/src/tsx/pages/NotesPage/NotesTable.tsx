import React from "react";

import { TablePagniation } from "../../components/baseComponents/Tables/TablePagination";

import { notesAPI } from "../../redux/api/hooksAPI";
import { NotesTable as NotesTableAPI } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utlities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

function NotesTable({ name }: PageTableProps) {
  const { useGetItemsQuery, useDeleteItemMutation } = notesAPI;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.NOTES_ROUTE}>
      <TablePagniation<NotesTableAPI>
        queriesOptions={{ name }}
        nameData={"Notes List"}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default NotesTable;
