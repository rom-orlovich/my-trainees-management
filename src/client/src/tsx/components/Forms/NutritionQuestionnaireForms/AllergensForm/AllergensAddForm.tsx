import React from "react";

import { useAppDispatch } from "../../../../redux/hooks";
import {
  setAllergensArr,
  setMealsPercentsArr,
} from "../../../../redux/slices/nutritionQuestionnaireSlice";

import { AllergensForm, AllergensFormProps } from "./AllergensForm";

export function AllergensAddForm() {
  // const [addItem, state] = participantsGroupApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = (body: AllergensFormProps) => {
    console.log(body);
    dispatch(setAllergensArr(body.allergens));
    //   addFunction({
    //   addItem,
    // })
  };

  return <AllergensForm onSubmit={handleSubmit} />;
}
