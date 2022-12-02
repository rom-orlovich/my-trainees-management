import React from "react";

import { useAppDispatch } from "../../../redux/hooks";
import { setMealsPercentsArr } from "../../../redux/slices/nutritionQuestionnaireSlice";
import { FoodFilterFormProps, FoodListForm } from "./FoodListForm";

export function FoodListAddForm() {
  const dispatch = useAppDispatch();
  const handleSubmit = (body: FoodFilterFormProps) => {
    console.log(body);
    // dispatch(setMealsPercentsArr(body.meals_calories_size_percents));
  };

  return <FoodListForm onSubmit={handleSubmit} />;
}
