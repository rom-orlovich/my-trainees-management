/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from "react";
import { useParams } from "react-router-dom";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";

import { financesApi, incomesApi } from "../../../redux/api/hooksAPI";
import { IncomesTableAPI } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";

import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";

import IncomeForms from "./IncomeForms";

function IncomeEditForm() {
  const [updateItem] = incomesApi.useUpdateItemMutation();
  const dispatch = useAppDispatch();
  const { user_id } = useGetUserLoginData();

  const id = Number(useParams().incomeID);

  const { data, isFetching, isError, isLoading } =
    incomesApi.useGetItemByIDQuery({
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
        const handleSubmit = ({
          first_name,
          last_name,
          product_name,
          ...body
        }: IncomesTableAPI) => {
          updateFunction({
            updateItem,
            id: Number(data.income_id),
          })(body).then(() => {
            dispatch(financesApi.util.invalidateTags(["finances_list"]));
          });
        };

        return (
          <IncomeForms
            editMode={true}
            onSubmit={handleSubmit}
            defaultValues={data}
          />
        );
      }}
    </LoadingSpinner>
  );
}

export default IncomeEditForm;
