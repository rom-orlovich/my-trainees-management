import {
  eachDayOfInterval,
  endOfWeek,
  format,
  getDaysInMonth,
  lastDayOfMonth,
  startOfWeek,
} from "date-fns";
import { formatDate } from "../../../utilities/helpers";

import { ExpensesTableAPI, IncomesTableAPI } from "../serviceStatisticsTypes";

interface FinancesObj {
  incomes: number;
  expenses: number;
}
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

// Calculates the finance sum as perspective of this week, weekly, monthly, yearly, and total.
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

  let yearsFinanceObj = {} as Record<string, FinancesObj>;

  const thisWeekDays = createWeekDaysDisplay();
  const weeksRangeMonth = createWeeksRangeMonthFinanceObj();
  const monthsFinancesObj = createMonthFinanceObj();
  const curMonth = getNameMonth(new Date());

  // Incomes
  incomesData.forEach((income) => {
    const formattedDate = formatDate(income.date, 0);
    const weekRangeInMonth = getWeekRangeInMonthStr(income.date);
    const dateMonth = getNameMonth(income.date);
    const curYear = income.date.getFullYear();
    incomesTotalSum += income.total_price;
    // Calculate total sum.
    if (dateMonth === curMonth) curMonthTotalSum.incomes += income.total_price;

    // Calculate this week sum.
    if (thisWeekDays[formattedDate])
      thisWeekDays[formattedDate].incomes += income.total_price;

    // Calculate weekly sum.
    if (weeksRangeMonth[weekRangeInMonth])
      weeksRangeMonth[weekRangeInMonth].incomes += income.total_price;

    // Calculate monthly sum.
    if (monthsFinancesObj[dateMonth])
      monthsFinancesObj[dateMonth].incomes += income.total_price;

    // Calculate year sum
    const curYearFinance = yearsFinanceObj[curYear];
    if (curYearFinance) {
      curYearFinance.incomes += income.total_price;
    } else {
      // initial expense to 0 and set cur income.
      yearsFinanceObj = {
        ...yearsFinanceObj,
        [curYear]: {
          expenses: 0,
          incomes: income.total_price,
        },
      };
    }
  });

  // Expenses
  expenseData.forEach((expense) => {
    const formattedDate = formatDate(expense.date, 0);
    const weeksRange = getWeekRangeInMonthStr(expense.date);
    const dateMonth = getNameMonth(expense.date);
    const curYear = expense.date.getFullYear();
    expensesTotalSum += expense.total_price;
    // Calculate total sum.
    if (dateMonth === curMonth)
      curMonthTotalSum.expenses += expense.total_price;

    // Calculate this week sum.
    if (thisWeekDays[formattedDate])
      thisWeekDays[formattedDate].expenses += expense.total_price;

    // Calculate monthly sum.
    if (weeksRangeMonth[weeksRange])
      weeksRangeMonth[weeksRange].expenses += expense.total_price;

    // Calculate year sum
    if (monthsFinancesObj[dateMonth])
      monthsFinancesObj[dateMonth].expenses += expense.total_price;

    // Calculate year sum
    const curYearFinance = yearsFinanceObj[curYear];
    if (curYearFinance) {
      curYearFinance.expenses += expense.total_price;
    } else {
      // initial expense to 0 and set cur income.
      yearsFinanceObj = {
        ...yearsFinanceObj,
        [curYear]: {
          incomes: 0,
          expenses: expense.total_price,
        },
      };
    }
  });

  return {
    expensesTotalSum,
    incomesTotalSum,
    thisWeekDays,
    curMonthTotalSum,
    weeksRangeMonth,
    monthsFinancesObj,
    yearsFinanceObj,
  };
};

export const getFinanceStats = (
  incomesData: IncomesTableAPI[],
  expenseData: ExpensesTableAPI[]
) => ({ financeSum: calFinancesSum(incomesData, expenseData) });
