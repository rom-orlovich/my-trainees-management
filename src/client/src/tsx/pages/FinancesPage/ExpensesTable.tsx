/* eslint-disable camelcase */
import React from "react";

import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { QueriesOptionsPropsWithNameData } from "./FinancesPage";
import {
  ExpensesTableAPI,
  IncomesTableAPI,
} from "../../redux/api/interfaceAPI";
import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { deleteFunMutation } from "../../utilities/helpersFun";
import { expenseApi, incomesApi } from "../../redux/api/hooksAPI";

function transformExpenseFunction({
  expense_id,
  date,
  product_name,
  seller_name,
  amount,
  total_price,
}: ExpensesTableAPI) {
  return {
    expense_id,
    date,
    seller: seller_name,
    product: product_name,
    amount,
    total: `${total_price} NIS`,
  };
}

function ExpensesTable({ queriesOptions }: QueriesOptionsPropsWithNameData) {
  const [deleteItem] = expenseApi.useDeleteItemMutation();
  return (
    <TablePagination<ExpensesTableAPI>
      editPagePath={`${APP_ROUTE.FINANCES_ROUTE}/${APP_ROUTE.EXPENSES_ROUTE}`}
      queriesOptions={queriesOptions}
      nameData="Expenses"
      transformFun={transformExpenseFunction}
      getAllQuery={expenseApi.useGetItemsQuery}
      deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
    />
  );
}

export default ExpensesTable;
