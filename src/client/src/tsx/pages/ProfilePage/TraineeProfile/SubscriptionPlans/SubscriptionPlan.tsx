/* eslint-disable camelcase */
import React from "react";
import { BsPlusSquare, BsFillPlusSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import Card from "../../../../components/baseComponents/Card/Card";
import List from "../../../../components/baseComponents/List/List";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner";
import { subscriptionPlansApi } from "../../../../redux/api/hooksAPI";
import { SubscriptionPlansAPI } from "../../../../redux/api/interfaceAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import { formatDate, genClassName } from "../../../../utilities/helpersFun";
import { TraineeProfileProps } from "../TraineeProfile";
import listProfileStyle from "../../ListProfile.module.scss";
import style from "./SubscriptionPlan.module.scss";

function SubscriptionPlan({ className, queryOptions }: TraineeProfileProps) {
  const { data, isError, isLoading, isFetching } =
    subscriptionPlansApi.useGetItemsQuery({ ...queryOptions });

  const SubscriptionPlanLi = ({
    plan_name,
    current_num_trainings,
    total_trainings,
    last_training,
    subscription_plan_id,
  }: SubscriptionPlansAPI) => (
    <li>
      <span className={listProfileStyle.list_detail}>
        <span>Plan</span>
        <Link
          to={`/${APP_ROUTE.TRAINEES_ROUTE}/${queryOptions?.traineeID}/${APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE}/${APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE_EDIT}/${subscription_plan_id}`}
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
  return (
    <Card
      className={genClassName(
        className,
        listProfileStyle.list_container,
        style.subscription_plans_container
      )}
    >
      <Link
        to={`/${APP_ROUTE.TRAINEES_ROUTE}/${queryOptions?.traineeID}/${APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE}/${APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE_ADD}`}
      >
        <BsFillPlusSquareFill className={style.plus_button_icon} />
      </Link>

      <h2>Subscription Plans </h2>
      <LoadingSpinner
        nameData="Subscription Plans"
        stateData={{ data, isError, isLoading, isFetching }}
      >
        {(data) => (
          <List
            className={listProfileStyle.list}
            dataArr={data.data.slice(0, 3)}
            LI={SubscriptionPlanLi}
          />
        )}
      </LoadingSpinner>
    </Card>
  );
}

export default SubscriptionPlan;
