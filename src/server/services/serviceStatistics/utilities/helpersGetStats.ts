/* eslint-disable no-param-reassign */
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  getDaysInMonth,
  lastDayOfMonth,
  startOfWeek,
} from "date-fns";
import { formatDate } from "../../../utilities/helpers";
import { GenericRecord } from "../../../utilities/types";
import {
  ChartTypes,
  CHART_DISPLAY,
  GRAPH_TIME_LINE,
  TimeLineDisplay,
} from "../serviceStatisticsTypes";

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
  const dates = [...map.keys()].map((el) => formatDate(el, 1));

  // Make array of the values.
  const values = [...map.values()];
  return {
    labelFormatted: dates,
    datasetsValues: values,
  };
};

export const getNameMonth = (date: Date) => format(date, "MMMMMM");

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
      [formatDate(date, 0)]: { ...initialObj },
    };
  });
  return weeklyDaysObj;
};

// Gets date and return his week range in month.
export const getWeekRangeInMonthStr = (date: Date) => {
  const curDate = new Date(date);
  const curDay = curDate.getDate();
  const remainder = curDay % 7;
  const reminderDiff = 7 - remainder;

  const start = formatDate(new Date(date.setDate(curDay - remainder)));
  const end = formatDate(new Date(curDate.setDate(curDay + reminderDiff - 1)));

  const str = `${start}-${end}`;
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
  const loopToCreateWeeksRangeMonthObj = (
    datesArr: Date[],
    subtractLastDay = -1 // In the last days of month subtractLastDay is zero, to get all the days.
  ) => {
    for (let i = 0; i < datesArr.length - 1; i++) {
      const startWeek = formatDate(datesArr[i], 0);
      const endWeek = formatDate(datesArr[i + 1], subtractLastDay);
      weeksRangeMonthFinanceObj = {
        ...weeksRangeMonthFinanceObj,
        [`${startWeek}-${endWeek}`]: { ...initialObj },
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
    const endMonthDates = eachDayOfInterval({
      start: datesEachSevenDay.at(-1)!,
      end: lastDate,
    });
    loopToCreateWeeksRangeMonthObj(endMonthDates, 0);
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
  const months = [
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
  let monthsFinancesObj = {} as R;
  months.forEach((month) => {
    monthsFinancesObj = {
      ...monthsFinancesObj,
      [month]: { ...initialObj },
    };
  });
  return monthsFinancesObj;
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

export const createTimeLineObj = <T extends GenericRecord<any>>(
  initialObj: T,
  timeLineDisplay?: TimeLineDisplay,
  graphDisplay?: ChartTypes,
  dateStart?: string
) => {
  if (graphDisplay !== CHART_DISPLAY.GRAPH)
    return {
      weeklySumObj: undefined,
      monthlySumObj: undefined,
      monthsSumObj: undefined,
      yearsSumObj: undefined,
    };
  const checkCurTimeLineDisplay = (checkTimeLineDisplay: TimeLineDisplay) =>
    checkTimeLineDisplay === timeLineDisplay;
  const weeklySumObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.WEEKLY)
    ? createThisWeekDaysDisplayObj(initialObj, dateStart)
    : undefined;
  const monthlySumObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.MONTHLY)
    ? createWeeksRangeMonthObj(initialObj, dateStart)
    : undefined;
  const monthsSumObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.MONTHS)
    ? createMonthObj(initialObj)
    : undefined;
  const yearsSumObj = checkCurTimeLineDisplay(GRAPH_TIME_LINE.YEARS)
    ? ({} as GenericRecord<typeof initialObj>)
    : undefined;

  return { weeklySumObj, monthlySumObj, monthsSumObj, yearsSumObj };
};

export const calAllTimeLineObj = <T extends GenericRecord<any>>(
  date: Date,
  dataType: string,
  objAllTimeLine: {
    weeklySumObj?: GenericRecord<T>;
    monthlySumObj?: GenericRecord<T>;
    monthsSumObj?: GenericRecord<T>;
    yearsSumObj?: GenericRecord<T>;
  },
  amount?: number
) => {
  const formattedDate = formatDate(date, 0);
  const weekRangeInMonth = getWeekRangeInMonthStr(date);
  const dateMonth = getNameMonth(date);
  const curYear = date.getFullYear();

  return {
    weeklySumObj: calTimeLineObj(
      dataType,
      formattedDate,
      objAllTimeLine.weeklySumObj,
      amount
    ),
    monthlySumObj: calTimeLineObj(
      dataType,
      weekRangeInMonth,
      objAllTimeLine.monthlySumObj,
      amount
    ),
    monthsSumObj: calTimeLineObj(
      dataType,
      dateMonth,
      objAllTimeLine.monthsSumObj,
      amount
    ),
    yearsSumObj: calTimeLineObj(
      dataType,
      String(curYear),
      objAllTimeLine.yearsSumObj,
      amount,
      true
    ),
  };
};
