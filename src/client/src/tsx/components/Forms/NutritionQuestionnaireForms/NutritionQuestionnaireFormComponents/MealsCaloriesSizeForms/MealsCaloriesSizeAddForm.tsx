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
    dispatch(setMealsPercentsArr(body.meals_calories_size_percents));
  };

  return <MealsCaloriesSizeForm onSubmit={handleSubmit} />;
}
