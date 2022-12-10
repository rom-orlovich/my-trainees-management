/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";
import { AllergensCheckbox } from "../../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";
import { FoodProps } from "../../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsListForm";
import { MealsCaloriesSize } from "../../../../components/Forms/NutritionQuestionnaireForms/NutritionQuestionnaireFormComponents/MealsCaloriesSizeForms/MealsCaloriesSizeForm";
import { createChosenFoodData } from "../nutritionQuestionnaireFormSlice";
import { NutritionQuestionnaireFormState } from "../nutritionQuestionnaireFormsSliceTypes";
import { createAllergensData } from "./helpersFun";

export const setMealsPercentsArrFun = (
  state: NutritionQuestionnaireFormState,
  action: PayloadAction<MealsCaloriesSize[]>
) => {
  state.displayInputsForm.mealsPercentsState.inputsStr = action.payload
    .reduce((pre, cur, i) => `${pre} Meal ${i + 1} ${cur.percents}%,`, "")
    .slice(0, -1);
  state.displayInputsForm.mealsPercentsState.inputsData = action.payload;
  state.serverQueryProps.meals_calories_size_percents = action.payload.map(
    (el) => el.percents
  );
};
export const resetMealsPercentsArrFun = (
  state: NutritionQuestionnaireFormState
) => {
  state.displayInputsForm.mealsPercentsState.inputsData = [];
  state.displayInputsForm.mealsPercentsState.inputsStr = "";
  state.serverQueryProps.meals_calories_size_percents = [];
};

export const setAllergensArrFun = (
  state: NutritionQuestionnaireFormState,
  action: PayloadAction<AllergensCheckbox[]>
) => {
  const { allergensData, allergensArr, allergensStr } = createAllergensData(
    action.payload
  );

  state.displayInputsForm.allergenCheckboxState.inputsData = allergensData;
  state.displayInputsForm.allergenCheckboxState.inputsStr = allergensStr;
  state.serverQueryProps.allergens = allergensArr;
};
export const resetAllergensArrFun = (
  state: NutritionQuestionnaireFormState
) => {
  state.displayInputsForm.allergenCheckboxState.inputsData = [];
  state.displayInputsForm.allergenCheckboxState.inputsStr = "";
  state.serverQueryProps.allergens = [];
};
export const submitFavoriteFoodsFun = (
  state: NutritionQuestionnaireFormState,
  action: PayloadAction<FoodProps[]>
) => {
  const { foodNameArr, serverFoodsData } = createChosenFoodData(action);
  state.displayInputsForm.favoriteFoodsName = foodNameArr.join(",");
  state.serverQueryProps.favorite_foods = serverFoodsData;
};
export const submitBlackListFoodsFun = (
  state: NutritionQuestionnaireFormState,
  action: PayloadAction<FoodProps[]>
) => {
  const { foodNameArr, serverFoodsData } = createChosenFoodData(action);
  state.displayInputsForm.blackListFoodsNames = foodNameArr.join(",");
  state.serverQueryProps.black_list_foods = serverFoodsData;
};
export const resetFavoriteFoodsFun = (
  state: NutritionQuestionnaireFormState
) => {
  state.displayInputsForm.favoriteFoodsName = "";
  state.serverQueryProps.favorite_foods = [];
};
export const resetBlackListFoodsFun = (
  state: NutritionQuestionnaireFormState
) => {
  state.displayInputsForm.blackListFoodsNames = "";
  state.serverQueryProps.black_list_foods = [];
};
