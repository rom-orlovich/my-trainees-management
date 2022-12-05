import React from "react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { getModelControllerState } from "../../../../redux/slices/modelControllerSlices/modelControllerSlice";
import {
  submitBlackListFoods,
  submitFavoriteFoods,
} from "../../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";
import { FoodsListForm, FoodsListFormProps } from "./FoodsListForm";

export function FoodListAddForm() {
  const dispatch = useAppDispatch();
  const { curParam } = useAppSelector(getModelControllerState);
  const handleSubmit = (body: FoodsListFormProps) => {
    if (curParam === "favoriteFoods") dispatch(submitFavoriteFoods(body.foods));
    else dispatch(submitBlackListFoods(body.foods));
  };

  return <FoodsListForm onSubmit={handleSubmit} />;
}
