/* eslint-disable camelcase */
import React from "react";
import { useParams } from "react-router-dom";

import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";
import { trainingProgramsApi } from "../../redux/api/hooksAPI";
import { ExerciseStatsAPI } from "../../redux/api/interfaceAPI";
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
}: ExerciseStatsAPI) => ({
  exercise_id,
  update: formatDate(update_date),
  reps,
  sets,
  intensity: `${intensity}kg`,
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

  return (
    <TablePagination
      transformFun={transformTrainingProgramList}
      actions={undefined}
      queriesOptions={queriesOptions}
      editPagePath={`${APP_ROUTE.TRAINING_PROGRAMS_LIST_ROUTE}/${params["*"]}`}
      nameData={nameData || "Exercise Stats"}
      getAllQuery={trainingProgramsApi.useGetExerciseStatsQuery}
    />
  );
}

export default TrainingProgramsExerciseStatsList;
