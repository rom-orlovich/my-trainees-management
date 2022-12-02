import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllergensListType } from "../../components/baseComponents/RHF-Components/formsSchemas";

import { RootState } from "../store";

export interface NutritionQuestionnaireState {
  mealsPercents: number[];
  allergens: AllergensListType[];
}
const nutritionQuestionnaireState: NutritionQuestionnaireState = {
  mealsPercents: [],
  allergens: [],
};
export const nutritionQuestionnaireSlice = createSlice({
  name: "nutritionQuestionnaireSlice",
  initialState: nutritionQuestionnaireState,
  reducers: {
    setMealsPercentsArr(state, action: PayloadAction<number[]>) {
      state.mealsPercents = action.payload;
    },
    setAllergensArr(state, action: PayloadAction<AllergensListType[]>) {
      state.allergens = action.payload;
    },
  },
});
export const { setMealsPercentsArr, setAllergensArr } =
  nutritionQuestionnaireSlice.actions;

export const getNutritionQuestionnaireState = (state: RootState) =>
  state.nutritionQuestionnaireSlice;
