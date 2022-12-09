/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { FilterFormsState } from "./nutritionQuestionnaireFormsSliceTypes";

import {
  resetAllergensFoodsByFormFun,
  resetFilterFoodsByFormFun,
  setAllergensDataByFormFun,
  setNutrientsValuesByFormFun,
  submitFilterFoodsByFormFun,
} from "./utilities/helpersFilterFoodFormSlice";

export const initialFilterFoodsFormState: FilterFormsState = {
  favoriteFoodsFilterForm: {
    displayInputsForm: {
      allergensCheckboxesState: {
        inputsData: [],
        inputsStr: "",
      },
      nutrientsValuesInputsState: {
        inputsStr: "",
        inputsData: [],
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
        inputsData: [],
        inputsStr: "",
      },
      nutrientsValuesInputsState: {
        inputsData: [],
        inputsStr: "",
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

    resetAllergenForm: resetAllergensFoodsByFormFun,
    resetFormFiltersForm: resetFilterFoodsByFormFun,
  },
});
export const {
  setNutrientsValuesQueryParams,
  setAllergenDataByForm,
  submitFilterFoodsForm,
  resetAllergenForm,
  resetFormFiltersForm,
} = filterFoodsFormSlice.actions;

export const getFilterFoodsFormState = (state: RootState) =>
  state.filterFoodsFormSlice;
