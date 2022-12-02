import React from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { FiltersFoodProps, FoodsFilterForm } from "./FoodsFilterForm";

export function FoodListAddForm() {
  const dispatch = useAppDispatch();
  const handleSubmit = (body: FiltersFoodProps) => {
    console.log(body);
    // dispatch(setMealsPercentsArr(body.meals_calories_size_percents));
  };

  return <FoodsFilterForm onSubmit={handleSubmit} />;
}
