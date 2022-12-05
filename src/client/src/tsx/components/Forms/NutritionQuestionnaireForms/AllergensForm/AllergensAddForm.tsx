import React from "react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setAllergensArr as setFilterFoodAllergens } from "../../../../redux/slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";

import { setAllergensArr as setQuestAllergensArr } from "../../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";

import { AllergensForm, AllergensFormProps } from "./AllergensForm";

import { getModelControllerState } from "../../../../redux/slices/modelControllerSlices/modelControllerSlice";

export function AllergensAddForm() {
  const dispatch = useAppDispatch();
  const { curParam } = useAppSelector(getModelControllerState);
  const handleSubmit = (body: AllergensFormProps) => {
    if (curParam === "favoriteFoods")
      dispatch(
        setFilterFoodAllergens({
          allergensData: body.allergens,
          formKey: "favoriteFoodsFilterForm",
        })
      );
    else if (curParam === "blackListFoods")
      dispatch(
        setFilterFoodAllergens({
          allergensData: body.allergens,
          formKey: "blackListFoodsFilterForm",
        })
      );
    if (curParam === "nutritionQuestionnaire")
      dispatch(setQuestAllergensArr(body.allergens));
  };

  return <AllergensForm onSubmit={handleSubmit} />;
}
