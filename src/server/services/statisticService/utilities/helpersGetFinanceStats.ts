/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

import { GenericRecord } from "../../../utilities/types";

import {
  DistributionFinances,
  ExpensesTableAPI,
  TimeLineDisplay,
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
  timeLineDisplay?: TimeLineDisplay,
  chartDisplay?: ChartTypes,
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

  const incomesMapData: {
    dataType: IncomesOrExpenses;
    data: SharedIncomesExpensesProps;
  }[] = incomesData.map((income) => ({
    dataType: "incomes",
    data: income,
  }));
  const expensesMapData: {
    dataType: IncomesOrExpenses;
    data: SharedIncomesExpensesProps;
  }[] = expenseData.map((expense) => ({
    dataType: "expenses",
    data: expense,
  }));

  const financeData = [...incomesMapData, ...expensesMapData].sort(
    (a, b) => a.data.date.getTime() - b.data.date.getTime()
  );

  // Loop over the incomeData and expenseData and calculate the finance stats.
  financeData.forEach((el) =>
    calFinanceOverviewByTimeLine(el.data, el.dataType)
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
  timeLineDisplay?: TimeLineDisplay,
  chartDisplay?: ChartTypes,

  dateStart?: string
) =>
  calFinancesSum(
    incomesData,
    expenseData,
    timeLineDisplay,
    chartDisplay,
    dateStart
  );
