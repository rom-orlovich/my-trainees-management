import React from "react";
import UserDetails from "../UserDetails.tsx/UserDetails";
import CaloriesChart from "./CaloriesChart/CaloriesChart";
import Programs from "./Programs/Programs";
import ProgressChart from "./ProgressChart/ProgressChart";
import SubscriptionPlan from "./SubscriptionPlans/SubscriptionPlan";

import style from "./TraineeProfile.module.scss";

function TraineeProfile() {
  return (
    <section className={style.trainee_profile_page_container}>
      <CaloriesChart className={style.calories_chart_grid_item} />
      <Programs className={style.programs_grid_item} />
      <UserDetails className={style.user_details_grid_item} />
      <ProgressChart className={style.progress_chart_grid_item} />
      <SubscriptionPlan className={style.subscription_plans_grid_item} />
    </section>
  );
}

export default TraineeProfile;
