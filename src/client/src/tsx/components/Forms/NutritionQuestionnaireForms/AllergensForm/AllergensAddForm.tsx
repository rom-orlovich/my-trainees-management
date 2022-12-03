import React from "react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setAllergensArr as setFilterFoodAllergens } from "../../../../redux/slices/filterFoodsFormSlice";
import { getModelControllerState } from "../../../../redux/slices/modelControllerSlice";
import { setAllergensArr as setQuestAllergensArr } from "../../../../redux/slices/nutritionQuestionnaireFormSlice";

import { AllergensForm, AllergensFormProps } from "./AllergensForm";

export function AllergensAddForm() {
  // const [addItem, state] = participantsGroupApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();
  const modelControllerState = useAppSelector(getModelControllerState);
  const handleSubmit = (body: AllergensFormProps) => {
    console.log(body);
    if (modelControllerState.curParam !== "filter_foods_form")
      dispatch(setQuestAllergensArr(body.allergens));
    else dispatch(setFilterFoodAllergens(body.allergens));
    //   addFunction({
    //   addItem,
    // })
  };

  return <AllergensForm onSubmit={handleSubmit} />;
}
