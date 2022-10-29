/* eslint-disable camelcase */
import React from "react";
import {
  MutationTrigger,
  UseMutation,
  UseQuery,
} from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { APP_ROUTE } from "../../routes/appRoutesConstants";
import { QueriesOptionsPropsWithNameData } from "./FinancesPage";
import { IncomesTableAPI } from "../../redux/api/interfaceAPI";
import { TablePagination } from "../../components/baseComponents/Tables/TablePagination";

import { deleteFunMutation } from "../../utilities/helpersFun";
import { incomesApi } from "../../redux/api/hooksAPI";

function transformIncomeFunction({
  income_id,
  date,
  product_name,
  first_name,
  last_name,
  amount,
  total_price,
}: IncomesTableAPI) {
  return {
    income_id,
    date,
    buyer: `${first_name} ${last_name}`,
    product: product_name,
    amount,
    total: `${total_price} NIS`,
  };
}

function IncomesTable({
  queriesOptions,
  nameData,
}: QueriesOptionsPropsWithNameData) {
  const [deleteItem] = incomesApi.useDeleteItemMutation();
  return (
    <TablePagination<IncomesTableAPI>
      editPagePath={`${APP_ROUTE.FINANCES_ROUTE}/${APP_ROUTE.INCOMES_ROUTE}`}
      queriesOptions={queriesOptions}
      nameData="Income"
      transformFun={transformIncomeFunction}
      getAllQuery={incomesApi.useGetItemsQuery}
      deleteItemFun={(id) => deleteFunMutation(id, deleteItem)}
    />
  );
}

export default IncomesTable;
