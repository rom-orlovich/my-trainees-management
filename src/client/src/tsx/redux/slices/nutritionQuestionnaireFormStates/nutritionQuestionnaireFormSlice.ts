import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllergensCheckbox } from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";
import { AllergensListType } from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/constants";
import { FoodProps } from "../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsListForm";

import { RootState } from "../../store";
import { DisplayAllergensInputState } from "./nutrtionQuestionnaireFormsSliceTypes";
import { setAllergensArrFun } from "./utilities/helpersFun";

export interface NutritionQuestionnaireFormState {
  displayInputsForm: {
    mealsPercentsStr: string;
    allergenCheckboxState: DisplayAllergensInputState;
    // black_list_foods: number[];
    // favorite_foods: number[];
    favoriteFoodsName: string;
  };
  serverQueryProps: {
    mealsPercents: number[];
    allergensNames: AllergensListType[];
    // black_list_foods: number[];
    favorite_foods: FoodProps[];
  };
}
const nutritionQuestionnaireState: NutritionQuestionnaireFormState = {
  displayInputsForm: {
    allergenCheckboxState: { allergensCheckboxes: [], allergensStr: "" },
    mealsPercentsStr: "",
    favoriteFoodsName: "",
  },
  serverQueryProps: {
    allergensNames: [],
    mealsPercents: [],
    favorite_foods: [],
  },
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
    submitFavoriteFoods(state, action: PayloadAction<FoodProps[]>) {
      const foodNameArr: string[] = [];
      const serverFoodsData: FoodProps[] = [];
      action.payload.forEach(({ food_id, food_name }) => {
        foodNameArr.push(food_name);
        serverFoodsData.push({ food_id, food_name });
      });
      state.displayInputsForm.favoriteFoodsName = foodNameArr.join(",");
      state.serverQueryProps.favorite_foods = serverFoodsData;
    },
  },
});
export const { setMealsPercentsArr, setAllergensArr, submitFavoriteFoods } =
  nutritionQuestionnaireFormSlice.actions;

export const getNutritionQuestionnaireFormState = (state: RootState) =>
  state.nutritionQuestionnaireFormSlice;
