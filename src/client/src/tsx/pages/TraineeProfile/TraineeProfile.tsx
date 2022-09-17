import React from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import { traineesApi } from "../../redux/api/hooksAPI";
import PersonalDetails from "./PersonalDetails";
import style from "./TraineeProfile.module.scss";
function TraineeProfile() {
  const id = Number(useParams().id);
  const { data, isError, isFetching, isLoading } =
    traineesApi.useGetItemByIDQuery(id);

  return (
    <LoadingSpinner
      nameData="Trainee Profile"
      stateData={{ data, isError, isFetching, isLoading }}
    >
      {(data) => {
        console.log(data);
        return (
          <div className={style.TraineeProfile}>
            <PersonalDetails traineeData={data} />
            <div>
              <div> </div>
              <div> </div>
            </div>
          </div>
        );
      }}
    </LoadingSpinner>
  );
}

export default TraineeProfile;
