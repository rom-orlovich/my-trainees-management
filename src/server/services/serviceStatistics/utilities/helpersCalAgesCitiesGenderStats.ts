/* eslint-disable no-param-reassign */

import { LeadsTableAPI } from "../serviceStatisticsTypes";
import { createLabelDatasetFromObj } from "./helpersGetStats";

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

export const getCalAgesCitiesGendersStats = (data: LeadsTableAPI[]) => {
  const agesStats: Record<string, number> = {};
  const gendersStats: Record<string, number> = {};
  const citiesStats: Record<string, number> = {};
  const handleLeadsStats: Record<string, number> = {};

  return (() => {
    data.forEach((data) => {
      calStatsAges(agesStats, data.birthday);
      calStatsGenders(gendersStats, data.gender);
      calStatsCities(citiesStats, data.city_name);
      calStatsHandlesLeads(handleLeadsStats, data.status);
    });
    const res = {
      agesStatsRes: createLabelDatasetFromObj(agesStats),
      gendersStatsRes: createLabelDatasetFromObj(gendersStats),
      calStatsCitiesRes: createLabelDatasetFromObj(citiesStats),
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
