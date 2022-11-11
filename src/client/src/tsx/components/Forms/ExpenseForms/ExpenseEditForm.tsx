/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from "react";
import { useParams } from "react-router-dom";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

import { expenseApi, financesApi } from "../../../redux/api/hooksAPI";
import { ExpensesTableAPI } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";

import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";

import { ExpenseForms } from "./ExpenseForms";

function ExpenseEditForm() {
  const dispatch = useAppDispatch();
  const [updateItem] = expenseApi.useUpdateItemMutation();

  const { user_id } = useGetUserLoginData();

  const id = Number(useParams().id);

  const { data, isFetching, isError, isLoading } =
    expenseApi.useGetItemByIDQuery({
      id,
      userID: user_id,
    });

  return (
    <LoadingSpinner
      path={``}
      nameData="Incomes"
      stateData={{ data, isFetching, isError, isLoading }}
    >
      {(data) => {
        const handleSubmit = ({ product_name, ...body }: ExpensesTableAPI) =>
          updateFunction({
            updateItem,
            id: Number(data.expense_id),
          })(body).then(() => {
            dispatch(financesApi.util.invalidateTags(["finances_list"]));
          });

        return (
          <ExpenseForms
            editMode={true}
            onSubmit={handleSubmit}
            defaultValues={data}
          />
        );
      }}
    </LoadingSpinner>
  );
}

export default ExpenseEditForm;
