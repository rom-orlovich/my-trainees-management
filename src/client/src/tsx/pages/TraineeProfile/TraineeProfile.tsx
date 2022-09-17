import React from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/baseComponents/LoadingSpinner";
import { traineesApi } from "../../redux/api/hooksAPI";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import ProgramsTracking from "./ProgramsTracking/ProgramsTracking";
import SubscriptionStatus from "./SubscriptionStatus/SubscriptionStatus";
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
            <div className={style.left_profile}>
              <PersonalDetails traineeData={data} />
            </div>

            <div className={style.right_profile}>
              <SubscriptionStatus></SubscriptionStatus>
              <ProgramsTracking></ProgramsTracking>
            </div>
          </div>
        );
      }}
    </LoadingSpinner>
  );
}

export default TraineeProfile;
