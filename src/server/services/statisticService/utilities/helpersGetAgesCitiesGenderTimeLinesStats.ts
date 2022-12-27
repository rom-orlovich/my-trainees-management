/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */

import { GenericRecord } from "../../../utilities/types";
import {
  TimeLineDisplay,
  LeadTraineeType,
  SharedTraineesLeadsProps,
  ChartTypes,
  CHART_DISPLAY,
} from "../serviceStatisticsTypes";

import {
  calAllTimeLineObj,
  createLabelDatasetFromObj,
  createTimeLineObj,
  getResultGraphStats,
} from "./helpersGetStats";

// Calculates ages range stats
const calStatsAges = (agesStats: GenericRecord<number>, leadBirthday: Date) => {
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

// Calculates genders stats.
const calStatsGenders = (
  genderStats: GenericRecord<number>,
  gender: string
) => {
  let Gender = "";

  if (gender === "male") Gender = "Male";
  else if (gender === "female") Gender = "Female";
  else if (gender === "other") Gender = "Other";

  if (!genderStats[Gender]) {
    genderStats[Gender] = 1;
  } else genderStats[Gender]++;
};

// Calculates cities stats.
const calStatsCities = (
  cityStats: GenericRecord<number>,
  city: string | undefined
) => {
  if (!city) return;
  if (!cityStats[city]) {
    cityStats[city] = 1;
  } else cityStats[city]++;
};
// Calculates handle stats.
const calStatsHandlesStatus = (
  handleStatus: GenericRecord<number>,
  status?: boolean,
  dataType?: LeadTraineeType
) => {
  if (typeof status !== "boolean") return;
  if (dataType === "leads") {
    if (status) {
      handleStatus.handle++;
    } else {
      handleStatus.notHandle++;
    }
  } else if (status) {
    handleStatus.active++;
  } else {
    handleStatus.unActive++;
  }
};

// Create datasets values and labels
export const normalizeDatesValuesSumObj = <T, K extends keyof T>(
  sumObj: GenericRecord<T>,
  dataType: K
) => {
  const { datasetsValues, labelFormatted } = createLabelDatasetFromObj(sumObj);
  const values = datasetsValues.map((objValues) => objValues[dataType]);

  return {
    labelFormatted,
    datasetsValues: values,
  };
};

export const helpersGetAgesCitiesGenderTimeLinesStats = <
  T extends SharedTraineesLeadsProps
>(
  data: T[],
  dataType: LeadTraineeType,
  chartDisplay?: ChartTypes,
  timeLineDisplay?: TimeLineDisplay,
  dateStart?: string
) => {
  const checkIsDistributionChart = CHART_DISPLAY.DISTRIBUTION === chartDisplay;

  const agesStats: GenericRecord<number> = {};
  const gendersStats: GenericRecord<number> = {};
  const citiesStats: GenericRecord<number> = {};
  const handleStatus: GenericRecord<number> =
    dataType === "leads"
      ? { handle: 0, notHandle: 0 }
      : { active: 0, unActive: 0 };

  const initialObj = dataType === "leads" ? { leads: 0 } : { trainees: 0 };

  let objAllTimeLine = createTimeLineObj(
    initialObj,
    timeLineDisplay,
    chartDisplay,
    dateStart
  );

  return (() => {
    data.forEach((data) => {
      const curDate = data.lead_date || data.date_join || new Date();

      // cal distributed stats.
      if (checkIsDistributionChart) {
        calStatsAges(agesStats, data.birthday);
        calStatsGenders(gendersStats, data.gender);
        calStatsCities(citiesStats, data.city_name);
        calStatsHandlesStatus(handleStatus, data.status, dataType);
      }
      objAllTimeLine = calAllTimeLineObj(curDate, dataType, objAllTimeLine);
    });

    // Get results
    if (checkIsDistributionChart)
      return {
        agesStatsRes: createLabelDatasetFromObj(agesStats),
        gendersStatsRes: createLabelDatasetFromObj(gendersStats),
        calStatsCitiesRes: createLabelDatasetFromObj(citiesStats),
        calStatusHandlesRes: createLabelDatasetFromObj(handleStatus),
      };

    return {
      graphStats: getResultGraphStats(objAllTimeLine, (timeLineObj) =>
        normalizeDatesValuesSumObj(timeLineObj, dataType)
      ),
    };
  })();
};
