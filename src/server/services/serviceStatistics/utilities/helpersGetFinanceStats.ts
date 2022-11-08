import {
  eachDayOfInterval,
  endOfWeek,
  format,
  lastDayOfMonth,
  startOfWeek,
} from "date-fns";
import { formatDate } from "../../../utilities/helpers";

import { ExpensesTableAPI, IncomesTableAPI } from "../serviceStatisticsTypes";

const checkIfDateIsInWeeksRange = (date: Date) => {
  const curDate = new Date(date);
  const curDay = curDate.getDate();
  const remainder = curDay % 7;
  const reminder1 = 7 - remainder;

  const start = formatDate(new Date(date.setDate(curDay - remainder)));
  const end = formatDate(new Date(curDate.setDate(curDay + reminder1 - 1)));

  const str = `${start}-${end}`;
  return str;
};
const date1 = new Date();

const createWeeksMonthFinanceObj = () => {
  const curDate = new Date();
  const firstDate = new Date(curDate.getFullYear(), curDate.getMonth(), 1);

  const lastDate = lastDayOfMonth(curDate);
  let weeksMonthObj = {} as Record<string, FinancesObj>;
  const weeks = eachDayOfInterval(
    { start: firstDate, end: lastDate },
    { step: 7 }
  );

  for (let i = 0; i < weeks.length - 1; i++) {
    const startWeek = formatDate(weeks[i], 0);
    const endWeek = formatDate(weeks[i + 1], -1);
    weeksMonthObj = {
      ...weeksMonthObj,
      [`${startWeek}-${endWeek}`]: { incomes: 0, expenses: 0 },
    };
  }

  const endMonth = eachDayOfInterval({ start: weeks.at(-1)!, end: lastDate });
  for (let i = 0; i < endMonth.length - 1; i++) {
    const startWeek = formatDate(endMonth[i], 0);
    const endWeek = formatDate(endMonth[i + 1], 0);
    weeksMonthObj = {
      ...weeksMonthObj,
      [`${startWeek}-${endWeek}`]: { incomes: 0, expenses: 0 },
    };
  }
  return weeksMonthObj;
};

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
interface FinancesObj {
  incomes: number;
  expenses: number;
}
const getNameMonth = (date: Date) => format(date, "MMMMMM");
const createMonthFinanceObj = () => {
  let monthsFinancesObj = {} as Record<string, FinancesObj>;
  months.forEach((month) => {
    monthsFinancesObj = {
      ...monthsFinancesObj,
      [month]: { incomes: 0, expenses: 0 },
    };
  });
  return monthsFinancesObj;
};
const createWeekDaysDisplay = () => {
  const curDate = new Date();
  const startWeek = startOfWeek(curDate);
  const endWeek = endOfWeek(curDate);
  let weekDaysObj = {} as Record<string, FinancesObj>;
  eachDayOfInterval({
    start: startWeek,
    end: endWeek,
  }).forEach((date) => {
    weekDaysObj = {
      ...weekDaysObj,
      [date.toISOString()]: { incomes: 0, expenses: 0 },
    };
  });
  return weekDaysObj;
};

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

  const weeksRangeMonth = createWeeksMonthFinanceObj();
  const weekDays = createWeekDaysDisplay();
  const monthsFinancesObj = createMonthFinanceObj();
  const curMonth = getNameMonth(new Date());

  incomesData.forEach((income) => {
    incomesTotalSum += income.total_price;
    const dateMonth = getNameMonth(income.date);
    const ISODate = income.date.toISOString();
    const weeksRange = checkIfDateIsInWeeksRange(income.date);
    if (dateMonth === curMonth) {
      curMonthTotalSum.incomes += income.total_price;
    }
    if (monthsFinancesObj[dateMonth]) {
      monthsFinancesObj[dateMonth].incomes += income.total_price;
    }
    if (weekDays[ISODate]) weekDays[ISODate].incomes += income.total_price;

    if (weeksRangeMonth[weeksRange]) {
      weeksRangeMonth[weeksRange].incomes += income.total_price;
    }
  });
  expenseData.forEach((expense) => {
    const dateMonth = getNameMonth(expense.date);
    const ISODate = expense.date.toISOString();
    const weeksRange = checkIfDateIsInWeeksRange(expense.date);
    expensesTotalSum += expense.total_price;
    if (dateMonth === curMonth) {
      curMonthTotalSum.expenses += expense.total_price;
    }
    if (monthsFinancesObj[dateMonth]) {
      monthsFinancesObj[dateMonth].expenses += expense.total_price;
    }
    if (weekDays[ISODate]) weekDays[ISODate].expenses += expense.total_price;
    if (weeksRangeMonth[weeksRange]) {
      weeksRangeMonth[weeksRange].expenses += expense.total_price;
    }
  });

  return {
    expensesTotalSum,
    incomesTotalSum,
    curMonthTotalSum,
    monthsFinancesObj,
    weekDays,
    weeksRangeMonth,
  };
};

export const getFinanceStats = (
  incomesData: IncomesTableAPI[],
  expenseData: ExpensesTableAPI[]
) => ({ financeSum: calFinancesSum(incomesData, expenseData) });
