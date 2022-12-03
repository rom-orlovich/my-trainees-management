/* eslint-disable camelcase */
import React from "react";
import { useAppDispatch } from "../../../../../redux/hooks";
import { submitFormFilterFoodForm } from "../../../../../redux/slices/filterFoodsFormSlice";
import { FiltersFoodProps, FoodsFilterForm } from "./FoodsFilterForm";

export function FoodsFilterAddForm() {
  const dispatch = useAppDispatch();
  const handleSubmit = ({
    is_vegan,
    is_vegetarian,
    kosher,
    kosher_type,
    nutrient_type,
  }: FiltersFoodProps) => {
    dispatch(
      submitFormFilterFoodForm({
        is_vegan,
        is_vegetarian,
        kosher,
        nutrient_type,
        kosher_type,
      })
    );
  };

  return <FoodsFilterForm onSubmit={handleSubmit} />;
}
