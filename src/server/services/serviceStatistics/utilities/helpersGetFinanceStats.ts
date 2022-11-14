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
  CHART_DISPLAY,
} from "../serviceStatisticsTypes";

import {
  calAllTimeLineObj,
  createLabelDatasetFromObj,
  createTimeLineObj,
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
  const checkIsDistributionChart = CHART_DISPLAY.DISTRIBUTION === chartDisplay;

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
    checkIsDistributionChart ? { incomes: {}, expenses: {} } : undefined;

  let resultDistributionFinances:
    | Record<IncomesOrExpenses, FinancesDistributionStatsDisplay>
    | object = {};

  // Calculate for each expense or incomes the change in finance stats.
  const calFinanceOverviewByTimeLine = <T extends SharedIncomesExpensesProps>(
    financeObj: T,
    incomesOrExpenses: IncomesOrExpenses
  ) => {
    const curDate = financeObj.date;
    totalFinancesSum[incomesOrExpenses] += financeObj.total_price;

    // Calculate distributionFinances of incomes and expenses if distributionFinances is defined.
    if (distributionFinances) {
      distributionFinances = calDistributionFinances(
        distributionFinances,
        incomesOrExpenses,
        financeObj
      );
    }
    objAllTimeLine = calAllTimeLineObj(
      curDate,
      incomesOrExpenses,
      objAllTimeLine,
      financeObj.total_price
    );
  };

  // Loop over the incomeData and expenseData and calculate the finance stats.
  incomesData.forEach((income) =>
    calFinanceOverviewByTimeLine(income, "incomes")
  );

  expenseData.forEach((expense) =>
    calFinanceOverviewByTimeLine(expense, "expenses")
  );
  let results: GenericRecord<FinancesChartStatsDisplay> = {};
  // Assign the requested display to resultChartStatsDisplayFinances and
  if (objAllTimeLine.weeklySumObj)
    results = {
      graphStats: normalizeDatesValuesFinance(objAllTimeLine.weeklySumObj),
    };
  if (objAllTimeLine.monthlySumObj)
    results = {
      graphStats: normalizeDatesValuesFinance(objAllTimeLine.monthlySumObj),
    };
  if (objAllTimeLine.monthsSumObj)
    results = {
      graphStats: normalizeDatesValuesFinance(objAllTimeLine.monthsSumObj),
    };
  if (objAllTimeLine.yearsSumObj)
    results = {
      graphStats: normalizeDatesValuesFinance(objAllTimeLine.yearsSumObj),
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
