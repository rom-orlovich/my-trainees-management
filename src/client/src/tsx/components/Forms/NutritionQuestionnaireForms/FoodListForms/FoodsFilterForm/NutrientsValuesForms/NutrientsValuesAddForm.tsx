import React from "react";
// import { useAppDispatch } from "../../../../../../redux/hooks";

import { NutrientsValuesForm } from "./NutrientsValuesForm";

export function NutrientsValuesAddForm() {
  // const dispatch = useAppDispatch();
  const handleSubmit = (body: any) => {
    console.log(body);
    // dispatch(setMealsPercentsArr(body.meals_calories_size_percents));
  };

  return <NutrientsValuesForm onSubmit={handleSubmit} />;
}
