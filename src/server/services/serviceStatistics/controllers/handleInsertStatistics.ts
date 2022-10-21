import { RequestHandler } from "express";

import { promiseHandler } from "../../../utilities/helpers";
import { insertIntoTrainingProgramExerciseData } from "../utilities/helpersStatisticsService";

// export const handleInsertTrainingProgramsStatistics: RequestHandler = () => {};
export const handleInsertStatistics: RequestHandler = async (
  req,
  res,
  next
) => {
  if (!req.data_for_stats) return next();
  const { updateExerciseData } = req.data_for_stats;
  const [data, error] = await promiseHandler(
    insertIntoTrainingProgramExerciseData(updateExerciseData)
  );
  console.log("data", data);
  console.log("error", error);
  return next();
};
