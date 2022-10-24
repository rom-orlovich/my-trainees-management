/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";
import { SubscriptionPlansAPI } from "../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import { formatDate } from "../../../../utilities/helpersFun";
import listProfileStyle from "../../ListProfile/ListProfile.module.scss";

function SubscriptionPlanLi({
  plan_name,
  current_num_trainings,
  total_trainings,
  last_training,
  subscription_plan_id,
  trainee_id,
}: SubscriptionPlansAPI) {
  return (
    <li className={listProfileStyle.list_li}>
      <span className={listProfileStyle.list_detail}>
        <span>Plan</span>
        <Link
          to={`/${APP_ROUTE.TRAINEES_ROUTE}/${trainee_id}/${APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE}/${APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE_EDIT}/${subscription_plan_id}`}
        >
          {plan_name}
        </Link>
      </span>
      <span className={listProfileStyle.list_detail}>
        <span>Current</span>
        <span>{current_num_trainings}</span>
      </span>
      <span className={listProfileStyle.list_detail}>
        <span>Total</span>
        <span>{total_trainings}</span>
      </span>
      <span className={listProfileStyle.list_detail}>
        <span>Last</span>
        <span>{formatDate(last_training, 0)}</span>
      </span>
    </li>
  );
}

export default SubscriptionPlanLi;
