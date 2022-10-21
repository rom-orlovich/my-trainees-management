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
  update_date,
  intensity,
  reps,
  rpe,
  sets,

  rest,
}: TrainingProgramExerciseStatsAPI) => ({
  exercise_id,
  update: formatDate(update_date),
  reps,
  sets,
  intensity: `${intensity}Kg`,
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

  return (
    <TablePagination
      transformFun={transformTrainingProgramList}
      // deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
      actions={false}
      queriesOptions={{ exerciseID, ...queriesOptions }}
      editPagePath={`${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}/${params["*"]}`}
      nameData={nameData || "Exercise Stats"}
      getAllQuery={trainingProgramsApi.useGetExerciseStatsQuery}
    />
  );
}

export default TrainingProgramsExerciseStatsList;
