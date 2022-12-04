/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AllergensCheckbox } from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";

import { NutrientValuesPartial } from "../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsFilterForm/NutrientsValuesForms/NutrientsValuesForm";

import { RootState } from "../../store";

import {
  FilterFormsState,
  NutrientFormRules,
  NutrientValuesForQuery,
} from "./nutrtionQuestionnaireFormsSliceTypes";
import { setAllergensArrByFilterForm } from "./utilities/helpersFun";

const filterFoodsFormState: FilterFormsState = {
  favoriteFoodFilterForm: {
    displayInputsForm: {
      allergensCheckboxesState: {
        allergensCheckboxes: [],
        allergensStr: "",
      },
      nutrientsValuesInputsState: {
        nutrientsValuesStr: "",
        curNutrientsValuesInputs: [],
      },
    },
    serverQueryProps: {
      nutrientsValuesQueryParams: {},
      allergens: [],
    },
  },
};

export const filterFoodsFormSlice = createSlice({
  name: "filterFoodsFormSlice",
  initialState: filterFoodsFormState,
  reducers: {
    setNutrientsValuesQueryParams(
      { favoriteFoodFilterForm: { displayInputsForm, serverQueryProps } },
      action: PayloadAction<NutrientValuesPartial[]>
    ) {
      if (!action.payload) return;
      const nutrientsValuesQueryParams = {} as NutrientValuesForQuery;
      const nutrientsValuesArr: string[] = [];
      action.payload.forEach((el) => {
        if (!el?.nutrientName) return;
        if (el.lt && el.lt > 0)
          nutrientsValuesQueryParams[`${el.nutrientName}_lt`] = Number(el.lt);
        if (el.gt && el.gt > 0)
          nutrientsValuesQueryParams[`${el.nutrientName}_gt`] = Number(el.gt);
        nutrientsValuesArr.push(` ${el.gt} < ${el.nutrientName} < ${el.lt}`);
      });
      const nutrientsValuesStr = nutrientsValuesArr.join(",");

      displayInputsForm.nutrientsValuesInputsState.nutrientsValuesStr =
        nutrientsValuesStr;
      displayInputsForm.nutrientsValuesInputsState.curNutrientsValuesInputs =
        action.payload;
      serverQueryProps.nutrientsValuesQueryParams = nutrientsValuesQueryParams;
    },

    setAllergensArr: (state, action: PayloadAction<AllergensCheckbox[]>) =>
      setAllergensArrByFilterForm(state, "favoriteFoodFilterForm", action),
    submitFormFilterFoodForm: (
      state,
      {
        payload: {
          kosher_type,
          nutrient_type,
          is_vegan,
          is_vegetarian,
          kosher,
        },
      }: PayloadAction<NutrientFormRules>
    ) => {
      const kosherType = kosher_type === "all" ? {} : { kosher_type };
      const nutrientType = nutrient_type === "all" ? {} : { nutrient_type };
      const isVegan = is_vegan ? { is_vegan } : {};
      const isVegetarian = is_vegetarian ? { is_vegetarian } : {};
      const isKosher = kosher ? { kosher } : {};

      state.favoriteFoodFilterForm.serverQueryProps = {
        ...state.favoriteFoodFilterForm.serverQueryProps,
        ...isVegan,
        ...isVegetarian,
        ...isKosher,
        ...kosherType,
        ...nutrientType,
      };
    },
    resetFormFilters: (state, action: PayloadAction<{ formName?: string }>) => {
      state.favoriteFoodFilterForm =
        filterFoodsFormState.favoriteFoodFilterForm;
    },
  },
});
export const {
  setNutrientsValuesQueryParams,
  setAllergensArr,
  submitFormFilterFoodForm,
  resetFormFilters,
} = filterFoodsFormSlice.actions;

export const getFilterFoodsFormState = (state: RootState) =>
  state.filterFoodsFormSlice;
