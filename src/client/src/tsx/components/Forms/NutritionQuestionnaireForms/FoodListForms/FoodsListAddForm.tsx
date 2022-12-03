import React from "react";

import { useAppDispatch } from "../../../../redux/hooks";
import { setMealsPercentsArr } from "../../../../redux/slices/nutritionQuestionnaireFormSlice";
import { FoodsListForm, FoodsListFormProps } from "./FoodsListForm";

export function FoodListAddForm() {
  const dispatch = useAppDispatch();
  const handleSubmit = (body: FoodsListFormProps) => {
    console.log(body);
    // dispatch(setMealsPercentsArr(body.meals_calories_size_percents));
  };

  return <FoodsListForm onSubmit={handleSubmit} />;
}
