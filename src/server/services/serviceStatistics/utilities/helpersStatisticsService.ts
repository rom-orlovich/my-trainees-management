/* eslint-disable camelcase */
import { client } from "../../../PGSql/DBConnectConfig";
import {
  insertQueryOneItem,
  prepareKeyValuesToUpdate,
  updateQuerySingleItem,
} from "../../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../../utilities/constants";
import { createObjKeysArr, promiseHandler } from "../../../utilities/helpers";

export interface TrainingProgramExercise {
  training_program_row_id: number;
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
}: TrainingProgramExercise) => {
  const intensityAsNumber = Number(intensity.replace(/Kg/g, " ").split(" ")[0]);
  const restAsNumber = Number(rest.replace(/min/g, " ").split(" ")[0]);

  return {
    training_program_row_id,
    change_date: new Date(),
    exercise_id,
    intensity: intensityAsNumber,
    sets,
    reps,
    rest: restAsNumber,
    rpe,
  };
};

export const insertIntoTrainingProgramExerciseData = async (
  trainingProgramExerciseData?: TrainingProgramExercise
) => {
  if (!trainingProgramExerciseData) return { data: [], error: undefined };
  const trainingProgramExerciseDataToInsert =
    transformTrainingProgramExerciseData(trainingProgramExerciseData);

  const data = await insertQueryOneItem(
    TABLES_DATA.TRAINING_PROGRAM_EXERCISES_STATS_TABLE_NAME,
    trainingProgramExerciseDataToInsert,
    `ON CONFLICT (change_date) DO UPDATE
    SET
    training_program_row_id = EXCLUDED.training_program_row_id,
    exercise_id = EXCLUDED.exercise_id,
    intensity = EXCLUDED.intensity,
    sets = EXCLUDED.sets,
    reps = EXCLUDED.reps,
    rest = EXCLUDED.rest,
    rpe = EXCLUDED.rpe
    `
  );

  return data;
};
