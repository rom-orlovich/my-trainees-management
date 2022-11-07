/* eslint-disable camelcase */

import { insertQueryOneItem } from "../../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../../utilities/constants";

export interface TrainingProgramExercise {
  training_program_row_id: number;
  update_date: Date;
  training_programs_list_id: number;
  exercise_id: number;
  reps: string;
  sets: number;
  rest: string;
  intensity: string;
  rpe: number;
  note_topic: string;
  note_text: string;
}

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
