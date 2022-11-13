/* eslint-disable no-param-reassign */
import { RequestHandler } from "webpack-dev-server";

import { API_ROUTES } from "../../apiRoutesConstants";

import {
  TimeLineDisplay,
  ExerciseStatsAPI,
  ExpensesTableAPI,
  IncomesTableAPI,
  MeasuresCalResAPI,
  SharedTraineesLeadsProps,
  ChartTypes,
} from "../serviceStatisticsTypes";
import { helpersGetAgesCitiesGenderTimeLinesStats } from "../utilities/helpersGetAgesCitiesGenderTimeLinesStats";
import { exerciseStatsCreateLabelAndDatasets } from "../utilities/helpersGetExercisesStats";
import { getFinanceStats } from "../utilities/helpersGetFinanceStats";
import { getMeasuresStats } from "../utilities/helpersGetMeasuresStats";

export const handleGetStatistic: RequestHandler = async (req, res, next) => {
  if (!req.statsData?.statsResult) return next();

  const { statsResult } = req.statsData;
  let rawRes = statsResult as any;
  const timeLineDisplay = req.query.timeLineDisplay as string | undefined;
  const chartDisplay = req.query.chartDisplay as string | undefined;
  let result: Record<string, any> = {};
  if (!Array.isArray(statsResult)) {
    if (statsResult?.countRows) {
      if (req.baseUrl === API_ROUTES.EXERCISES_STATS_ROUTE) {
        result = exerciseStatsCreateLabelAndDatasets(
          statsResult?.data as ExerciseStatsAPI[],

          timeLineDisplay as TimeLineDisplay
        );
      } else if (req.baseUrl === API_ROUTES.MEASURES_ROUTE) {
        result = getMeasuresStats(
          statsResult?.data as MeasuresCalResAPI[],
          chartDisplay as ChartTypes,
          timeLineDisplay as TimeLineDisplay
        );
      } else if (req.baseUrl === API_ROUTES.LEADS_ROUTE) {
        result = helpersGetAgesCitiesGenderTimeLinesStats(
          statsResult?.data as SharedTraineesLeadsProps[],
          "leads",
          chartDisplay as ChartTypes,
          timeLineDisplay as TimeLineDisplay
        );
      } else if (req.baseUrl === API_ROUTES.TRAINEES_ROUTE) {
        result = helpersGetAgesCitiesGenderTimeLinesStats(
          statsResult?.data as SharedTraineesLeadsProps[],
          "trainees",
          chartDisplay as ChartTypes,
          timeLineDisplay as TimeLineDisplay
        );
      }
    }
    rawRes = statsResult;
  } else if (req.baseUrl === API_ROUTES.FINANCES_ROUTE) {
    const [incomesRes, expenseRes] = statsResult;
    result = getFinanceStats(
      incomesRes.data as IncomesTableAPI[],
      expenseRes.data as ExpensesTableAPI[],
      chartDisplay as ChartTypes,
      timeLineDisplay as TimeLineDisplay
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
