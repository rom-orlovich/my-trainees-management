import { initial } from "lodash";
import { formatDate } from "../../../utilities/helpers";
import { GenericRecord } from "../../../utilities/types";
import { logger } from "../../loggerService/logger";
import {
  ChartTypes,
  CHART_DISPLAY,
  GRAPH_TIME_LINE,
  MeasuresCalResAPI,
  TimeLineDisplay,
} from "../serviceStatisticsTypes";
import {
  calTimeLineObj,
  createMonthObj,
  createThisWeekDaysDisplayObj,
  createWeeksRangeMonthObj,
  getNameMonth,
  getWeekRangeInMonthStr,
  normalizeDatesValues,
} from "./helpersGetStats";

export const createTimeLineObj = <T extends GenericRecord<any>>(
  initialObj: T,
  timeLineDisplay?: TimeLineDisplay,
  graphDisplay?: ChartTypes,
  dateStart?: string
) => {
  if (graphDisplay !== CHART_DISPLAY.GRAPH)
    return {
      weeklySumObj: undefined,
      weeksRangeMonthSumObj: undefined,
      monthsSumObj: undefined,
      yearsSumObj: undefined,
    };
  const checkCurTimeLineDisplay = (checkTimeLineDisplay: TimeLineDisplay) =>
    checkTimeLineDisplay === timeLineDisplay;
  const weeklySumObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.WEEKLY)
    ? createThisWeekDaysDisplayObj(initialObj, dateStart)
    : undefined;
  const weeksRangeMonthSumObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.MONTHLY)
    ? createWeeksRangeMonthObj(initialObj, dateStart)
    : undefined;
  const monthsSumObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.MONTHS)
    ? createMonthObj(initialObj)
    : undefined;
  const yearsSumObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.YEARS)
    ? ({} as GenericRecord<typeof initialObj>)
    : undefined;

  return { weeklySumObj, weeksRangeMonthSumObj, monthsSumObj, yearsSumObj };
};

export const calAllTimeLineObj = <T extends GenericRecord<any>>(
  date: Date,
  dataType: string,
  weeklySumObj?: T,
  weeksRangeMonthSumObj?: T,
  monthsSumObj?: T,
  yearsSumObj?: T
) => {
  const formattedDate = formatDate(date, 0);
  const weekRangeInMonth = getWeekRangeInMonthStr(date);
  const dateMonth = getNameMonth(date);
  const curYear = date.getFullYear();

  return {
    weeklySumObj: calTimeLineObj(dataType, formattedDate, weeklySumObj),
    weeksRangeMonthSumObj: calTimeLineObj(
      dataType,
      weekRangeInMonth,
      weeksRangeMonthSumObj
    ),
    monthsSumObj: calTimeLineObj(dataType, dateMonth, monthsSumObj),
    yearsSumObj: calTimeLineObj(
      dataType,
      String(curYear),
      yearsSumObj,
      1,
      true
    ),
  };
};

export const measuresChartLineCreateLabelAndDatasets = (
  measuresCalData: MeasuresCalResAPI[],
  timeLineDisplay?: TimeLineDisplay
) => {
  const statsArr = measuresCalData
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((el) => ({
      date: el.date,
      value: el.weight,
    }));

  return normalizeDatesValues(statsArr);
};

export const caloriesChartCreateLabelAndDatasets = (
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

export const getMeasuresStats = (
  measuresData: MeasuresCalResAPI[],
  chartDisplay?: ChartTypes,
  timeLineDisplay?: TimeLineDisplay
) => {
  let result = {};
  if (chartDisplay) {
    if (chartDisplay === CHART_DISPLAY.DISTRIBUTION) {
      const lastResult = measuresData[0];
      logger.debug(`LINE 58:`, { __filename, objs: measuresData });
      result = {
        caloriesChart: caloriesChartCreateLabelAndDatasets(lastResult),
      };
    } else if (chartDisplay === CHART_DISPLAY.GRAPH)
      result = {
        graphStats: measuresChartLineCreateLabelAndDatasets(
          measuresData,
          timeLineDisplay
        ),
      };
  }

  return result;
};
