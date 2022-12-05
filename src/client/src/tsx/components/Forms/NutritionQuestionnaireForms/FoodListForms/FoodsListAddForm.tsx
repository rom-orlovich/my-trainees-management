import React from "react";

import { useAppDispatch } from "../../../../redux/hooks";
import {
  submitBlackListFoods,
  submitFavoriteFoods,
} from "../../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";
import { FoodsListForm, FoodsListFormProps } from "./FoodsListForm";

export function FoodListAddForm({
  isFavoriteFood = true,
}: {
  isFavoriteFood?: boolean;
}) {
  const dispatch = useAppDispatch();
  const handleSubmit = (body: FoodsListFormProps) => {
    if (isFavoriteFood) dispatch(submitFavoriteFoods(body.foods));
    else dispatch(submitBlackListFoods(body.foods));
  };

  return <FoodsListForm onSubmit={handleSubmit} />;
}
