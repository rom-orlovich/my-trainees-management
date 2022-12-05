/* eslint-disable camelcase */
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { getModelControllerState } from "../../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import { ModelFormQuestionnaireModeDisplay } from "../../../../../redux/slices/modelControllerSlices/modelControllerSliceTypes";

import { submitFilterFoodsForm } from "../../../../../redux/slices/nutritionQuestionnaireFormSlices/filterFoodsFormSlice";

import { FiltersFoodProps, FoodsFilterForm } from "./FoodsFilterForm";

export function FoodsFilterAddForm() {
  const dispatch = useAppDispatch();

  const { curParam } = useAppSelector(getModelControllerState);
  const handleSubmit = (data: FiltersFoodProps) => {
    const { is_vegan, is_vegetarian, kosher, kosher_type, nutrient_type } =
      data;

    const curFormName = curParam as ModelFormQuestionnaireModeDisplay;
    if (curFormName === "nutritionQuestionnaire") return;
    dispatch(
      submitFilterFoodsForm({
        data: { is_vegan, is_vegetarian, kosher, kosher_type, nutrient_type },
        formKey: curFormName,
      })
    );
  };

  return <FoodsFilterForm onSubmit={handleSubmit} />;
}
