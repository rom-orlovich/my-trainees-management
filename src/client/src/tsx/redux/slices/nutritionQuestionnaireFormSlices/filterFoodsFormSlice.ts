/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { CHECKBOX_ALLERGENS } from "./nutritionQuestionnaireFormSlice";
import { FilterFormsState } from "./nutritionQuestionnaireFormsSliceTypes";

import {
  resetAllergensFoodsByFormFun,
  resetFilterFoodsByFormFun,
  resetNutrientsValuesByFormFun,
  setAllergensDataByFormFun,
  setNutrientsValuesByFormFun,
  submitFilterFoodsByFormFun,
} from "./utilities/helpersFilterFoodFormSlice";

export const initialFilterFoodsFormState: FilterFormsState = {
  favoriteFoodsFilterForm: {
    displayInputsForm: {
      allergensCheckboxesState: {
        inputsData: CHECKBOX_ALLERGENS,
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
        inputsData: CHECKBOX_ALLERGENS,
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
    resetNutrientsValuesQueryParams: resetNutrientsValuesByFormFun,
  },
});
export const {
  setNutrientsValuesQueryParams,
  setAllergenDataByForm,
  submitFilterFoodsForm,
  resetAllergenForm,
  resetFormFiltersForm,
  resetNutrientsValuesQueryParams,
} = filterFoodsFormSlice.actions;

export const getFilterFoodsFormState = (state: RootState) =>
  state.filterFoodsFormSlice;
