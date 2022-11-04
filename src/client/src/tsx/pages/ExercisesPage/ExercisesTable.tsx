/* eslint-disable camelcase */
import React from "react";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { exercisesApi } from "../../redux/api/hooksAPI";
import { ExercisesTableAPI } from "../../redux/api/interfaceAPI";

import InsteadOutletRoutes from "../../routes/utilities/InsteadOutletRoutes";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { deleteFunMutation } from "../../utilities/helpersFun";
import { PageTableProps } from "../TraineesPage/TraineesTable";

function transformExerciseTable({
  exercise_name,
  muscles_group_name,
  equipment_name,
  exercise_id,
}: ExercisesTableAPI) {
  return {
    exercise_id,
    exercise: exercise_name,
    muscles_group: muscles_group_name,
    equipment: equipment_name,
  };
}
function ExercisesTable({
  mainName,
  queriesOptions,
}: PageTableProps & { queriesOptions?: Record<string, any> }) {
  const { useGetItemsQuery, useDeleteItemMutation } = exercisesApi;
  const [deleteItem] = useDeleteItemMutation();

  return (
    <InsteadOutletRoutes
      InsteadOutletRoutesPaths={APP_ROUTE.EXERCISES_LIST_ROUTE}
    >
      <TablePagination<ExercisesTableAPI>
        queriesOptions={{ mainName, ...queriesOptions }}
        nameData={"Exercises List"}
        transformFun={transformExerciseTable}
        getAllQuery={useGetItemsQuery}
        deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      />
    </InsteadOutletRoutes>
  );
}

export default ExercisesTable;
