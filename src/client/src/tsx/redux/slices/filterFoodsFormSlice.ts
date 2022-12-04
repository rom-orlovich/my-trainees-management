import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllergensListType } from "../../components/Forms/NutritionQuestionnaireForms/AllergensForm/constants";

import { NutrientsNamesFields } from "../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsFilterForm/FoodsFilterForm";
import { NutrientValuesPartial } from "../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsFilterForm/NutrientsValuesForms/NutrientsValuesForm";
import { KosherType, NutrientsTypes } from "../api/interfaceAPI";

import { RootState } from "../store";
import { setAllergensArrFun } from "./nutritionQuestionnaireFormSlice";

export type NutrientValuesGenericCompare =
  | `${NutrientsNamesFields}_lt`
  | `${NutrientsNamesFields}_gt`;

export type NutrientValuesForQuery = {
  [key in NutrientValuesGenericCompare]: number;
};
export interface FilterFoodsFormState {
  nutrientsValuesQueryParams: Partial<NutrientValuesForQuery>;
  allergens: AllergensListType[];
  allergensStr: string;
  nutrientsValuesStr: string;
  nutrient_type: NutrientsTypes | "all";
  kosher_type: KosherType | "all";
  kosher: boolean;
  is_vegan: boolean;
  is_vegetarian: boolean;
}
const filterFoodsFormState: FilterFoodsFormState = {
  allergens: [],
  allergensStr: "",
  nutrientsValuesQueryParams: {},
  nutrientsValuesStr: "",
  nutrient_type: "all",
  kosher_type: "all",
  kosher: false,
  is_vegan: false,
  is_vegetarian: false,
};
export const filterFoodsFormSlice = createSlice({
  name: "filterFoodsFormSlice",
  initialState: filterFoodsFormState,
  reducers: {
    setNutrientsValuesQueryParams(
      state,
      action: PayloadAction<NutrientValuesPartial[]>
    ) {
      if (!action.payload) return;
      const nutrientValues = action.payload.reduce((pre, cur) => {
        if (!cur?.nutrientName) return pre;
        if (cur.lt && cur.lt > 0) pre[`${cur.nutrientName}_lt`] = cur.lt;
        if (cur.gt && cur.gt > 0) pre[`${cur.nutrientName}_gt`] = cur.gt;

        return pre;
      }, {} as NutrientValuesForQuery);
      state.nutrientsValuesQueryParams = nutrientValues;
      state.nutrientsValuesStr = action.payload
        .reduce(
          (pre, cur) => `${pre} ${cur.gt} < ${cur.nutrientName} < ${cur.lt},`,
          ""
        )
        .slice(0, -1);
    },
    setAllergensArr: setAllergensArrFun,
    submitFormFilterFoodForm: (
      state,
      action: PayloadAction<{
        nutrient_type: NutrientsTypes | "all";
        kosher_type: KosherType | "all";
        kosher: boolean;
        is_vegan: boolean;
        is_vegetarian: boolean;
      }>
    ) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});
export const {
  setNutrientsValuesQueryParams,
  setAllergensArr,
  submitFormFilterFoodForm,
} = filterFoodsFormSlice.actions;

export const getFilterFoodsFormState = (state: RootState) =>
  state.filterFoodsFormSlice;
