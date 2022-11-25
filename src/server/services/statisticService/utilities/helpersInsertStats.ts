/* eslint-disable camelcase */

import { insertQueryOneItem } from "../../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../../utilities/constants";
import { TrainingProgramExercise } from "../serviceStatisticsTypes";

export const transformTrainingProgramExerciseData = ({
  exercise_id,
  intensity,
  reps,
  rest,
  rpe,
  sets,
  training_program_row_id,
  update_date,
}: TrainingProgramExercise) => {
  const intensityAsNumber = Number(intensity.replace(/kg/g, " ").split(" ")[0]);
  const restAsNumber = Number(rest.replace(/min/g, " ").split(" ")[0]);

  return {
    training_program_row_id,
    update_date,
    exercise_id,
    intensity: intensityAsNumber,
    sets,
    reps,
    rest: restAsNumber,
    rpe,
  };
};

export const insertIntoTrainingProgramExerciseData = async (
  updateExerciseData?: TrainingProgramExercise
) => {
  if (!updateExerciseData) return { data: [], error: undefined };
  const updateExerciseDataToInsert =
    transformTrainingProgramExerciseData(updateExerciseData);

  const data = await insertQueryOneItem(
    TABLES_DATA.TRAINING_PROGRAM_EXERCISES_STATS_TABLE_NAME,
    updateExerciseDataToInsert
  );

  return data;
};
