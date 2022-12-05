/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllergensCheckbox } from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";

import { FoodProps } from "../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsListForm";

import { RootState } from "../../store";
import { NutritionQuestionnaireFormState } from "./nutritionQuestionnaireFormsSliceTypes";
import { createAllergensData } from "./utilities/helpersFun";

const nutritionQuestionnaireState: NutritionQuestionnaireFormState = {
  displayInputsForm: {
    allergenCheckboxState: { allergensCheckboxes: [], allergensStr: "" },
    mealsPercentsStr: "",
    favoriteFoodsName: "",
    blackListFoodsNames: "",
  },
  serverQueryProps: {
    allergensNames: [],
    mealsPercents: [],
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
    setMealsPercentsArr(state, action: PayloadAction<number[]>) {
      state.serverQueryProps.mealsPercents = action.payload;
      state.displayInputsForm.mealsPercentsStr = action.payload
        .reduce((pre, cur, i) => `${pre} Meal ${i + 1} ${cur}%,`, "")
        .slice(0, -1);
    },
    setAllergensArr: (state, action: PayloadAction<AllergensCheckbox[]>) => {
      const { allergensData, allergensNamesArr, allergensStr } =
        createAllergensData(action.payload);
      state.displayInputsForm.allergenCheckboxState.allergensCheckboxes =
        allergensData;
      state.displayInputsForm.allergenCheckboxState.allergensStr = allergensStr;
      state.serverQueryProps.allergensNames = allergensNamesArr;
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
} = nutritionQuestionnaireFormSlice.actions;

export const getNutritionQuestionnaireFormState = (state: RootState) =>
  state.nutritionQuestionnaireFormSlice;
