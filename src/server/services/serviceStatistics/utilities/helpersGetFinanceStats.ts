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
  calAllTimeLineObj,
  createTimeLineObj,
} from "./helpersGetMeasuresStats";
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

// Calculates the finance sum as perspective of this week, weekly, months, yearly and total.
const calFinancesSum = (
  incomesData: IncomesTableAPI[],
  expenseData: ExpensesTableAPI[],
  chartDisplay?: ChartTypes,
  timeLineDisplay?: TimeLineDisplay,
  dateStart?: string
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

  let objAllTimeLine = createTimeLineObj(
    totalFinancesSum,
    timeLineDisplay,
    chartDisplay,
    dateStart
  );
  // If display is distribution finances.
  let distributionFinances: DistributionFinances | undefined =
    checkCurChartDisplay(CHART_DISPLAY.DISTRIBUTION)
      ? { incomes: {}, expenses: {} }
      : undefined;

  let results: GenericRecord<FinancesChartStatsDisplay> = {};
  let resultDistributionFinances:
    | Record<IncomesOrExpenses, FinancesDistributionStatsDisplay>
    | object = {};

  // Calculate for each expense or incomes the change in finance stats.
  const calFinanceOverviewByTimeLine = <T extends SharedIncomesExpensesProps>(
    financeObj: T,
    incomesOrExpenses: IncomesOrExpenses
  ) => {
    const curDate = financeObj.date;
    const formattedDate = formatDate(curDate, 0);
    const weekRangeInMonth = getWeekRangeInMonthStr(curDate);
    const dateMonth = getNameMonth(curDate);
    const curYear = curDate.getFullYear();
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
    // if (weeklyDays && weeklyDays[formattedDate]) {
    //   weeklyDays[formattedDate][incomesOrExpenses] += financeObj.total_price;
    // }

    // Calculate weekly sum if display this weekly is defined.
    // if (weeksRangeMonth && weeksRangeMonth[weekRangeInMonth]) {
    //   weeksRangeMonth[weekRangeInMonth][incomesOrExpenses] +=
    //     financeObj.total_price;
    // }
    // Calculate months sum if display months is defined.

    // if (monthsFinancesObj && monthsFinancesObj[dateMonth])
    //   monthsFinancesObj[dateMonth][incomesOrExpenses] += financeObj.total_price;

    // Calculate yearly sum if display yearly is defined.
    // yearsSumObj = calTimeLineObj(
    //   incomesOrExpenses,
    //   String(curYear),
    //   yearsSumObj,
    //   financeObj.total_price,
    //   true
    // );
    objAllTimeLine = calAllTimeLineObj(
      curDate,
      incomesOrExpenses,
      objAllTimeLine
    );
  };

  // Loop over the incomeData and expenseData and calculate the finance stats.
  incomesData.forEach((income) =>
    calFinanceOverviewByTimeLine(income, "incomes")
  );

  expenseData.forEach((expense) =>
    calFinanceOverviewByTimeLine(expense, "expenses")
  );

  // Assign the requested display to resultChartStatsDisplayFinances and
  if (objAllTimeLine.weeklySumObj)
    results = {
      graphStats: normalizeDatesValuesFinance(objAllTimeLine.weeklySumObj),
    };
  if (objAllTimeLine.weeklySumObj)
    results = {
      graphStats: normalizeDatesValuesFinance(objAllTimeLine.weeklySumObj),
    };
  if (objAllTimeLine.weeklySumObj)
    results = {
      graphStats: normalizeDatesValuesFinance(objAllTimeLine.weeklySumObj),
    };
  if (objAllTimeLine.weeklySumObj)
    results = {
      graphStats: normalizeDatesValuesFinance(objAllTimeLine.weeklySumObj),
    };

  if (distributionFinances) {
    resultDistributionFinances = {
      ...distributionFinances,

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
    ...results,
    resultDistributionFinances,
  };
};

export const getFinanceStats = (
  incomesData: IncomesTableAPI[],
  expenseData: ExpensesTableAPI[],
  chartDisplay?: ChartTypes,
  timeLineDisplay?: TimeLineDisplay,
  dateStart?: string
) =>
  calFinancesSum(
    incomesData,
    expenseData,
    chartDisplay,
    timeLineDisplay,
    dateStart
  );
