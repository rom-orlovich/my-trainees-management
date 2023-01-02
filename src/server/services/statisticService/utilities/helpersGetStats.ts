/* eslint-disable no-param-reassign */
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  getDaysInMonth,
  lastDayOfMonth,
  startOfWeek,
} from "date-fns";
import { addToDate } from "../../../utilities/helpers";
import { GenericRecord } from "../../../utilities/types";
import {
  ChartTypes,
  CHART_DISPLAY,
  GRAPH_TIME_LINE,
  TimeLineDisplay,
} from "../serviceStatisticsTypes";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getNameMonth = (date: Date) => format(date, "MMMMMM");
export const getDateLocal = (date: Date) => format(date, "dd/MM/yy");
export const createLabelDatasetFromObj = <T extends GenericRecord<T[keyof T]>>(
  obj: T
) => ({
  labelFormatted: Object.keys(obj),
  datasetsValues: Object.values(obj),
});

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
  const dates = [...map.keys()].map((el) => getDateLocal(el));

  // Make array of the values.
  const values = [...map.values()];
  return {
    labelFormatted: dates,
    datasetsValues: values,
  };
};

// Creates for each day in the week a initialObj.
export const createThisWeekDaysDisplayObj = <
  K extends GenericRecord<any>,
  R = GenericRecord<K>
>(
  initialObj: K,
  dateStart?: string
) => {
  const curDate = dateStart ? new Date(dateStart) : new Date();
  // Get the start and the end date of the week.
  const startWeek = startOfWeek(curDate);
  const endWeek = endOfWeek(curDate);
  let weeklyDaysObj = {} as R;
  // Create array of dates.
  eachDayOfInterval({
    start: startWeek,
    end: endWeek,
  }).forEach((date) => {
    weeklyDaysObj = {
      ...weeklyDaysObj,
      [getDateLocal(date)]: { ...initialObj },
    };
  });
  return weeklyDaysObj;
};

// Gets date and return his week range in month.
export const getWeekRangeInMonthStr = (date: Date) => {
  const curDate = new Date(date);
  const curDay = curDate.getDate();
  const remainder = curDay % 7;
  const dateStartWeek = new Date(curDate.setDate(curDay - remainder));
  const start = getDateLocal(addToDate(dateStartWeek, { dPlus: 1 }));
  const str = `${start}`;
  return str;
};

// Creates createWeeksRangeMonthObj.
export const createWeeksRangeMonthObj = <
  K extends GenericRecord<any>,
  R = GenericRecord<K>
>(
  initialObj: K,
  dateStart?: string
) => {
  const curDate = dateStart ? new Date(dateStart) : new Date();
  const firstDate = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
  const lastDate = lastDayOfMonth(curDate);

  let weeksRangeMonthFinanceObj = {} as R;

  // Creates createWeeksRangeMonthObj by looping over the datesArr parameter the function get.
  const loopToCreateWeeksRangeMonthObj = (datesArr: Date[]) => {
    for (let i = 0; i < datesArr.length - 1; i++) {
      weeksRangeMonthFinanceObj = {
        ...weeksRangeMonthFinanceObj,
        [`${getWeekRangeInMonthStr(datesArr[i])}`]: { ...initialObj },
      };
    }
  };

  // Create dates array of the first day in each week that exist in month, start from the 1th.
  const datesEachSevenDay = eachDayOfInterval(
    { start: firstDate, end: lastDate },
    { step: 7 }
  );

  loopToCreateWeeksRangeMonthObj(datesEachSevenDay);

  // Create dates array from the last days of the month if they exist.
  if (getDaysInMonth(curDate) > 28) {
    const dateStart = datesEachSevenDay[datesEachSevenDay.length - 1];

    weeksRangeMonthFinanceObj = {
      ...weeksRangeMonthFinanceObj,
      [`${getDateLocal(dateStart)}`]: {
        ...initialObj,
      },
    };
  }

  return weeksRangeMonthFinanceObj;
};

// Creates for each month a initialObj.
export const createMonthObj = <
  K extends GenericRecord<any>,
  R = GenericRecord<K>
>(
  initialObj: K
) => {
  let monthsFinancesObj = {} as R;
  MONTHS.forEach((month) => {
    monthsFinancesObj = {
      ...monthsFinancesObj,
      [month]: { ...initialObj },
    };
  });
  return monthsFinancesObj;
};

export interface ObjAllTimeLine<T> {
  allPeriodObj?: GenericRecord<T>;
  weeklyPeriodObj?: GenericRecord<T>;
  monthlyPeriodObj?: GenericRecord<T>;
  monthsPeriodObj?: GenericRecord<T>;
  yearsSumObj?: GenericRecord<T>;
}
export const createTimeLineObj = <T extends GenericRecord<any>>(
  initialObj: T,
  timeLineDisplay?: TimeLineDisplay,
  graphDisplay?: ChartTypes,
  dateStart?: string
): ObjAllTimeLine<T> => {
  if (graphDisplay !== CHART_DISPLAY.GRAPH)
    return {
      allPeriodObj: undefined,
      weeklyPeriodObj: undefined,
      monthlyPeriodObj: undefined,
      monthsPeriodObj: undefined,
      yearsSumObj: undefined,
    };
  const checkCurTimeLineDisplay = (checkTimeLineDisplay: TimeLineDisplay) =>
    checkTimeLineDisplay === timeLineDisplay;
  const allPeriodObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.ALL)
    ? ({} as GenericRecord<typeof initialObj>)
    : undefined;

  const weeklyPeriodObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.WEEKLY)
    ? createThisWeekDaysDisplayObj(initialObj, dateStart)
    : undefined;
  const monthlyPeriodObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.MONTHLY)
    ? createWeeksRangeMonthObj(initialObj, dateStart)
    : undefined;
  const monthsPeriodObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.MONTHS)
    ? createMonthObj(initialObj)
    : undefined;
  const yearsSumObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.YEARS)
    ? ({} as GenericRecord<typeof initialObj>)
    : undefined;

  return {
    allPeriodObj,
    weeklyPeriodObj,
    monthlyPeriodObj,
    monthsPeriodObj,
    yearsSumObj,
  };
};
// Generic function that calculate object timeline in pure way.
export const calTimeLineObj = <
  O extends GenericRecord<any>,
  K1 extends keyof O,
  T extends GenericRecord<O>,
  K2 extends keyof T
>(
  dataType: K1,
  timeLine: K2,
  objTimeLine: T | undefined,
  options: { amount?: number; assignNum?: number; addTimeLine?: boolean } = {}
) => {
  if (!objTimeLine) return undefined;

  if (!objTimeLine[timeLine]) {
    // There are some timelines like weekly, monthly, months that are predefined. if the  addTimeLine is true, the dates will add and impure these timeline with new dates.
    if (options?.addTimeLine)
      return {
        ...objTimeLine,
        [timeLine]: {
          [dataType]: options.amount || 1,
        },
      };

    return { ...objTimeLine } as T;
  }

  // Some calculation stats must only be assigned and not summarized with the old amounts.
  if (options?.assignNum)
    return {
      ...objTimeLine,
      [timeLine]: {
        ...objTimeLine[timeLine],
        [dataType]: options.assignNum,
      },
    } as T;

  return {
    ...objTimeLine,
    [timeLine]: {
      ...objTimeLine[timeLine],
      [dataType]:
        (objTimeLine[timeLine][dataType] || 0) + (options.amount || 1),
    },
  } as T;
};
export const calAllTimeLineObj = <T extends GenericRecord<any>>(
  date: Date,
  dataType: string,
  objAllTimeLine: ObjAllTimeLine<T>,
  options: {
    amount?: number;
    assignNum?: number;
  } = {}
) => {
  const formattedDate = getDateLocal(date);

  const weekRangeInMonth = getWeekRangeInMonthStr(date);

  const dateMonth = getNameMonth(date);
  const curYear = date.getFullYear();

  return {
    allPeriodObj: calTimeLineObj(
      dataType,
      formattedDate,
      objAllTimeLine.allPeriodObj,
      { ...options, addTimeLine: true }
    ),
    weeklyPeriodObj: calTimeLineObj(
      dataType,
      formattedDate,
      objAllTimeLine.weeklyPeriodObj,
      { ...options, addTimeLine: false }
    ),
    monthlyPeriodObj: calTimeLineObj(
      dataType,
      weekRangeInMonth,
      objAllTimeLine.monthlyPeriodObj,
      { ...options, addTimeLine: false }
    ),
    monthsPeriodObj: calTimeLineObj(
      dataType,
      dateMonth,
      objAllTimeLine.monthsPeriodObj,
      { ...options, addTimeLine: false }
    ),
    yearsSumObj: calTimeLineObj(
      dataType,
      String(curYear),
      objAllTimeLine.yearsSumObj,
      { ...options, addTimeLine: true }
    ),
  };
};

export const getResultGraphStats = <T>(
  objAllTimeLine: ObjAllTimeLine<T>,
  normalizeDateValues: (timeLine: GenericRecord<T>) => any
) => {
  if (objAllTimeLine.allPeriodObj)
    return normalizeDateValues(objAllTimeLine.allPeriodObj);
  if (objAllTimeLine.weeklyPeriodObj)
    return normalizeDateValues(objAllTimeLine.weeklyPeriodObj);

  if (objAllTimeLine.monthlyPeriodObj)
    return normalizeDateValues(objAllTimeLine.monthlyPeriodObj);

  if (objAllTimeLine.monthsPeriodObj)
    return normalizeDateValues(objAllTimeLine.monthsPeriodObj);

  if (objAllTimeLine.yearsSumObj)
    return normalizeDateValues(objAllTimeLine.yearsSumObj);

  return {};
};
