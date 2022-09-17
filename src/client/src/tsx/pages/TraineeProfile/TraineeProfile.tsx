import React from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import { traineesApi } from "../../redux/api/hooksAPI";
import PersonalDetails from "./PersonalDetails";
// import style from "./PersonalDetails.module.scss";
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
        return (
          <div>
            <PersonalDetails traineeData={data}></PersonalDetails>
          </div>
        );
      }}
    </LoadingSpinner>
  );
}

export default TraineeProfile;
