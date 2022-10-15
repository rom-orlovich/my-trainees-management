import React from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import TraineeEditForm from "../../components/Forms/TraineeForms/TraineeEditForm";
import useGetUserLoginData from "../../hooks/useGetUserLoginData";
import { traineesApi } from "../../redux/api/hooksAPI";

function TraineeProfile() {
  const id = Number(useParams().id);
  const { data, isError, isFetching, isLoading } =
    traineesApi.useGetItemByIDQuery({
      id,
      trainerUserID: useGetUserLoginData().user_id,
    });

  return (
    <LoadingSpinner
      nameData="Trainee Profile"
      stateData={{ data, isError, isFetching, isLoading }}
    >
      {(data) => (
        <TraineeEditForm
          heading="Personal Details"
          traineeData={data}
        ></TraineeEditForm>
      )}
    </LoadingSpinner>
  );
}

export default TraineeProfile;
