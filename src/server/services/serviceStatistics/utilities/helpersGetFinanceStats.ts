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
  getResultGraphStats,
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
const calPopularIncomesExpenses = (
  popularIncomesExpenses: DistributionFinances,
  incomesOrExpenses: IncomesOrExpenses,
  financeObj: SharedIncomesExpensesProps
) => {
  if (popularIncomesExpenses) {
    if (
      popularIncomesExpenses[incomesOrExpenses][`${financeObj.product_name}`]
    ) {
      popularIncomesExpenses[incomesOrExpenses][
        financeObj.product_name
      ].amount += financeObj.amount;
      popularIncomesExpenses[incomesOrExpenses][
        financeObj.product_name
      ].total_price += financeObj.total_price;
    } else {
      popularIncomesExpenses[incomesOrExpenses] = {
        ...popularIncomesExpenses[incomesOrExpenses],
        [financeObj.product_name]: {
          amount: financeObj.amount,
          total_price: financeObj.total_price,
        },
      };
    }
  }
  return popularIncomesExpenses;
};
const calMostSpendingCustomers = (
  mostSpendingCustomers: DistributionFinances,
  financeObj: SharedIncomesExpensesProps
) => {
  const nameCustomer = `${financeObj.first_name}-${financeObj.last_name}`;
  if (mostSpendingCustomers) {
    if (mostSpendingCustomers.incomes[nameCustomer]) {
      mostSpendingCustomers.incomes[nameCustomer].amount += financeObj.amount;
      mostSpendingCustomers.incomes[nameCustomer].total_price +=
        financeObj.total_price;
    } else {
      mostSpendingCustomers.incomes = {
        ...mostSpendingCustomers.incomes,
        [nameCustomer]: {
          amount: financeObj.amount,
          total_price: financeObj.total_price,
        },
      };
    }
  }
  return mostSpendingCustomers;
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
  let popularIncomesExpenses: DistributionFinances = {
    incomes: {},
    expenses: {},
  };

  let mostSpendingCustomers: DistributionFinances = {
    incomes: {},
    expenses: {},
  };
  // Calculate for each expense or incomes the change in finance stats.
  const calFinanceOverviewByTimeLine = <T extends SharedIncomesExpensesProps>(
    financeObj: T,
    incomesOrExpenses: IncomesOrExpenses
  ) => {
    const curDate = financeObj.date;
    totalFinancesSum[incomesOrExpenses] += financeObj.total_price;

    // Calculate distributionFinances of incomes and expenses if distributionFinances is defined.
    if (checkIsDistributionChart) {
      popularIncomesExpenses = calPopularIncomesExpenses(
        popularIncomesExpenses,
        incomesOrExpenses,
        financeObj
      );
      if (incomesOrExpenses === "incomes")
        mostSpendingCustomers = calMostSpendingCustomers(
          mostSpendingCustomers,
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
  let results: GenericRecord<any> = {};

  if (checkIsDistributionChart) {
    results = {
      resultPopularIncomesExpenses: {
        incomes: normalizeDatesValuesDistributionFinance(
          popularIncomesExpenses.incomes
        ),
        expenses: normalizeDatesValuesDistributionFinance(
          popularIncomesExpenses.expenses
        ),
      },
      mostSpendingCustomers: {
        incomes: normalizeDatesValuesDistributionFinance(
          mostSpendingCustomers.incomes
        ),
      },
    };
  }

  return {
    totalFinancesSum,
    graphStats: getResultGraphStats(
      objAllTimeLine,
      normalizeDatesValuesFinance
    ),
    ...results,
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