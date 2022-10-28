/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";

import { incomesApi, measuresApi } from "../../../redux/api/hooksAPI";
import { IncomeAPI, MeasuresAPI } from "../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import {
  addFunction,
  updateFunction,
} from "../../baseComponents/RHF-Components/FormsHook";

import IncomeForms from "./IncomeForms";

function IncomeEditForm() {
  const [updateItem] = incomesApi.useUpdateItemMutation();

  const { user_id } = useGetUserLoginData();

  const id = Number(useParams().id);

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
        }: IncomeAPI) => {
          updateFunction({
            updateItem,
            id: Number(data.income_id),
          })(body);
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
