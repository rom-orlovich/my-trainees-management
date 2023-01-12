/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  AllergensListType,
  ALLERGENS_LIST,
} from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/constants";

import { FoodProps } from "../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsListForm";
import { RootState } from "../../store.types";

import { NutritionQuestionnaireFormState } from "./nutritionQuestionnaireFormsSliceTypes";

import {
  resetAllergensArrFun,
  resetBlackListFoodsFun,
  resetFavoriteFoodsFun,
  resetMealsPercentsArrFun,
  resetNutritionQuestionnaireStateFun,
  setAllergensArrFun,
  setMealsPercentsArrFun,
  submitBlackListFoodsFun,
  submitFavoriteFoodsFun,
} from "./utilities/helpersNutritionQuestionnaire";

export const CHECKBOXES_ALLERGENS = ALLERGENS_LIST.map((el) => ({
  name: el as AllergensListType,
  value: false,
}));

export const nutritionQuestionnaireState: NutritionQuestionnaireFormState = {
  displayInputsForm: {
    allergenCheckboxState: { inputsData: CHECKBOXES_ALLERGENS, inputsStr: "" },

    favoriteFoodsNames: "",
    blackListFoodsNames: "",
    mealsPercentsState: {
      inputsData: [],
      inputsStr: "",
    },
  },
  serverQueryProps: {
    allergens: [],
    meals_calories_size_percents: [],
    favorite_foods: [],
    black_list_foods: [],
  },
};
export const createChosenFoodData = (action: PayloadAction<FoodProps[]>) => {
  const foodNameArr: string[] = [];
  const serverFoodsData: FoodProps[] = [];
  action.payload.forEach(({ food_id, food_name }) => {
    foodNameArr.push(food_name);
    serverFoodsData.push({ food_id, food_name });
  });
  return { foodNameArr, serverFoodsData };
};

export const nutritionQuestionnaireFormSlice = createSlice({
  name: "nutritionQuestionnaireFormSlice",
  initialState: nutritionQuestionnaireState,
  reducers: {
    setMealsPercentsArr: setMealsPercentsArrFun,
    resetMealsPercentsArr: resetMealsPercentsArrFun,
    setAllergensArr: setAllergensArrFun,
    resetAllergensArr: resetAllergensArrFun,
    submitFavoriteFoods: submitFavoriteFoodsFun,
    submitBlackListFoods: submitBlackListFoodsFun,
    resetFavoriteFoods: resetFavoriteFoodsFun,
    resetBlackListFoods: resetBlackListFoodsFun,
    resetNutritionQuestionnaireState: resetNutritionQuestionnaireStateFun,
  },
});
export const {
  setMealsPercentsArr,
  setAllergensArr,
  submitFavoriteFoods,
  submitBlackListFoods,
  resetMealsPercentsArr,
  resetAllergensArr,
  resetFavoriteFoods,
  resetBlackListFoods,
  resetNutritionQuestionnaireState,
} = nutritionQuestionnaireFormSlice.actions;

export const getNutritionQuestionnaireFormState = (state: RootState) =>
  state.nutritionQuestionnaireFormSlice;
