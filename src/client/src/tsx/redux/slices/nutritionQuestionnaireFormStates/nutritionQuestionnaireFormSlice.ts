import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllergensCheckbox } from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";
import { AllergensListType } from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/constants";

import { RootState } from "../../store";
import { DisplayAllergensInputState } from "./nutrtionQuestionnaireFormsSliceTypes";
import { setAllergensArrFun } from "./utilities/helpersFun";

export interface NutritionQuestionnaireFormState {
  displayInputsForm: {
    mealsPercentsStr: string;
    allergenCheckboxState: DisplayAllergensInputState;
    // black_list_foods: number[];
    // favorite_foods: number[];
  };
  serverQueryProps: {
    mealsPercents: number[];
    allergensNames: AllergensListType[];
    // black_list_foods: number[];
    // favorite_foods: number[];
  };
}
const nutritionQuestionnaireState: NutritionQuestionnaireFormState = {
  displayInputsForm: {
    allergenCheckboxState: { allergensCheckboxes: [], allergensStr: "" },
    mealsPercentsStr: "",
  },
  serverQueryProps: { allergensNames: [], mealsPercents: [] },
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
      const { allergensCheckboxes, allergensNamesArr, allergensStr } =
        setAllergensArrFun(action);
      state.displayInputsForm.allergenCheckboxState.allergensCheckboxes =
        allergensCheckboxes;
      state.displayInputsForm.allergenCheckboxState.allergensStr = allergensStr;
      state.serverQueryProps.allergensNames = allergensNamesArr;
    },
  },
});
export const { setMealsPercentsArr, setAllergensArr } =
  nutritionQuestionnaireFormSlice.actions;

export const getNutritionQuestionnaireFormState = (state: RootState) =>
  state.nutritionQuestionnaireFormSlice;
