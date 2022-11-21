/* eslint-disable camelcase */
import React from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import Card from "../../../../components/baseComponents/Card/Card";

import { subscriptionPlansApi } from "../../../../redux/api/hooksAPI";

import { genClassName } from "../../../../utilities/helpersFun";
import { TraineeProfileProps } from "../TraineeProfile";

import style from "./SubscriptionPlan.module.scss";
import SubscriptionPlanLi from "./SubscriptionPlanLi";
import ListProfile from "../../ListProfile/ListProfile";
import useGetUserTraineeData from "../../../../hooks/useGetUserTraineeData";
import { useAppDispatch } from "../../../../redux/hooks";
import { openModel } from "../../../../redux/slices/modelControllerSlice";

function SubscriptionPlans({ className, queryOptions }: TraineeProfileProps) {
  const { isTrainee } = useGetUserTraineeData();
  const dispatch = useAppDispatch();
  return (
    <Card
      className={genClassName(
        className,

        style.subscription_plans_container
      )}
    >
      {!isTrainee && (
        // <Link
        //   className={style.plus_button_icon}
        //   to={`/${APP_ROUTE.TRAINEES_ROUTE}/${queryOptions?.traineeID}/${APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE}/${APP_ROUTE.SUBSCRIPTION_PLANS_ROUTE_ADD}`}
        // >
        //   <BsFillPlusSquareFill />
        // </Link>
        <Link
          onClick={(e) => {
            e.preventDefault();
            dispatch(
              openModel({
                displayContent: "subscriptionPlansForm",
              })
            );
          }}
          className={style.plus_button_icon}
          to={``}
        >
          <BsFillPlusSquareFill />
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
