import React from "react";

import { useAppDispatch } from "../../../../redux/hooks";
import {
  submitFavoriteFoods,
  setMealsPercentsArr,
} from "../../../../redux/slices/nutritionQuestionnaireFormStates/nutritionQuestionnaireFormSlice";
import { FoodsListForm, FoodsListFormProps } from "./FoodsListForm";

export function FoodListAddForm() {
  const dispatch = useAppDispatch();
  const handleSubmit = (body: FoodsListFormProps) => {
    console.log(body);
    dispatch(submitFavoriteFoods(body.foods));
    // dispatch(setMealsPercentsArr(body.meals_calories_size_percents));
  };

  return <FoodsListForm onSubmit={handleSubmit} />;
}
