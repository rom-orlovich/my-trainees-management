import { format } from "date-fns";
import { IncomeAPI } from "../../serviceCRUD/controllers/handleInsertNewSubscription";
import { ExpensesTableAPI, IncomesTableAPI } from "../serviceStatisticsTypes";

const getNameMonth = (date: Date) => format(date, "MMMMMM");
const calFinancesSum = (
  incomesData: IncomesTableAPI[],
  expenseData: ExpensesTableAPI[]
) => {
  let expensesTotalSum = 0;
  let incomesTotalSum = 0;
  const curMonthTotalSum = {
    expenses: 0,
    incomes: 0,
  };
  const curMonth = getNameMonth(new Date());

  incomesData.forEach((income) => {
    incomesTotalSum += income.total_price;
    if (getNameMonth(income.date) === curMonth) {
      curMonthTotalSum.incomes += income.total_price;
    }
  });
  expenseData.forEach((expense) => {
    expensesTotalSum += expense.total_price;
    if (getNameMonth(expense.date) === curMonth) {
      curMonthTotalSum.expenses += expense.total_price;
    }
  });

  return {
    expensesTotalSum,
    incomesTotalSum,
    curMonthTotalSum,
  };
};

export const getFinanceStats = (
  incomesData: IncomesTableAPI[],
  expenseData: ExpensesTableAPI[]
) => ({ financeSum: calFinancesSum(incomesData, expenseData) });
