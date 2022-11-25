/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from "react";

import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";

import { measuresApi } from "../../../redux/api/hooksAPI";
import { MeasuresRawAPI } from "../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import {
  addFunction,
  updateFunction,
} from "../../baseComponents/RHF-Components/FormsHook";

import MeasureForm from "./MeasureForms";

function MeasureEditForm() {
  const [addItem] = measuresApi.useCreateOneItemMutation();

  // If the user is trainee, the query is executed by his userID instead his trainerUserID.
  const { profileID, traineeID, userID } = useGetUserTraineeData();

  const queryOptions = traineeID
    ? { profileID, userID }
    : { profileID, trainerUserID: userID };

  const { data, isFetching, isError, isLoading } = measuresApi.useGetItemsQuery(
    { ...queryOptions, asc: "false" }
  );

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
        } = data.data[0];
        const handleSubmit = ({ measure_id, ...body }: MeasuresRawAPI) =>
          addFunction({
            addItem,
          })({ ...body });

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
