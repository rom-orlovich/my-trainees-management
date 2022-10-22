import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { RequestHandler } from "webpack-dev-server";
import { TrainingProgramExerciseStatsAPI } from "../../../express";

export const calLabelDates = (startDate: Date, endDate: Date) => {
  const labels = eachDayOfInterval({ start: startDate, end: endDate });
  const labelFormatted = labels.map((el) => el.toLocaleDateString());
  return labelFormatted;
};
export const calIntensity = (
  exerciseDataArr: TrainingProgramExerciseStatsAPI[]
) => exerciseDataArr.map((el) => el.intensity);

export const handleGetStatistic: RequestHandler = async (req, res, next) => {
  if (!req.data_for_stats?.statsResult) return next();
  const { statsResult } = req.data_for_stats;
  if (statsResult.data.length > 0) {
    const statsArr = statsResult.data;
    const startDate = statsArr[0].update_date;
    const endDate = statsArr[statsArr.length - 1].update_date;
    const labelFormatted = calLabelDates(startDate, endDate);
    const datasetsValues = calIntensity(statsArr);
    return res
      .status(200)
      .json({ ...statsResult, labels: labelFormatted, datasetsValues });
  }

  res.status(200).json(statsResult);
};
