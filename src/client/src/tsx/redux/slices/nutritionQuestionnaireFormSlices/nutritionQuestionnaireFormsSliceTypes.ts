/* eslint-disable no-unused-vars */
import { PayloadAction } from "@reduxjs/toolkit";
import { AllergensCheckbox } from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";
import { AllergensListType } from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/constants";
import { NutrientsNamesFields } from "../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsFilterForm/FoodsFilterForm";
import { NutrientValuesInputs } from "../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsFilterForm/NutrientsValuesForms/NutrientsValuesForm";
import { FoodProps } from "../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsListForm";
import { MealsCaloriesSize } from "../../../components/Forms/NutritionQuestionnaireForms/NutritionQuestionnaireFormComponents/MealsCaloriesSizeForms/MealsCaloriesSizeForm";
import { PickKey } from "../../../types";
import { KosherType, NutrientsTypes } from "../../api/interfaceAPI";

export type NutrientValuesGenericCompare =
  | `${NutrientsNamesFields}_lt`
  | `${NutrientsNamesFields}_gt`;

export type NutrientValuesForQuery = {
  [key in NutrientValuesGenericCompare]: number;
};
export interface InputsDataAndString<T> {
  inputsStr: string;
  inputsData: T;
}

export type DisplayAllergensInputState = InputsDataAndString<
  AllergensCheckbox[]
>;
export type DisplayNutrientsValuesInputState = InputsDataAndString<
  Partial<NutrientValuesInputs>[]
>;

export interface DisplayFilterInputsForm {
  allergensCheckboxesState: DisplayAllergensInputState;
  nutrientsValuesInputsState: DisplayNutrientsValuesInputState;
}
export type NutrientFormRules = {
  nutrient_type?: NutrientsTypes | "all";
  kosher_type?: KosherType | "all";
  kosher?: boolean;
  is_vegan?: boolean;
  is_vegetarian?: boolean;
};
export type ServerFilterFormQueryProps = {
  allergens: AllergensListType[];
  nutrientsValuesQueryParams: Partial<NutrientValuesForQuery>;
} & NutrientFormRules;

export interface FilterFoodsFormState {
  displayInputsForm: DisplayFilterInputsForm;
  serverQueryProps: ServerFilterFormQueryProps;
}

export interface FilterFormsState {
  favoriteFoodsFilterForm: FilterFoodsFormState;
  blackListFoodsFilterForm: FilterFoodsFormState;
}
export interface PayloadByFormKey<T> {
  data?: T;
  formKey: keyof FilterFormsState;
}
export type ActionByFormKey<T> = PayloadAction<PayloadByFormKey<T>>;

export type DisplayMealsPercentsInputState = InputsDataAndString<
  MealsCaloriesSize[]
>;
export interface NutritionQuestionnaireFormState {
  displayInputsForm: {
    allergenCheckboxState: DisplayAllergensInputState;
    mealsPercentsState: DisplayMealsPercentsInputState;
    blackListFoodsNames: string;
    favoriteFoodsName: string;
  };
  serverQueryProps: {
    meals_calories_size_percents: number[];
    allergensNames: AllergensListType[];
    black_list_foods: FoodProps[];
    favorite_foods: FoodProps[];
  };
}
