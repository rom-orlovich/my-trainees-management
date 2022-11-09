/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  getDaysInMonth,
  lastDayOfMonth,
  startOfWeek,
} from "date-fns";
import { formatDate } from "../../../utilities/helpers";

import {
  DistributionFinances,
  ExpensesTableAPI,
  FinanceDisplayStats,
  FinancesChartStatsDisplay,
  FinancesDistributionStatsDisplay,
  FinancesObj,
  IncomesOrExpenses,
  IncomesTableAPI,
  ProductData,
  SharedIncomesExpensesProps,
} from "../serviceStatisticsTypes";
import { createLabelDatasetFromObj } from "./helpersGetStats";

const getNameMonth = (date: Date) => format(date, "MMMMMM");

// Creates for each day in the week a financeObj.
const createWeekDaysDisplay = () => {
  const curDate = new Date();
  // Get the start and the end date of the week.
  const startWeek = startOfWeek(curDate);
  const endWeek = endOfWeek(curDate);
  let thisWeekDaysObj = {} as Record<string, FinancesObj>;
  // Create array of dates.
  eachDayOfInterval({
    start: startWeek,
    end: endWeek,
  }).forEach((date) => {
    thisWeekDaysObj = {
      ...thisWeekDaysObj,
      [formatDate(date, 0)]: { incomes: 0, expenses: 0 },
    };
  });
  return thisWeekDaysObj;
};

// Gets date and return his week range in month.
const getWeekRangeInMonthStr = (date: Date) => {
  const curDate = new Date(date);
  const curDay = curDate.getDate();
  const remainder = curDay % 7;
  const reminderDiff = 7 - remainder;

  const start = formatDate(new Date(date.setDate(curDay - remainder)));
  const end = formatDate(new Date(curDate.setDate(curDay + reminderDiff - 1)));

  const str = `${start}-${end}`;
  return str;
};

// Creates weeksRangeMonthFinanceObj.
const createWeeksRangeMonthFinanceObj = () => {
  const curDate = new Date();
  const firstDate = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
  const lastDate = lastDayOfMonth(curDate);

  let weeksRangeMonthFinanceObj = {} as Record<string, FinancesObj>;

  // Creates weeksRangeInMonthFinanceObj by looping over the datesArr parameter the function get.
  const loopToCreateWeeksRangeMonthFinanceObj = (
    datesArr: Date[],
    subtractLastDay = -1 // In the last days of month subtractLastDay is zero, to get all the days.
  ) => {
    for (let i = 0; i < datesArr.length - 1; i++) {
      const startWeek = formatDate(datesArr[i], 0);
      const endWeek = formatDate(datesArr[i + 1], subtractLastDay);
      weeksRangeMonthFinanceObj = {
        ...weeksRangeMonthFinanceObj,
        [`${startWeek}-${endWeek}`]: { incomes: 0, expenses: 0 },
      };
    }
  };

  // Create dates array of the first day in each week that exist in month, start from the 1th.
  const datesEachSevenDay = eachDayOfInterval(
    { start: firstDate, end: lastDate },
    { step: 7 }
  );
  loopToCreateWeeksRangeMonthFinanceObj(datesEachSevenDay);

  // Create dates array from the last days of the month if they exist.
  if (getDaysInMonth(curDate) > 28) {
    const endMonthDates = eachDayOfInterval({
      start: datesEachSevenDay.at(-1)!,
      end: lastDate,
    });
    loopToCreateWeeksRangeMonthFinanceObj(endMonthDates, 0);
  }

  return weeksRangeMonthFinanceObj;
};

// Creates for each month a financeObj.
const createMonthFinanceObj = () => {
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
  let monthsFinancesObj = {} as Record<string, FinancesObj>;
  months.forEach((month) => {
    monthsFinancesObj = {
      ...monthsFinancesObj,
      [month]: { incomes: 0, expenses: 0 },
    };
  });
  return monthsFinancesObj;
};

// calculate year finance stats
const calculateYearFinance = (
  yearsFinanceObj: Record<string, FinancesObj>,
  incomesOrExpenses: IncomesOrExpenses,
  curYear: number,
  totalPrice: number
) => {
  if (yearsFinanceObj[curYear]) {
    yearsFinanceObj[curYear][incomesOrExpenses] += totalPrice;
  } else {
    // Initial expenses/incomes to 0 if they are not exist and set cur expenses/incomes.
    const initialFinanceYear = {
      incomes: {
        expenses: 0,
        incomes: totalPrice,
      },
      expenses: {
        expenses: totalPrice,
        incomes: 0,
      },
    };

    yearsFinanceObj = {
      ...yearsFinanceObj,
      [curYear]: initialFinanceYear[incomesOrExpenses],
    };
  }
  return yearsFinanceObj;
};

// Creates labels and datasets for chart display in the client.
const normalizeDatesValuesFinance = (
  financeObj: Record<string, FinancesObj>
) => {
  const { datasetsValues, labelFormatted } =
    createLabelDatasetFromObj(financeObj);

  const incomes = datasetsValues.map(
    (financeObjValue) => financeObjValue.incomes
  );
  const expenses = datasetsValues.map(
    (financeObjValue) => financeObjValue.expenses
  );

  return {
    labelFormatted,
    datasetsValues: {
      expenses,
      incomes,
    },
  };
};

// Calculates the distribution Finances of expenses and incomes
const calDistributionFinances = (
  distributionFinances: DistributionFinances,
  incomesOrExpenses: IncomesOrExpenses,
  financeObj: SharedIncomesExpensesProps
) => {
  if (distributionFinances) {
    if (distributionFinances[incomesOrExpenses][`${financeObj.product_name}`]) {
      distributionFinances[incomesOrExpenses][financeObj.product_name].amount +=
        financeObj.amount;
      distributionFinances[incomesOrExpenses][
        financeObj.product_name
      ].total_price += financeObj.total_price;
    } else {
      distributionFinances[incomesOrExpenses] = {
        ...distributionFinances[incomesOrExpenses],
        [financeObj.product_name]: {
          amount: financeObj.amount,
          total_price: financeObj.total_price,
        },
      };
    }
  }
  return distributionFinances;
};
// Creates labels and datasets for chart distribution finances in the client.
const normalizeDatesValuesDistributionFinance = (
  distributionFinances: Record<string, ProductData>
) => {
  const { datasetsValues, labelFormatted } =
    createLabelDatasetFromObj(distributionFinances);

  const totalPrice = datasetsValues.map(
    (distributionFinancesValue) => distributionFinancesValue.total_price
  );
  const amounts = datasetsValues.map(
    (distributionFinancesValue) => distributionFinancesValue.amount
  );

  return {
    labelFormatted,
    datasetsValues: { totalPrice, amounts },
  };
};

// Calculates the finance sum as perspective of this week, weekly, monthly, yearly and total.
const calFinancesSum = (
  incomesData: IncomesTableAPI[],
  expenseData: ExpensesTableAPI[],
  displayStats?: string
) => {
  // Check the current display according to the displayStats.
  const checkCurStatsDisplay = (checkDisplayStats: FinanceDisplayStats) =>
    checkDisplayStats === displayStats || displayStats === "all";

  const totalFinancesSum: FinancesObj = {
    expenses: 0,
    incomes: 0,
  };

  // If display is not requested so the the timeline finance object is undefined.
  const thisWeekDays = checkCurStatsDisplay("thisWeek")
    ? createWeekDaysDisplay()
    : undefined;
  const weeksRangeMonth = checkCurStatsDisplay("weeksMonthRange")
    ? createWeeksRangeMonthFinanceObj()
    : undefined;
  const monthsFinancesObj = checkCurStatsDisplay("monthly")
    ? createMonthFinanceObj()
    : undefined;
  let yearsFinanceObj = checkCurStatsDisplay("yearly")
    ? ({} as Record<string, FinancesObj>)
    : undefined;

  // If display is distribution finances.
  let distributionFinances: DistributionFinances | undefined =
    checkCurStatsDisplay("distributionFinances")
      ? { incomes: {}, expenses: {} }
      : undefined;

  let resultChartStatsDisplayFinances: Record<
    string,
    FinancesChartStatsDisplay
  > = {};
  let resultDistributionFinances:
    | Record<IncomesOrExpenses, FinancesDistributionStatsDisplay>
    | object = {};

  // Calculate for each expense or incomes the change in finance stats.
  const calFinanceOverviewByTimeLine = <T extends SharedIncomesExpensesProps>(
    financeObj: T,
    incomesOrExpenses: IncomesOrExpenses
  ) => {
    const formattedDate = formatDate(financeObj.date, 0);
    const weekRangeInMonth = getWeekRangeInMonthStr(financeObj.date);
    const dateMonth = getNameMonth(financeObj.date);
    const curYear = financeObj.date.getFullYear();
    totalFinancesSum[incomesOrExpenses] += financeObj.total_price;

    // Calculate distributionFinances of incomes and expenses if distributionFinances is defined.
    if (distributionFinances) {
      distributionFinances = calDistributionFinances(
        distributionFinances,
        incomesOrExpenses,
        financeObj
      );
    }
    // Calculate this week sum if display this week is defined.
    if (thisWeekDays && thisWeekDays[formattedDate]) {
      thisWeekDays[formattedDate][incomesOrExpenses] += financeObj.total_price;
    }

    // Calculate weekly sum if display this weekly is defined.
    if (weeksRangeMonth && weeksRangeMonth[weekRangeInMonth])
      weeksRangeMonth[weekRangeInMonth][incomesOrExpenses] +=
        financeObj.total_price;

    // Calculate monthly sum if display monthly is defined.
    if (monthsFinancesObj && monthsFinancesObj[dateMonth])
      monthsFinancesObj[dateMonth][incomesOrExpenses] += financeObj.total_price;

    // Calculate yearly sum if display yearly is defined.
    if (yearsFinanceObj) {
      yearsFinanceObj = calculateYearFinance(
        yearsFinanceObj,
        incomesOrExpenses,
        curYear,
        financeObj.total_price
      );
    }
  };

  // Loop over the incomeData and expenseData and calculate the finance stats.
  incomesData.forEach((income) =>
    calFinanceOverviewByTimeLine(income, "incomes")
  );
  expenseData.forEach((expense) =>
    calFinanceOverviewByTimeLine(expense, "expenses")
  );

  // Assign the requested display to resultChartStatsDisplayFinances and resultDistributionFinances.
  if (thisWeekDays)
    resultChartStatsDisplayFinances = {
      ...resultChartStatsDisplayFinances,
      thisWeekDays: normalizeDatesValuesFinance(thisWeekDays),
    };
  if (weeksRangeMonth)
    resultChartStatsDisplayFinances = {
      ...resultChartStatsDisplayFinances,
      weeksRangeMonth: normalizeDatesValuesFinance(weeksRangeMonth),
    };
  if (monthsFinancesObj)
    resultChartStatsDisplayFinances = {
      ...resultChartStatsDisplayFinances,
      monthsFinancesObj: normalizeDatesValuesFinance(monthsFinancesObj),
    };
  if (yearsFinanceObj)
    resultChartStatsDisplayFinances = {
      ...resultChartStatsDisplayFinances,
      yearsFinanceObj: normalizeDatesValuesFinance(yearsFinanceObj),
    };

  if (distributionFinances) {
    resultDistributionFinances = {
      ...resultDistributionFinances,

      incomes: normalizeDatesValuesDistributionFinance(
        distributionFinances.incomes
      ),
      expenses: normalizeDatesValuesDistributionFinance(
        distributionFinances.expenses
      ),
    };
  }

  return {
    totalFinancesSum,
    ...resultChartStatsDisplayFinances,
    ...resultDistributionFinances,
  };
};

export const getFinanceStats = (
  incomesData: IncomesTableAPI[],
  expenseData: ExpensesTableAPI[],
  displayStats?: string
) => ({ financeSum: calFinancesSum(incomesData, expenseData, displayStats) });
