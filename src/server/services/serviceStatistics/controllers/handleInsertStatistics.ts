import { RequestHandler } from "express";
import {
  insertNewTableData,
  insertQueryOneItem,
} from "../../../PGSql/sqlHelpers";
import { promiseHandler } from "../../../utilities/helpers";
import { insertIntoTrainingProgramExerciseData } from "../utilities/helpersStatisticsService";

// export const handleInsertTrainingProgramsStatistics: RequestHandler = () => {};
export const handleInsertStatistics: RequestHandler = async (
  req,
  res,
  next
) => {
  if (!req.data_for_stats) return next();
  const { tableName, trainingProgramExerciseData } = req.data_for_stats;
  const [data, error] = await promiseHandler(
    insertIntoTrainingProgramExerciseData(
      tableName,
      trainingProgramExerciseData
    )
  );
  console.log(data);
  if (error || !data) {
    return res.sendStatus(400);
  }
  return res.status(200);
};
