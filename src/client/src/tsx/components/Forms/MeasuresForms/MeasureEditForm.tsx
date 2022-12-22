/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";

import { measuresApi } from "../../../redux/api/hooksAPI";
import { MeasuresRawAPI } from "../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../routes/appRoutesConstants";

import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";

import MeasureForm from "./MeasureForms";

function MeasureEditForm() {
  const [addItem] = measuresApi.useCreateOneItemMutation();

  // If the user is trainee, the query is executed by his userID instead his trainerUserID.
  const { profileID, userID, isTrainee } = useGetUserTraineeData();

  const queryOptions = isTrainee
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
          carbs_cals,
          fat_g,
          carbs_g,
          protein_cals,
          fat_cals,
          ...rest
        } = data.data[0];
        const handleSubmit = ({ measure_id, ...body }: MeasuresRawAPI) =>
          addFunction({
            addItem,
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

export function MeasureEditFormNavigate() {
  const location = useLocation();
  const { profileID, username } = useGetUserTraineeData();
  return (
    <Navigate
      to={`/${APP_ROUTE.MEASURES_ROUTE}/${APP_ROUTE.MEASURE_EDIT}?username=${username}&profileID=${profileID}`}
      replace={true}
      state={{ state: location }}
    />
  );
}

export default MeasureEditForm;
