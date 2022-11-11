/* eslint-disable no-param-reassign */

import { formatDate } from "../../../utilities/helpers";
import { GenericRecord } from "../../../utilities/types";
import {
  ChartDisplayTypes,
  SharedTraineesLeadsProps,
} from "../serviceStatisticsTypes";
import {
  calculateYearSum,
  createLabelDatasetFromObj,
  createMonthObj,
  createThisWeekDaysDisplayObj,
  createWeeksRangeMonthObj,
  getNameMonth,
  getWeekRangeInMonthStr,
} from "./helpersGetStats";

export type SharedTraineesLeadsSumObj =
  | {
      leads: number;
      trainees?: undefined;
    }
  | {
      trainees: number;
      leads?: undefined;
    };

export type LeadTraineeType = "leads" | "trainees";

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
const calStatsGenders = (
  genderStats: GenericRecord<number>,
  gender: string
) => {
  if (!genderStats[gender]) {
    genderStats[gender] = 1;
  } else genderStats[gender]++;
};
const calStatsCities = (
  cityStats: GenericRecord<number>,
  city: string | undefined
) => {
  if (!city) return;
  if (!cityStats[city]) {
    cityStats[city] = 1;
  } else cityStats[city]++;
};

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
const calTimeLineObj = <
  O extends GenericRecord<any>,
  K1 extends keyof O,
  T extends GenericRecord<O>,
  K2 extends keyof T
>(
  dataType: K1,
  timeLine: K2,
  objTimeLine: T | undefined,
  amount?: number,
  addTimeLine?: boolean
) => {
  if (!objTimeLine) return undefined;
  if (!objTimeLine[timeLine]) {
    if (addTimeLine)
      return {
        ...objTimeLine,
        [timeLine]: {
          [dataType]: amount || 1,
        },
      };
    return { ...objTimeLine };
  }
  return {
    ...objTimeLine,
    [timeLine]: {
      ...objTimeLine[timeLine],
      [dataType]: (objTimeLine[timeLine][dataType] || 0) + (amount || 1),
    },
  } as T;
};

const calThisWeekSumObj = (
  thisWeekObj: GenericRecord<SharedTraineesLeadsSumObj> | undefined,
  date: string,
  dataType: LeadTraineeType
) => {
  if (!thisWeekObj) return undefined;
  if (!thisWeekObj[date]) return { ...thisWeekObj };
  return {
    ...thisWeekObj,
    [date]: { [dataType]: (thisWeekObj[date][dataType] || 0) + 1 },
  } as GenericRecord<SharedTraineesLeadsSumObj>;
};
const calWeeksMonthRangeSumObj = (
  weeksMonthRangeSumObj: GenericRecord<SharedTraineesLeadsSumObj> | undefined,
  week: string,
  dataType: LeadTraineeType
) => {
  if (!weeksMonthRangeSumObj) return undefined;
  if (!weeksMonthRangeSumObj[week]) return { ...weeksMonthRangeSumObj };

  return {
    ...weeksMonthRangeSumObj,
    [week]: { [dataType]: (weeksMonthRangeSumObj[week][dataType] || 0) + 1 },
  } as GenericRecord<SharedTraineesLeadsSumObj>;
};
const calMonthlySumObj = (
  monthlySumObj: GenericRecord<SharedTraineesLeadsSumObj> | undefined,
  month: keyof GenericRecord<SharedTraineesLeadsSumObj>,
  dataType: LeadTraineeType
) => {
  if (!monthlySumObj) return undefined;

  if (!monthlySumObj[month]) return { ...monthlySumObj };

  return {
    ...monthlySumObj,
    [month]: { [dataType]: (monthlySumObj[month][dataType] || 0) + 1 },
  } as GenericRecord<SharedTraineesLeadsSumObj>;
};
const calYearsSumObj = (
  yearsSumObj: GenericRecord<SharedTraineesLeadsSumObj> | undefined,
  year: number,
  dataType: LeadTraineeType
) => {
  if (!yearsSumObj) return undefined;
  if (!yearsSumObj[year]) return { ...yearsSumObj, [year]: { [dataType]: 1 } };
  return {
    ...yearsSumObj,
    [year]: { [dataType]: (yearsSumObj[year][dataType] || 0) + 1 },
  } as GenericRecord<SharedTraineesLeadsSumObj>;
};

const normalizeDatesValuesSumObj = (
  sumObj: GenericRecord<SharedTraineesLeadsSumObj>,
  dataType: LeadTraineeType
) => {
  const { datasetsValues, labelFormatted } = createLabelDatasetFromObj(sumObj);

  const values = datasetsValues.map(
    (financeObjValue) => financeObjValue[dataType]
  );

  return {
    labelFormatted,
    datasetsValues: values,
  };
};

export const getGetAgesCitiesGendersStats = <
  T extends SharedTraineesLeadsProps
>(
  data: T[],
  dataType: LeadTraineeType,
  displayStats?: ChartDisplayTypes
) => {
  if (displayStats !== "all") return {};
  const checkCurStatsDisplay = (checkDisplayStats: ChartDisplayTypes) =>
    checkDisplayStats === displayStats || displayStats === "all";
  const agesStats: GenericRecord<number> = {};
  const gendersStats: GenericRecord<number> = {};
  const citiesStats: GenericRecord<number> = {};
  const handleStatus: GenericRecord<number> =
    dataType === "leads"
      ? { handle: 0, notHandle: 0 }
      : { active: 0, unActive: 0 };

  const initialObj = dataType === "leads" ? { leads: 0 } : { trainees: 0 };

  let thisWeekSumObj = checkCurStatsDisplay("thisWeek")
    ? createThisWeekDaysDisplayObj(initialObj)
    : undefined;
  let weeksRangeMonthSumObj = checkCurStatsDisplay("weeksMonthRange")
    ? createWeeksRangeMonthObj(initialObj)
    : undefined;
  let monthlySumObj = checkCurStatsDisplay("monthly")
    ? createMonthObj(initialObj)
    : undefined;
  let yearsSumObj = checkCurStatsDisplay("yearly")
    ? ({} as GenericRecord<typeof initialObj>)
    : undefined;

  return (() => {
    data.forEach((data) => {
      const curDate = data.lead_date || data.date_join || new Date();
      const formattedDate = formatDate(curDate, 0);
      const weekRangeInMonthStr = getWeekRangeInMonthStr(curDate);
      const dateMonth = getNameMonth(curDate);
      const curYear = curDate.getFullYear();
      calStatsAges(agesStats, data.birthday);
      calStatsGenders(gendersStats, data.gender);
      calStatsCities(citiesStats, data.city_name);
      calStatsHandlesStatus(handleStatus, data.status, dataType);
      thisWeekSumObj = calTimeLineObj(dataType, formattedDate, thisWeekSumObj);
      weeksRangeMonthSumObj = calTimeLineObj(
        dataType,
        weekRangeInMonthStr,
        weeksRangeMonthSumObj
      );
      monthlySumObj = calTimeLineObj(dataType, dateMonth, monthlySumObj);
      yearsSumObj = calTimeLineObj(
        dataType,
        String(curYear),
        yearsSumObj,
        1,
        true
      );
    });
    let res: GenericRecord<any> = {
      agesStatsRes: createLabelDatasetFromObj(agesStats),
      gendersStatsRes: createLabelDatasetFromObj(gendersStats),
      calStatsCitiesRes: createLabelDatasetFromObj(citiesStats),
      calStatsHandlesLeadsRes: createLabelDatasetFromObj(handleStatus),
    };

    if (thisWeekSumObj) {
      res = {
        ...res,
        thisWeekSumObj: normalizeDatesValuesSumObj(thisWeekSumObj, dataType),
      };
    }
    if (weeksRangeMonthSumObj) {
      res = {
        ...res,
        weeksRangeMonthSumObj: normalizeDatesValuesSumObj(
          weeksRangeMonthSumObj,
          dataType
        ),
      };
    }
    if (monthlySumObj) {
      res = {
        ...res,
        monthlySumObj: normalizeDatesValuesSumObj(monthlySumObj, dataType),
      };
    }
    if (yearsSumObj) {
      res = {
        ...res,
        yearsSumObj: normalizeDatesValuesSumObj(yearsSumObj, dataType),
      };
    }

    return res;
  })();
};
