import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { exercisesApi } from "../../redux/api/hooksAPI";
import { ExercisesTableAPI } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

function ExercisesTable({ mainName }: PageTableProps) {
  const { useGetItemsQuery, useDeleteItemMutation } = exercisesApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.EXERCISES_LIST_ROUTE}>
      <TablePagination<ExercisesTableAPI>
        queriesOptions={{ mainName }}
        nameData={"Exercises List"}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default ExercisesTable;
