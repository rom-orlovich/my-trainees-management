import React from "react";

import { PropsBasic } from "../../../components/baseComponents/baseComponentsTypes";
import useGetUserTraineeData from "../../../hooks/useGetUserTraineeData";
import TraineeUserDetails from "./TraineeUserDetails/TraineeUserDetails";

import CaloriesChart from "./CaloriesChart/CaloriesChart";
import ProgramsList from "./ProgramsList/ProgramsList";
import ProgressChart from "./ProgressChart/ProgressChart";
import SubscriptionPlans from "./SubscriptionPlans/SubscriptionPlans";

import style from "./TraineeProfile.module.scss";

export type TraineeProfileProps = PropsBasic & {
  queryOptions?: {
    traineeID: number;
    trainerUserID?: number;
    userID?: number;
  };
};

function TraineeProfile() {
  const { isTrainee, traineeID, userData, userID } = useGetUserTraineeData();

  const queryOptions = isTrainee
    ? { traineeID, userID }
    : { traineeID, trainerUserID: userID };

  return (
    <section className={style.trainee_profile_page}>
      <div className={style.trainee_profile_page_container}>
        <CaloriesChart
          className={style.calories_chart_grid_item}
          queryOptions={queryOptions}
        />
        <ProgramsList
          className={style.programs_grid_item}
          queryOptions={queryOptions}
        />
        <TraineeUserDetails className={style.user_details_grid_item} />
        <ProgressChart className={style.progress_chart_grid_item} />
        <SubscriptionPlans
          className={style.subscription_plans_grid_item}
          queryOptions={queryOptions}
        />
      </div>
    </section>
  );
}

export default TraineeProfile;
