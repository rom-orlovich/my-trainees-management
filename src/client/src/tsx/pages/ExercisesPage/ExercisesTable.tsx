import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { exercisesApi } from "../../redux/api/hooksAPI";
import { ExercisesTableAPI } from "../../redux/api/interfaceAPI";

import MainRoute from "../../routes/MainRoute";
import { APP_ROUTE } from "../../routes/routesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

function transformExerciseTable({
  equipment_id,
  muscles_group_id,

  ...rest
}: ExercisesTableAPI) {
  return rest;
}
function ExercisesTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = exercisesApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <MainRoute mainRoutes={APP_ROUTE.EXERCISES_LIST_ROUTE}>
      <TablePagination<ExercisesTableAPI>
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Exercises List"}
        transformFun={transformExerciseTable}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </MainRoute>
  );
}

export default ExercisesTable;
