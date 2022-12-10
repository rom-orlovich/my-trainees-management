/* eslint-disable camelcase */
import React from "react";
import { Link } from "react-router-dom";

import useGetUserTraineeData from "../../../../hooks/useGetUserTraineeData";
import { SubscriptionPlansAPI } from "../../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../../redux/hooks";
import { openModel } from "../../../../redux/slices/modelControllerSlices/modelControllerSlice";

import { formatDate } from "../../../../utilities/helpersFun";
import listProfileStyle from "../../ListProfile/ListProfile.module.scss";

function SubscriptionPlanLi({
  product_name,
  current_num_trainings,
  total_trainings,
  last_training,
  subscription_plan_id,
}: SubscriptionPlansAPI) {
  const dispatch = useAppDispatch();
  const { isTrainee } = useGetUserTraineeData();
  return (
    <li className={listProfileStyle.list_li}>
      <span className={listProfileStyle.list_detail}>
        <span>Plan</span>
        <Link
          onClick={
            !isTrainee
              ? (e) => {
                  e.preventDefault();
                  dispatch(
                    openModel({
                      displayContent: "subscriptionPlansForm",
                      curParam: subscription_plan_id,
                    })
                  );
                }
              : undefined
          }
          to={``}
        >
          {product_name || ""}
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
