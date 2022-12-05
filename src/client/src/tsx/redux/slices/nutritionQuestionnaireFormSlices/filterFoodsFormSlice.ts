/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { FilterFormsState } from "./nutritionQuestionnaireFormsSliceTypes";

import {
  resetFilterFoodsByFormFun,
  setAllergensDataByFormFun,
  setNutrientsValuesByFormFun,
  submitFilterFoodsByFormFun,
} from "./utilities/helpersFilterFoodFormSlice";

export const initialFilterFoodsFormState: FilterFormsState = {
  favoriteFoodsFilterForm: {
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
  blackListFoodsFilterForm: {
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
  initialState: initialFilterFoodsFormState,
  reducers: {
    setNutrientsValuesQueryParams: setNutrientsValuesByFormFun,

    setAllergenDataByForm: setAllergensDataByFormFun,

    submitFilterFoodsForm: submitFilterFoodsByFormFun,

    resetFormFiltersForm: resetFilterFoodsByFormFun,
  },
});
export const {
  setNutrientsValuesQueryParams,
  setAllergenDataByForm,
  submitFilterFoodsForm,
  resetFormFiltersForm,
} = filterFoodsFormSlice.actions;

export const getFilterFoodsFormState = (state: RootState) =>
  state.filterFoodsFormSlice;
