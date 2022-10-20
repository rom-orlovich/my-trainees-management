/* eslint-disable camelcase */
import React from "react";
import { useParams } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { trainingProgramsApi } from "../../redux/api/hooksAPI";
import { TrainingProgramExerciseStatsAPI } from "../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { formatDate } from "../../utilities/helpersFun";

const transformTrainingProgramList = ({
  exercise_id,
  change_date,
  intensity,
  reps,
  rpe,
  sets,

  training_program_row_id,
  rest,
}: TrainingProgramExerciseStatsAPI) => ({
  exercise_id,
  update: formatDate(change_date),
  reps,
  sets,
  intensity: `${intensity} Kg`,
  rest: `${rest}min`,
  rpe,
});
function TrainingProgramsExerciseStatsList({
  queriesOptions,
  nameData,
}: { nameData?: string } & {
  queriesOptions?: Record<string, any>;
}) {
  const params = useParams();
  const { exerciseID } = params;
  // const [deleteItem] = trainingProgramsListApi.useDeleteItemMutation();
  console.log(`${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}/${params["*"]}`);
  return (
    <TablePagination
      transformFun={transformTrainingProgramList}
      // deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      queriesOptions={{ exerciseID, ...queriesOptions }}
      mainRoute={`${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}/${params["*"]}`}
      nameData={nameData || "Exercise Stats"}
      getAllQuery={trainingProgramsApi.useGetExerciseStatsQuery}
    />
  );
}

export default TrainingProgramsExerciseStatsList;
