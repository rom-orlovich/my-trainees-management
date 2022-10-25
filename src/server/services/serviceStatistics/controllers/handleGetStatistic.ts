import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { RequestHandler } from "webpack-dev-server";
import {
  MeasuresCalResAPI,
  TrainingProgramExerciseStatsAPI,
} from "../../../express";

export interface ChartDataResult {
  labelFormatted: string[];
  datasetsValues: number[];
}
export const calLabelDates = (startDate: Date, endDate: Date) => {
  const labels = eachDayOfInterval({ start: startDate, end: endDate });
  const labelFormatted = labels.map((el) => el.toLocaleDateString());
  return labelFormatted;
};
export const calIntensity = (
  exerciseDataArr: TrainingProgramExerciseStatsAPI[]
) => exerciseDataArr.map((el) => el.intensity);

const exerciseStatsCreateLabelAndDatasets = (
  data: TrainingProgramExerciseStatsAPI[]
): ChartDataResult => {
  const statsArr = data;
  const startDate = statsArr[0].update_date;
  const endDate = statsArr[statsArr.length - 1].update_date;
  const labelFormatted = calLabelDates(startDate, endDate);
  const datasetsValues = calIntensity(statsArr);
  return { labelFormatted, datasetsValues };
};

const caloriesChartCreateLabelAndDatasets = (data: MeasuresCalResAPI) => {
  const labels = ["Protein", "Fats", "Crabs"];

  return {
    weightsDisplay: {
      labelFormatted: labels,
      datasetsValues: [data.protein_g, data.fat_g, data.crabs_g],
    },
    caloriesDisplay: {
      labelFormatted: labels,
      datasetsValues: [data.protein_cals, data.fat_cals, data.crabs_cals],
    },
    calories_total: data.calories_total,
  };
};

export const handleGetStatistic: RequestHandler = async (req, res, next) => {
  if (!req.statsData?.statsResult) return next();

  const { statsResult } = req.statsData;
  let result;
  if (statsResult.exerciseStats?.data.length) {
    result = exerciseStatsCreateLabelAndDatasets(
      statsResult.exerciseStats?.data
    );
  }
  if (statsResult.measures?.data.length) {
    if (req.query.caloriesPie === "true") {
      const results = statsResult.measures?.data;
      const lastResult = results[results.length - 1];
      result = caloriesChartCreateLabelAndDatasets(lastResult);
    }
  }

  return res
    .status(200)
    .json({ ...statsResult.measures, ...statsResult.exerciseStats, ...result });
};
