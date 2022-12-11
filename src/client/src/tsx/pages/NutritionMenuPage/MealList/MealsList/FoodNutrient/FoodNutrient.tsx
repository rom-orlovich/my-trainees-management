/* eslint-disable camelcase */
import React from "react";
import { FoodNutrientDetails } from "../../../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../../../redux/hooks";
import { openModel } from "../../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { genClassName } from "../../../../../utilities/helpersFun";
import style from "./FoodNutrient.module.scss";

export interface FoodDetailsModelParam {
  food_id: number;
  amount: number;
}
function FoodNutrient({
  foodNutrient: { food_name, food_amount, food_id },
}: {
  foodNutrient: FoodNutrientDetails;
}) {
  const dispatch = useAppDispatch();
  return (
    <li
      onClick={() =>
        dispatch(
          openModel({
            curParam: { food_id, amount: food_amount },
            displayContent: "foodDetails",
          })
        )
      }
      className={genClassName(style.food_nutrient_container)}
    >
      <span className={style.name}>
        {food_amount} {food_amount > 1 ? " units" : " unit"},
        {food_name.slice(0, 20)} /
      </span>
    </li>
  );
}

export default FoodNutrient;
