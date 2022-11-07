/* eslint-disable no-param-reassign */
import { RequestHandler } from "webpack-dev-server";

import { API_ROUTES } from "../../apiRoutesConstants";
import { logger } from "../../loggerService/logger";
import {
  ExerciseStatsAPI,
  LeadsTableAPI,
  MeasuresCalResAPI,
} from "../serviceStatisticsTypes";
import { getGetAgesCitiesGendersStats } from "../utilities/helpersGetAgesCitiesGenderStats";
import { exerciseStatsCreateLabelAndDatasets } from "../utilities/helpersGetExercisesStats";
import {
  caloriesChartCreateLabelAndDatasets,
  measuresChartLineCreateLabelAndDatasets,
} from "../utilities/helpersGetMeasuresStats";

export const handleGetStatistic: RequestHandler = async (req, res, next) => {
  if (!req.statsData?.statsResult) return next();

  const { statsResult } = req.statsData;

  let result: Record<string, any> = {};
  if (statsResult?.countRows) {
    if (req.baseUrl === API_ROUTES.EXERCISES_STATS_ROUTE) {
      result = exerciseStatsCreateLabelAndDatasets(
        statsResult?.data as ExerciseStatsAPI[]
      );
    } else if (req.baseUrl === API_ROUTES.MEASURES_ROUTE) {
      const results = statsResult?.data as MeasuresCalResAPI[];
      if (req.query.caloriesPie === "true") {
        const lastResult = results[results.length - 1];
        result = caloriesChartCreateLabelAndDatasets(lastResult);
      } else if (req.query.measuresChartLine === "true") {
        result = measuresChartLineCreateLabelAndDatasets(results);
      }
    } else if (req.baseUrl === API_ROUTES.LEADS_ROUTE) {
      if (req.query.stats === "true") {
        result = getGetAgesCitiesGendersStats(
          statsResult?.data as LeadsTableAPI[]
        );
      }
    } else if (req.baseUrl === API_ROUTES.INCOMES_ROUTE) {
      if (req.query.stats === "true") {
      }
    }
  }

  return res.status(200).json({
    ...statsResult,
    ...result,
  });
};
