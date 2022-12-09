/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllergensCheckbox } from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";

import { FoodProps } from "../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsListForm";
import { MealsCaloriesSize } from "../../../components/Forms/NutritionQuestionnaireForms/NutritionQuestionnaireFormComponents/MealsCaloriesSizeForms/MealsCaloriesSizeForm";

import { RootState } from "../../store";
import { NutritionQuestionnaireFormState } from "./nutritionQuestionnaireFormsSliceTypes";
import { createAllergensData } from "./utilities/helpersFun";
import {
  resetAllergensArrFun,
  resetMealsPercentsArrFun,
  setAllergensArrFun,
  setMealsPercentsArrFun,
  submitBlackListFoodsFun,
  submitFavoriteFoodsFun,
} from "./utilities/helpersNutritionQuestionnaire";

const nutritionQuestionnaireState: NutritionQuestionnaireFormState = {
  displayInputsForm: {
    allergenCheckboxState: { inputsData: [], inputsStr: "" },

    favoriteFoodsName: "",
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
  },
});
export const {
  setMealsPercentsArr,
  setAllergensArr,
  submitFavoriteFoods,
  submitBlackListFoods,
  resetMealsPercentsArr,
  resetAllergensArr,
} = nutritionQuestionnaireFormSlice.actions;

export const getNutritionQuestionnaireFormState = (state: RootState) =>
  state.nutritionQuestionnaireFormSlice;
