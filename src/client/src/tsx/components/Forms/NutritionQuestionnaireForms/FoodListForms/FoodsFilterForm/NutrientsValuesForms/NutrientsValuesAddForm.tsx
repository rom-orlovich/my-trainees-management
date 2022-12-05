/* eslint-disable camelcase */
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { getModelControllerState } from "../../../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { ModelFormQuestionnaireModeDisplay } from "../../../../../../redux/slices/modelControllerSlices/modelControllerSliceTypes";
import { setNutrientsValuesQueryParams } from "../../../../../../redux/slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";

import {
  NutrientsValuesForm,
  NutrientsValuesFormProps,
} from "./NutrientsValuesForm";

export function NutrientsValuesAddForm() {
  const dispatch = useAppDispatch();
  const { curParam } = useAppSelector(getModelControllerState);
  const curFormName = curParam as ModelFormQuestionnaireModeDisplay;
  const handleSubmit = ({ nutrients_values }: NutrientsValuesFormProps) => {
    if (curFormName === "nutritionQuestionnaire") return;
    dispatch(
      setNutrientsValuesQueryParams({
        data: nutrients_values,
        formKey: curFormName,
      })
    );
  };

  return <NutrientsValuesForm onSubmit={handleSubmit} />;
}
