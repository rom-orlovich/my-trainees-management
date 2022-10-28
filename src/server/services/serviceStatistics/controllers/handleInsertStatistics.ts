import { RequestHandler } from "express";

import { promiseHandler } from "../../../utilities/helpers";
import { insertIntoTrainingProgramExerciseData } from "../utilities/helpersStatisticsService";

export const handleInsertStatistics: RequestHandler = async (
  req,
  res,
  next
) => {
  // For now the handleInsertStatistics handles only the trainingProgramExerciseData.
  if (!req.statsData) return next();
  const { updateExerciseData } = req.statsData;
  await promiseHandler(
    insertIntoTrainingProgramExerciseData(updateExerciseData)
  );

  return next();
};
