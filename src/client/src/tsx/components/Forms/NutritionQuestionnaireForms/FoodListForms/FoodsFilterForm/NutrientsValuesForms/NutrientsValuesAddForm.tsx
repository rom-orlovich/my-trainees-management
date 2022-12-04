import React from "react";
import { useAppDispatch } from "../../../../../../redux/hooks";
import { setNutrientsValuesQueryParams } from "../../../../../../redux/slices/nutritionQuestionnaireFormStates/filterFoodsFormSlice";

import {
  NutrientsValuesForm,
  NutrientsValuesFormProps,
} from "./NutrientsValuesForm";

export function NutrientsValuesAddForm() {
  const dispatch = useAppDispatch();
  const handleSubmit = ({ nutrients_values }: NutrientsValuesFormProps) => {
    dispatch(setNutrientsValuesQueryParams(nutrients_values));
  };

  return <NutrientsValuesForm onSubmit={handleSubmit} />;
}
