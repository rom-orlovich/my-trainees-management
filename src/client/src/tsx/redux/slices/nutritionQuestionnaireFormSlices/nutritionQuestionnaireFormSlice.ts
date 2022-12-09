/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllergensCheckbox } from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";

import { FoodProps } from "../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsListForm";
import { MealsCaloriesSize } from "../../../components/Forms/NutritionQuestionnaireForms/NutritionQuestionnaireFormComponents/MealsCaloriesSizeForms/MealsCaloriesSizeForm";

import { RootState } from "../../store";
import { NutritionQuestionnaireFormState } from "./nutritionQuestionnaireFormsSliceTypes";
import { createAllergensData } from "./utilities/helpersFun";

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
    setMealsPercentsArr(state, action: PayloadAction<MealsCaloriesSize[]>) {
      state.displayInputsForm.mealsPercentsState.inputsStr = action.payload
        .reduce((pre, cur, i) => `${pre} Meal ${i + 1} ${cur.percents}%,`, "")
        .slice(0, -1);
      state.displayInputsForm.mealsPercentsState.inputsData = action.payload;
      state.serverQueryProps.meals_calories_size_percents = action.payload.map(
        (el) => el.percents
      );
    },
    resetMealsPercentsArr: (state) => {
      state.displayInputsForm.mealsPercentsState.inputsData = [];
      state.displayInputsForm.mealsPercentsState.inputsStr = "";
      state.serverQueryProps.meals_calories_size_percents = [];
    },

    setAllergensArr: (state, action: PayloadAction<AllergensCheckbox[]>) => {
      const { allergensData, allergensArr, allergensStr } = createAllergensData(
        action.payload
      );
      state.displayInputsForm.allergenCheckboxState.inputsData = allergensData;
      state.displayInputsForm.allergenCheckboxState.inputsStr = allergensStr;
      state.serverQueryProps.allergens = allergensArr;
    },
    resetAllergensArr: (state) => {
      state.displayInputsForm.allergenCheckboxState.inputsData = [];
      state.displayInputsForm.allergenCheckboxState.inputsStr = "";
      state.serverQueryProps.allergens = [];
    },
    submitFavoriteFoods(state, action: PayloadAction<FoodProps[]>) {
      const { foodNameArr, serverFoodsData } = createChosenFoodData(action);
      state.displayInputsForm.favoriteFoodsName = foodNameArr.join(",");
      state.serverQueryProps.favorite_foods = serverFoodsData;
    },
    submitBlackListFoods(state, action: PayloadAction<FoodProps[]>) {
      const { foodNameArr, serverFoodsData } = createChosenFoodData(action);
      state.displayInputsForm.blackListFoodsNames = foodNameArr.join(",");
      state.serverQueryProps.black_list_foods = serverFoodsData;
    },
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
