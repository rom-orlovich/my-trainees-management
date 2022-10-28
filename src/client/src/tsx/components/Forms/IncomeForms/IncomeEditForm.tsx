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

function MeasureEditForm() {
  const [updateItem] = incomesApi.useUpdateItemMutation();

  // If the user is trainee, the query is executed by his userID instead his trainerUserID.
  // const { profileID, traineeID, userID } = useGetUserTraineeData();
  // const queryOptions = traineeID
  //   ? { profileID, userID }
  //   : { profileID, trainerUserID: userID };
  const id = Number(useParams().id);

  const { data, isFetching, isError, isLoading } =
    incomesApi.useGetItemByIDQuery({
      id,
    });

  return (
    <LoadingSpinner
      path={``}
      nameData="Incomes"
      stateData={{ data, isFetching, isError, isLoading }}
    >
      {(data) => {
        const handleSubmit = ({ ...body }: IncomeAPI) => {
          console.log(body);
          updateFunction({
            updateItem,
            id: Number(data.income_id),
          })(body);
        };

        return (
          <IncomeForms
            editMode={true}
            onSubmit={handleSubmit}
            defaultValues={{
              ...data,
            }}
          />
        );
      }}
    </LoadingSpinner>
  );
}

export default MeasureEditForm;
