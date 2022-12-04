import React from "react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setAllergensArr as setFilterFoodAllergens } from "../../../../redux/slices/nutritionQuestionnaireFormStates/filterFoodsFormSlice";
import { getModelControllerState } from "../../../../redux/slices/modelControllerSlice";
import { setAllergensArr as setQuestAllergensArr } from "../../../../redux/slices/nutritionQuestionnaireFormStates/nutritionQuestionnaireFormSlice";

import { AllergensForm, AllergensFormProps } from "./AllergensForm";

export function AllergensAddForm() {
  // const [addItem, state] = participantsGroupApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();
  const modelControllerState = useAppSelector(getModelControllerState);
  const handleSubmit = (body: AllergensFormProps) => {
    if (modelControllerState.curParam !== "filter_foods_form")
      dispatch(setQuestAllergensArr(body.allergens));
    else dispatch(setFilterFoodAllergens(body.allergens));
  };

  return <AllergensForm onSubmit={handleSubmit} />;
}
