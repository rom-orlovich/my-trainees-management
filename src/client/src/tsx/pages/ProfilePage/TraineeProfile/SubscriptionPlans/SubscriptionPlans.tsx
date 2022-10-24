/* eslint-disable camelcase */
import React from "react";
import { BsPlusSquare, BsFillPlusSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import Card from "../../../../components/baseComponents/Card/Card";
import List from "../../../../components/baseComponents/List/List";
import LoadingSpinner from "../../../../components/baseComponents/LoadingSpinner";
import { subscriptionPlansApi } from "../../../../redux/api/hooksAPI";

import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import { genClassName } from "../../../../utilities/helpersFun";
import { TraineeProfileProps } from "../TraineeProfile";
import listProfileStyle from "../../ListProfile.module.scss";
import style from "./SubscriptionPlan.module.scss";
import SubscriptionPlanLi from "./SubscriptionPlanLi";
import ListProfile from "../../ListProfile";

function SubscriptionPlans({ className, queryOptions }: TraineeProfileProps) {
  const { data, isError, isLoading, isFetching } =
    subscriptionPlansApi.useGetItemsQuery({ ...queryOptions });

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

      {/* <h2>Subscription Plans </h2>
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
      </LoadingSpinner> */}

      <ListProfile
        heading="Subscription Plans"
        useQuery={subscriptionPlansApi.useGetItemsQuery}
        queryOptions={queryOptions}
        pagePath={""}
        LI={SubscriptionPlanLi}
      />
    </Card>
  );
}

export default SubscriptionPlans;
