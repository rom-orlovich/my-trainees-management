/* eslint-disable no-param-reassign */
import { RequestHandler } from "webpack-dev-server";

import {
  MeasuresCalResAPI,
  ExerciseStatsAPI,
  LeadsTableAPI,
} from "../../../express";
import { formatDate } from "../../../utilities/helpers";
import { API_ROUTES } from "../../apiRoutesConstants";

export interface ChartDataResult {
  labelFormatted: string[];
  datasetsValues: number[];
}

export const normalizeDatesValues = <T extends { date: Date; value: number }[]>(
  arr: T
) => {
  const map = new Map();
  // To get the most updated result by the number of results the client provides.
  arr

    // To set the most update value to the same date.
    .forEach((el) => {
      map.set(el.date.getTime(), el.value);
    });

  // Make array of the formatted dates.
  const dates = [...map.keys()].map((el) => formatDate(el, 1));

  // Make array of the values.
  const values = [...map.values()];
  return {
    labelFormatted: dates,
    datasetsValues: values,
  };
};

const exerciseStatsCreateLabelAndDatasets = (
  exerciseStatsAPI: ExerciseStatsAPI[]
): ChartDataResult => {
  const statsArr = exerciseStatsAPI
    .sort((a, b) => a.update_date.getTime() - b.update_date.getTime())
    .map((el) => ({
      date: el.update_date,
      value: el.intensity,
    }));

  return normalizeDatesValues(statsArr);
};

const measuresChartLineCreateLabelAndDatasets = (
  measuresCalData: MeasuresCalResAPI[]
) => {
  const statsArr = measuresCalData
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((el) => ({
      date: el.date,
      value: el.weight,
    }));

  return normalizeDatesValues(statsArr);
};

const caloriesChartCreateLabelAndDatasets = (
  measuresCalData: MeasuresCalResAPI
) => {
  const labels = ["Protein", "Fats", "Crabs"];

  return {
    weightsDisplay: {
      labelFormatted: labels,
      datasetsValues: [
        measuresCalData.protein_g,
        measuresCalData.fat_g,
        measuresCalData.crabs_g,
      ],
    },
    caloriesDisplay: {
      labelFormatted: labels,
      datasetsValues: [
        measuresCalData.protein_cals,
        measuresCalData.fat_cals,
        measuresCalData.crabs_cals,
      ],
    },
    calories_total: measuresCalData.calories_total,
  };
};

interface GenderStats {
  male: number;
  female: number;
  other: number;
}

const createLabelDatasetFromObj = <T extends Record<string, number>>(
  obj: T
) => ({
  labelFormatted: Object.keys(obj),
  datasetsValues: Object.values(obj),
});

const calStatsAges = (
  agesStats: Record<string, number>,
  leadBirthday: Date
) => {
  const age = new Date().getFullYear() - leadBirthday.getFullYear();

  if (age >= 12 && age <= 18) {
    if (!agesStats["12-18"]) {
      agesStats["12-18"] = 1;
    } else agesStats["12-18"]++;
  }
  if (age >= 19 && age <= 30) {
    if (!agesStats["19-30"]) {
      agesStats["19-30"] = 1;
    } else agesStats["19-30"]++;
  }
  if (age >= 31 && age <= 50) {
    if (!agesStats["31-50"]) {
      agesStats["31-50"] = 1;
    } else agesStats["31-50"]++;
  }
  if (age >= 51 && age <= 70) {
    if (!agesStats["51-70"]) {
      agesStats["51-70"] = 1;
    } else agesStats["51-70"]++;
  }
  if (age >= 71 && age <= 100) {
    if (!agesStats["71-100"]) {
      agesStats["71-100"] = 1;
    } else agesStats["71-100"]++;
  }
};
const calStatsGenders = (
  genderStats: Record<string, number>,
  gender: string
) => {
  if (!genderStats[gender]) {
    genderStats[gender] = 1;
  } else genderStats[gender]++;
};
const calStatsCities = (
  cityStats: Record<string, number>,
  city: string | undefined
) => {
  if (!city) return;
  if (!cityStats[city]) {
    cityStats[city] = 1;
  } else cityStats[city]++;
};

const calStatsHandlesLeads = (
  handleLeadsStats: Record<string, number>,
  status?: boolean
) => {
  if (typeof status !== "boolean") return;
  if (status) {
    if (!handleLeadsStats.handle) handleLeadsStats.handle = 1;
    else handleLeadsStats.handle++;
  } else if (!handleLeadsStats.notHandle) handleLeadsStats.notHandle = 1;
  else handleLeadsStats.notHandle++;
};

// const calAmountLeadsPerDate = (leadsData: LeadsTableAPI[]) => {
//   const statsArr = leadsData
//     .sort((a, b) => a.lead_date.getTime() - b.lead_date.getTime())
//     .map((el, index) => ({
//       date: el.lead_date,
//       value: index + 1,
//     }));

//   return normalizeDatesValues(statsArr);
// };

const getCalAgesCitiesGendersStats = (data: LeadsTableAPI[]) => {
  const agesStats: Record<string, number> = {};
  const gendersStats: Record<string, number> = {};
  const citiesStats: Record<string, number> = {};
  const handleLeadsStats: Record<string, number> = {};

  return (() => {
    data.forEach((data) => {
      calStatsAges(agesStats, data.birthday);
      calStatsGenders(gendersStats, data.gender as keyof GenderStats);
      calStatsCities(citiesStats, data.city_name);
      calStatsHandlesLeads(handleLeadsStats, data.status);
    });
    const res = {
      agesStatsRes: createLabelDatasetFromObj(agesStats),
      gendersStatsRes: createLabelDatasetFromObj(gendersStats),
      calStatsCitiesRes: createLabelDatasetFromObj(citiesStats),
      // calAmountLeadsPerDate: calAmountLeadsPerDate(data),
    };

    if (handleLeadsStats.handle || handleLeadsStats.notHandle)
      return {
        ...res,
        calStatsHandlesLeadsRes: createLabelDatasetFromObj(handleLeadsStats),
      };
    return {
      ...res,
    };
  })();
};

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
        result = getCalAgesCitiesGendersStats(
          statsResult?.data as LeadsTableAPI[]
        );
      }
    }
  }

  return res.status(200).json({
    ...statsResult,
    ...result,
  });
};
