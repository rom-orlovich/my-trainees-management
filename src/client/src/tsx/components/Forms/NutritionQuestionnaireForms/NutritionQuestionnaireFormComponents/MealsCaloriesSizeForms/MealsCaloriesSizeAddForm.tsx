import React from "react";

import { useAppDispatch } from "../../../../../redux/hooks";
import { setMealsPercentsArr } from "../../../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";

import {
  MealsCaloriesSizeForm,
  MealsCaloriesSizeFormProps,
} from "./MealsCaloriesSizeForm";

export function MealsCaloriesSizeAddForm() {
  const dispatch = useAppDispatch();
  const handleSubmit = (body: MealsCaloriesSizeFormProps) => {
    const sum = body.mealsCaloriesPercents.reduce(
      (pre, cur) => pre + Number(cur.percents),
      0
    );

    if (sum > 100)
      throw new Error(
        "The maximum size of all meals percents together is 100%"
      );
    else dispatch(setMealsPercentsArr(body.mealsCaloriesPercents));
  };

  return <MealsCaloriesSizeForm onSubmit={handleSubmit} />;
}
