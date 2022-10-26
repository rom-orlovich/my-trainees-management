/* eslint-disable camelcase */
import React from "react";
import { useParams } from "react-router-dom";
import useGetUserLoginData from "../../../hooks/useGetUserLoginData";
import { traineesApi } from "../../../redux/api/hooksAPI";

import { TraineesBaseTableAPI } from "../../../redux/api/interfaceAPI";

import { formatDate } from "../../../utilities/helpersFun";
import LoadingSpinner from "../../baseComponents/LoadingSpinner/LoadingSpinner";
import { updateFunction } from "../../baseComponents/RHF-Components/FormsHook";
import TraineeForm from "./TraineeForm";

export function TraineeEditForm({ heading }: { heading?: string }) {
  const id = Number(useParams().id);
  const [updateTrainee] = traineesApi.useUpdateItemMutation();
  const { data, isError, isFetching, isLoading } =
    traineesApi.useGetItemByIDQuery({
      id,
      trainerUserID: useGetUserLoginData().user_id,
    });

  const handleSubmit = ({
    username,
    profile_id,
    trainee_id,
    measure_id,
    ...rest
  }: TraineesBaseTableAPI) => {
    updateFunction({
      id: data?.trainee_id || 0,
      updateItem: updateTrainee,
    })(rest);
  };

  return (
    <LoadingSpinner stateData={{ data, isError, isFetching, isLoading }}>
      {({ street, city_name, ...traineeData }) => (
        <TraineeForm
          editMode={true}
          heading={heading}
          onSubmit={handleSubmit}
          defaultValues={{
            ...traineeData,
            date_join: formatDate(traineeData.date_join) as any,
            birthday: formatDate(traineeData.birthday) as any,
          }}
        />
      )}
    </LoadingSpinner>
  );
}

export default TraineeEditForm;
