/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from "react";
import { useSearchParams } from "react-router-dom";

import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";

import { measuresApi } from "../../../redux/api/hooksAPI";
import { MeasuresAPI } from "../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";

import MeasureForm from "./MeasureForms";

function MeasureEditForm() {
  const [updateItem] = measuresApi.useUpdateItemMutation();
  // const [queryParams] = useSearchParams();
  // const profileID = queryParams.get("profileID");
  // const username = queryParams.get("username");
  // If the user is trainee, the query is executed by his userID instead his trainerUserID.
  const { profileID, traineeID, username, userData, userID } =
    useGetUserTraineeData();
  const queryOptions = traineeID
    ? { username, userID }
    : { username, trainerUserID: userID };

  const { data, isFetching, isError, isLoading } =
    measuresApi.useGetItemsQuery(queryOptions);

  return (
    <LoadingSpinner
      path={`/${APP_ROUTE.MEASURES_ROUTE}/${APP_ROUTE.MEASURE_ADD}?profileID=${profileID}`}
      nameData="Measures"
      stateData={{ data, isFetching, isError, isLoading }}
    >
      {(data) => {
        const results = data.data;
        const {
          protein_g,
          calories_total,
          crabs_cals,
          fat_g,
          crabs_g,
          protein_cals,
          fat_cals,
          ...rest
        } = data.data[results.length - 1];
        const handleSubmit = ({ ...body }: MeasuresAPI) =>
          updateFunction({
            updateItem,
            id: rest.measure_id,
          })(body);

        return (
          <MeasureForm
            editMode={true}
            onSubmit={handleSubmit}
            defaultValues={{
              ...rest,
              date: formatDate(rest.date) as any,
            }}
          />
        );
      }}
    </LoadingSpinner>
  );
}

export default MeasureEditForm;
