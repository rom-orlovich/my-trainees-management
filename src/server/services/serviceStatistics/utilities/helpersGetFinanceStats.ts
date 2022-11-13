/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

import { formatDate } from "../../../utilities/helpers";
import { GenericRecord } from "../../../utilities/types";

import {
  DistributionFinances,
  ExpensesTableAPI,
  TimeLineDisplay,
  FinancesChartStatsDisplay,
  FinancesDistributionStatsDisplay,
  FinancesObj,
  IncomesOrExpenses,
  IncomesTableAPI,
  ProductData,
  SharedIncomesExpensesProps,
  ChartTypes,
  GRAPH_TIME_LINE,
  CHART_DISPLAY,
} from "../serviceStatisticsTypes";
import {
  calTimeLineObj,
  createLabelDatasetFromObj,
  createMonthObj,
  createThisWeekDaysDisplayObj,
  createWeeksRangeMonthObj,
  getNameMonth,
  getWeekRangeInMonthStr,
} from "./helpersGetStats";

// Creates labels and datasets for chart display in the client.
const normalizeDatesValuesFinance = (
  financeObj: GenericRecord<FinancesObj>
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
  distributionFinances: GenericRecord<ProductData>
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
  chartDisplay?: ChartTypes,
  timeLineDisplay?: TimeLineDisplay
) => {
  // Check the current display according to the timeLineDisplay and chartDisplay.
  const checkCurChartDisplay = (checkDisplayStats: ChartTypes) =>
    checkDisplayStats === chartDisplay;
  const checkCurTimeLineDisplay = (checkTimeLineDisplay: TimeLineDisplay) =>
    checkTimeLineDisplay === timeLineDisplay;

  const totalFinancesSum: FinancesObj = {
    expenses: 0,
    incomes: 0,
  };

  // If display is not requested so the the timeline finance object is undefined.
  const thisWeekDays =
    checkCurChartDisplay(CHART_DISPLAY.GRAPH) &&
    checkCurTimeLineDisplay(GRAPH_TIME_LINE.THIS_WEEK)
      ? createThisWeekDaysDisplayObj<FinancesObj>(totalFinancesSum)
      : undefined;
  const weeksRangeMonth =
    checkCurChartDisplay(CHART_DISPLAY.GRAPH) &&
    checkCurTimeLineDisplay(GRAPH_TIME_LINE.THIS_MONTH)
      ? createWeeksRangeMonthObj<FinancesObj>(totalFinancesSum)
      : undefined;
  const monthsFinancesObj =
    checkCurChartDisplay(CHART_DISPLAY.GRAPH) &&
    checkCurTimeLineDisplay(GRAPH_TIME_LINE.MONTHLY)
      ? createMonthObj<FinancesObj>(totalFinancesSum)
      : undefined;
  let yearsFinanceObj =
    checkCurChartDisplay(CHART_DISPLAY.GRAPH) &&
    checkCurTimeLineDisplay(GRAPH_TIME_LINE.YEARLY)
      ? ({} as GenericRecord<FinancesObj>)
      : undefined;

  // If display is distribution finances.
  let distributionFinances: DistributionFinances | undefined =
    checkCurChartDisplay(CHART_DISPLAY.DISTRIBUTION)
      ? { incomes: {}, expenses: {} }
      : undefined;

  let resultChartStatsDisplayFinances: GenericRecord<FinancesChartStatsDisplay> =
    {};
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
    if (weeksRangeMonth && weeksRangeMonth[weekRangeInMonth]) {
      weeksRangeMonth[weekRangeInMonth][incomesOrExpenses] +=
        financeObj.total_price;
    }
    // Calculate monthly sum if display monthly is defined.
    if (monthsFinancesObj && monthsFinancesObj[dateMonth])
      monthsFinancesObj[dateMonth][incomesOrExpenses] += financeObj.total_price;

    // Calculate yearly sum if display yearly is defined.
    yearsFinanceObj = calTimeLineObj(
      incomesOrExpenses,
      String(curYear),
      yearsFinanceObj,
      financeObj.total_price,
      true
    );
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
    resultDistributionFinances,
  };
};

export const getFinanceStats = (
  incomesData: IncomesTableAPI[],
  expenseData: ExpensesTableAPI[],
  chartDisplay?: ChartTypes,
  timeLineDisplay?: TimeLineDisplay
) => calFinancesSum(incomesData, expenseData, chartDisplay, timeLineDisplay);
