import React from "react";

import { useAppDispatch } from "../../../redux/hooks";
import { setMealsPercentsArr } from "../../../redux/slices/nutritionQuestionnaireSlice";

import {
  MealsCaloriesSizeForm,
  MealsCaloriesSizeFormProps,
} from "./MealsCaloriesSizeForm";

export function MealsCaloriesSizeAddForm() {
  const dispatch = useAppDispatch();
  const handleSubmit = (body: MealsCaloriesSizeFormProps) => {
    console.log(body);
    dispatch(setMealsPercentsArr(body.meals_calories_size_percents));
  };

  return <MealsCaloriesSizeForm onSubmit={handleSubmit} />;
}
