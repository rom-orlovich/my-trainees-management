import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { getModelControllerState } from "../../../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { setNutrientsValuesQueryParams } from "../../../../../../redux/slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";

import {
  NutrientsValuesForm,
  NutrientsValuesFormProps,
} from "./NutrientsValuesForm";

export function NutrientsValuesAddForm() {
  const dispatch = useAppDispatch();
  const { curParam } = useAppSelector(getModelControllerState);

  const handleSubmit = ({ nutrients_values }: NutrientsValuesFormProps) => {
    if (curParam === "favoriteFoods")
      dispatch(setNutrientsValuesQueryParams(nutrients_values));
    dispatch(setNutrientsValuesQueryParams(nutrients_values));
  };

  return <NutrientsValuesForm onSubmit={handleSubmit} />;
}
