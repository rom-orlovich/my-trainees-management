import { RequestHandler } from "express";

import { promiseHandler } from "../../../utilities/helpers";
import { insertIntoTrainingProgramExerciseData } from "../utilities/helpersStatisticsService";

// export const handleInsertTrainingProgramsStatistics: RequestHandler = () => {};
export const handleInsertStatistics: RequestHandler = async (
  req,
  res,
  next
) => {
  if (!req.statsData) return next();
  const { updateExerciseData } = req.statsData;
  const [data, error] = await promiseHandler(
    insertIntoTrainingProgramExerciseData(updateExerciseData)
  );
  // console.log("data", data);
  // console.log("error", error);
  return next();
};
