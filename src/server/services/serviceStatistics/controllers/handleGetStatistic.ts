import eachDayOfInterval from "date-fns/eachDayOfInterval";

import { RequestHandler } from "webpack-dev-server";
import {
  MeasuresCalResAPI,
  TrainingProgramExerciseStatsAPI,
} from "../../../express";
import { formatDate } from "../../../utilities/helpers";

export interface ChartDataResult {
  labelFormatted: string[];
  datasetsValues: number[];
}

export const calLabelDates = (startDate: Date, endDate: Date) => {
  const labels = eachDayOfInterval({ start: startDate, end: endDate });
  const labelFormatted = labels.map((el) => el.toLocaleDateString());
  return labelFormatted;
};
export const normalizeDatesValues = <
  T extends { id: number; date: Date; value: number }[]
>(
  arr: T
) => {
  const map = new Map();

  arr
    .sort((a, b) => a.id - b.id)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .forEach((el) => {
      map.set(el.date.getTime(), el.value);
    });

  const dates = [...map.keys()].map((el) => formatDate(el, 1));

  const values = [...map.values()];
  return {
    labelFormatted: dates,
    datasetsValues: values,
  };
};

export const calIntensity = (
  exerciseDataArr: TrainingProgramExerciseStatsAPI[]
) => exerciseDataArr.map((el) => el.intensity);

const exerciseStatsCreateLabelAndDatasets = (
  data: TrainingProgramExerciseStatsAPI[]
): ChartDataResult => {
  // const statsArr = data.sort(
  //   (a, b) => a.update_date.getTime() - b.update_date.getTime()
  // );
  // const startDate = statsArr[0].update_date;
  // const endDate = statsArr[statsArr.length - 1].update_date;
  // const labelFormatted = calLabelDates(startDate, endDate);
  // const datasetsValues = calIntensity(statsArr);
  const statsArr = data.map((el) => ({
    id: el.training_program_row_id,
    date: el.update_date,
    value: el.intensity,
  }));

  return normalizeDatesValues(statsArr);
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

const measuresChartLineCreateLabelAndDatasets = (data: MeasuresCalResAPI[]) => {
  const statsArr = data.map((el) => ({
    id: el.measure_id,
    date: el.date,
    value: el.weight,
  }));

  return normalizeDatesValues(statsArr);
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
    const results = statsResult.measures?.data;
    if (req.query.caloriesPie === "true") {
      const lastResult = results[results.length - 1];
      result = caloriesChartCreateLabelAndDatasets(lastResult);
    }

    if (req.query.measuresChartLine === "true") {
      result = measuresChartLineCreateLabelAndDatasets(results);
    }
  }

  return res
    .status(200)
    .json({ ...statsResult.measures, ...statsResult.exerciseStats, ...result });
};
