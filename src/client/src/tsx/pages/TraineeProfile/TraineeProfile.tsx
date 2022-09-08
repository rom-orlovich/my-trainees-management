import React from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import { traineesApi } from "../../redux/api/hooksAPI";
import PersonalDetails from "./PersonalDetails";

function TraineeProfile() {
  const id = Number(useParams().id);
  const { data, isError, isFetching, isLoading } =
    traineesApi.useGetItemByIDQuery(Number(id || " "));

  return (
    <LoadingSpinner
      nameData="Trainee Profile"
      stateData={{ data, isError, isFetching, isLoading }}
    >
      {(data) => {
        return <PersonalDetails id={id}></PersonalDetails>;
      }}
    </LoadingSpinner>
  );
}

export default TraineeProfile;
