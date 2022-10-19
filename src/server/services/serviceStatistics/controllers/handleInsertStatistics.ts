import { RequestHandler } from "express";
import {
  insertNewTableData,
  insertQueryOneItem,
} from "../../../PGSql/sqlHelpers";
import { promiseHandler } from "../../../utilities/helpers";

export interface TrainingProgramExercise {
  training_program_stats_id: number;
  training_program_row_id: number;
  exercise_id: number;
  reps: string;
  sets: number;
  rest: string;
  intensity: string;
  rpe: number;
}
// export const handleInsertTrainingProgramsStatistics: RequestHandler = () => {};
export const handleInsertStatistics: RequestHandler = async (
  req,
  res,
  next
) => {
  if (!req.data_for_stats) return next();
  const { tableName } = req.data_for_stats;

  if (req.data_for_stats.trainingProgramExerciseData) {
    const { trainingProgramExerciseData } = req.data_for_stats;
    const [data, error] = await promiseHandler(
      insertQueryOneItem(tableName, trainingProgramExerciseData)
    );
    console.log(data);
    if (error || !data) {
      return res.sendStatus(400);
    }
    return res.status(200);
  }
  return next();
};
