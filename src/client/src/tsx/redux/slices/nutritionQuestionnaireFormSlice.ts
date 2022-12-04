import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllergensListType } from "../../components/Forms/NutritionQuestionnaireForms/AllergensForm/constants";

import { RootState } from "../store";

export interface NutritionQuestionnaireFormState {
  mealsPercents: number[];
  mealsPercentsStr: string;
  allergens: AllergensListType[];
  allergensStr: string;
}
const nutritionQuestionnaireState: NutritionQuestionnaireFormState = {
  mealsPercents: [],
  mealsPercentsStr: "",
  allergens: [],
  allergensStr: "",
};

export const setAllergensArrFun = <
  T extends { allergens: AllergensListType[]; allergensStr: string }
>(
  state: T,
  action: PayloadAction<AllergensListType[]>
) => {
  state.allergens = action.payload;
  state.allergensStr = action.payload
    .reduce((pre, cur, i) => (cur ? `${pre}${cur},` : pre), "")
    .slice(0, -1);
};
export const nutritionQuestionnaireFormSlice = createSlice({
  name: "nutritionQuestionnaireFormSlice",
  initialState: nutritionQuestionnaireState,
  reducers: {
    setMealsPercentsArr(state, action: PayloadAction<number[]>) {
      state.mealsPercents = action.payload;
      state.mealsPercentsStr = action.payload
        .reduce((pre, cur, i) => `${pre} Meal ${i + 1} ${cur}%,`, "")
        .slice(0, -1);
    },
    setAllergensArr: setAllergensArrFun,
  },
});
export const { setMealsPercentsArr, setAllergensArr } =
  nutritionQuestionnaireFormSlice.actions;

export const getNutritionQuestionnaireFormState = (state: RootState) =>
  state.nutritionQuestionnaireFormSlice;
