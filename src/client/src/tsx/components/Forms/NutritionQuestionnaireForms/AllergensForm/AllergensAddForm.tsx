import React from "react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setAllergenDataByForm } from "../../../../redux/slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";

import { setAllergensArr as setQuestAllergensArr } from "../../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";

import { AllergensForm, AllergensFormProps } from "./AllergensForm";

import { getModelControllerState } from "../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { ModelFormQuestionnaireModeDisplay } from "../../../../redux/slices/modelControllerSlices/modelControllerSliceTypes";

export function AllergensAddForm() {
  const dispatch = useAppDispatch();
  const { curParam } = useAppSelector(getModelControllerState);
  const handleSubmit = (body: AllergensFormProps) => {
    const curFormName = curParam as ModelFormQuestionnaireModeDisplay;

    if (
      curFormName === "blackListFoodsFilterForm" ||
      curFormName === "favoriteFoodsFilterForm"
    )
      dispatch(
        setAllergenDataByForm({
          data: body.allergens,
          formKey: curFormName,
        })
      );
    else if (curFormName === "nutritionQuestionnaire")
      dispatch(setQuestAllergensArr(body.allergens));
  };

  return <AllergensForm onSubmit={handleSubmit} />;
}
