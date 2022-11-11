/* eslint-disable camelcase */
import React from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import Card from "../../../../components/baseComponents/Card/Card";

import { subscriptionPlansApi } from "../../../../redux/api/hooksAPI";

import { APP_ROUTE } from "../../../../routes/appRoutesConstants";
import { genClassName } from "../../../../utilities/helpersFun";
import { TraineeProfileProps } from "../TraineeProfile";
import listProfileStyle from "../../ListProfile/ListProfile.module.scss";
import style from "./SubscriptionPlan.module.scss";
import SubscriptionPlanLi from "./SubscriptionPlanLi";
import ListProfile from "../../ListProfile/ListProfile";
import useGetUserTraineeData from "../../../../hooks/useGetUserTraineeData";

function SubscriptionPlans({ className, queryOptions }: TraineeProfileProps) {
  const { isTrainee } = useGetUserTraineeData();
  return (
    <Card
      className={genClassName(
        className,
        // listProfileStyle.list_container,
        style.subscription_plans_container
      )}
    >
      {!isTrainee && (
        <Link
          to={`/${APP_ROUTE.TRAINEES_ROUTE}/${queryOptions?.traineeID}/${APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE}/${APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE_ADD}`}
        >
          <BsFillPlusSquareFill className={style.plus_button_icon} />
        </Link>
      )}

      <ListProfile
        dataNotFoundEl={<> No subscription plans are found</>}
        heading="Subscription Plans"
        useQuery={subscriptionPlansApi.useGetItemsQuery}
        queryOptions={{
          ...queryOptions,
          asc: "false",
          orderBy: "lastTraining",
        }}
        pagePath={""}
        LI={SubscriptionPlanLi}
      />
    </Card>
  );
}

export default SubscriptionPlans;
