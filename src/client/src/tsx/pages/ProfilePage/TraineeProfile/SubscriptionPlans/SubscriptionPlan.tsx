import React from "react";
import { BsPlusSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

import Card from "../../../../components/baseComponents/Card/Card";
import List from "../../../../components/baseComponents/List/List";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner";
import { subscriptionPlansApi } from "../../../../redux/api/hooksAPI";
import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import { genClassName } from "../../../../utilities/helpersFun";
import { TraineeProfileProps } from "../TraineeProfile";
import style from "./SubscriptionPlan.module.scss";

function SubscriptionPlan({ className, queryOptions }: TraineeProfileProps) {
  const { data, isError, isLoading, isFetching } =
    subscriptionPlansApi.useGetItemsQuery({ ...queryOptions });
  console.log(data);
  return (
    <Card
      className={genClassName(className, style.subscription_plans_container)}
    >
      <Link
        to={`/${APP_ROUTE.TRAINEES_ROUTE}/${queryOptions?.traineeID}/${APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE}/${APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE_ADD}`}
      >
        <BsPlusSquare className={style.plus_button_icon} />
      </Link>

      <LoadingSpinner
        nameData="Subscription Plans"
        stateData={{ data, isError, isLoading, isFetching }}
      >
        {(data) => <List dataArr={data.data} LI={() => <></>} />}
      </LoadingSpinner>
    </Card>
  );
}

export default SubscriptionPlan;
