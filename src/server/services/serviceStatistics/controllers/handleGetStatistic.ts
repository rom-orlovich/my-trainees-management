/* eslint-disable no-param-reassign */
import { RequestHandler } from "webpack-dev-server";

import { API_ROUTES } from "../../apiRoutesConstants";

import {
  ChartDisplayTypes,
  ExerciseStatsAPI,
  ExpensesTableAPI,
  IncomesTableAPI,
  MeasuresCalResAPI,
  SharedTraineesLeadsProps,
} from "../serviceStatisticsTypes";
import { helpersGetAgesCitiesGenderTimeLinesStats } from "../utilities/helpersGetAgesCitiesGenderTimeLinesStats";
import { exerciseStatsCreateLabelAndDatasets } from "../utilities/helpersGetExercisesStats";
import { getFinanceStats } from "../utilities/helpersGetFinanceStats";
import { getMeasuresStats } from "../utilities/helpersGetMeasuresStats";

export const handleGetStatistic: RequestHandler = async (req, res, next) => {
  if (!req.statsData?.statsResult) return next();

  const { statsResult } = req.statsData;
  let rawRes = statsResult as any;
  const displayStats = req.query.displayStats as string | undefined;
  let result: Record<string, any> = {};
  if (!Array.isArray(statsResult)) {
    if (statsResult?.countRows) {
      if (req.baseUrl === API_ROUTES.EXERCISES_STATS_ROUTE) {
        result = exerciseStatsCreateLabelAndDatasets(
          statsResult?.data as ExerciseStatsAPI[]
        );
      } else if (req.baseUrl === API_ROUTES.MEASURES_ROUTE) {
        result = getMeasuresStats(
          statsResult?.data as MeasuresCalResAPI[],
          displayStats
        );
      } else if (req.baseUrl === API_ROUTES.LEADS_ROUTE) {
        result = helpersGetAgesCitiesGenderTimeLinesStats(
          statsResult?.data as SharedTraineesLeadsProps[],
          "leads",
          displayStats as ChartDisplayTypes
        );
      } else if (req.baseUrl === API_ROUTES.TRAINEES_ROUTE) {
        result = helpersGetAgesCitiesGenderTimeLinesStats(
          statsResult?.data as SharedTraineesLeadsProps[],
          "trainees",
          displayStats as ChartDisplayTypes
        );
      }
    }
    rawRes = statsResult;
  } else if (req.baseUrl === API_ROUTES.FINANCES_ROUTE) {
    const [incomesRes, expenseRes] = statsResult;
    result = getFinanceStats(
      incomesRes.data as IncomesTableAPI[],
      expenseRes.data as ExpensesTableAPI[],
      displayStats
    );
    rawRes = {
      incomes: incomesRes,
      expenses: expenseRes,
    } as any;
  }

  return res.status(200).json({
    ...rawRes,
    stats: result,
  });
};
