/* eslint-disable no-unused-vars */
import { RequestHandler } from "express";
import { selectPagination } from "../../../PGSql/complexSqlQueries";

import { OmitKey } from "../../../utilities/types";
import { createLogAlertInfo } from "../../alertsService/handleAlerts";
import {
  expensesOptionsCRUD,
  incomesOptionsCRUD,
} from "../../CRUDService/routes/configRoutes";
import {
  SelectPaginationQueryParam,
  TablePropsData,
} from "../../CRUDService/CRUDServiceTypes";

const incomeTablePropsData: TablePropsData = {
  tableName: incomesOptionsCRUD.selectQuery.tableName,
  querySelectLogic: incomesOptionsCRUD.selectQuery.querySelectLogic,
  fieldNamesQuery: incomesOptionsCRUD.selectQuery.fieldNamesQuery,
  tableID: incomesOptionsCRUD.selectQuery.tableID,
};
const incomeSelectPaginationQueryParam: OmitKey<
  SelectPaginationQueryParam,
  "requestQuery"
> = {
  comparisonQuery: incomesOptionsCRUD.selectQuery.comparisonQuery,
  orderByParam: incomesOptionsCRUD.selectQuery.orderByParam,
  queryParams: incomesOptionsCRUD.selectQuery.queryParams,
};
const expenseTablePropsData: TablePropsData = {
  tableName: expensesOptionsCRUD.selectQuery.tableName,
  querySelectLogic: expensesOptionsCRUD.selectQuery.querySelectLogic,
  fieldNamesQuery: expensesOptionsCRUD.selectQuery.fieldNamesQuery,
  tableID: expensesOptionsCRUD.selectQuery.tableID,
};
const expenseSelectPaginationQueryParam: OmitKey<
  SelectPaginationQueryParam,
  "requestQuery"
> = {
  comparisonQuery: expensesOptionsCRUD.selectQuery.comparisonQuery,
  orderByParam: expensesOptionsCRUD.selectQuery.orderByParam,
  queryParams: expensesOptionsCRUD.selectQuery.queryParams,
};

export const handleGetFinanceStats: RequestHandler = async (req, res, next) => {
  try {
    const selectIncomes = await selectPagination(incomeTablePropsData, {
      requestQuery: req.query,
      ...incomeSelectPaginationQueryParam,
    });

    const selectExpenses = await selectPagination(expenseTablePropsData, {
      requestQuery: req.query,
      ...expenseSelectPaginationQueryParam,
    });

    req.statsData = {
      statsResult: [
        {
          data: selectIncomes.rows,
          next: selectIncomes.next,
          countRows: selectIncomes.countRows,
        },
        {
          data: selectExpenses.rows,
          next: selectExpenses.next,
          countRows: selectExpenses.countRows,
        },
      ],
    };
  } catch (error) {
    req.logAlertInfo = createLogAlertInfo("finances")(
      undefined,
      error as Error,
      "get",
      false
    );
  }

  return next();
};
