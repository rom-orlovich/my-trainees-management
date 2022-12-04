import React from "react";
import { foodsApi } from "../../../../../../redux/api/hooksAPI";
import { useAppSelector } from "../../../../../../redux/hooks";
import { getModelControllerState } from "../../../../../../redux/slices/modelControllerSlice";
import style from "./FoodsList.module.scss";

function FoodDetails() {
  const { curParam } = useAppSelector(getModelControllerState);
  const { data } = foodsApi.useGetItemByIDQuery(curParam);
  console.log(data);
  return <div>{data?.food_name}</div>;
}

export default FoodDetails;
