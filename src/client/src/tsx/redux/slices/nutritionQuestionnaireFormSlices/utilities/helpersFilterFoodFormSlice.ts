/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { AllergensCheckbox } from "../../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";
import { NutrientValuesPartial } from "../../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsFilterForm/NutrientsValuesForms/NutrientsValuesForm";
import { initialFilterFoodsFormState } from "../filterFoodsFormSlice";
import {
  ActionByFormKey,
  FilterFormsState,
  NutrientFormRules,
  NutrientValuesForQuery,
} from "../nutritionQuestionnaireFormsSliceTypes";
import { createAllergensData } from "./helpersFun";

export const createNutrientValuesData = (data: NutrientValuesPartial[]) => {
  const nutrientsValuesQueryParams = {} as NutrientValuesForQuery;
  const nutrientsValuesArr: string[] = [];
  data.forEach((el) => {
    if (!el?.nutrientName) return;
    if (el.lt && el.lt > 0)
      nutrientsValuesQueryParams[`${el.nutrientName}_lt`] = Number(el.lt);
    if (el.gt && el.gt > 0)
      nutrientsValuesQueryParams[`${el.nutrientName}_gt`] = Number(el.gt);
    nutrientsValuesArr.push(` ${el.gt} < ${el.nutrientName} < ${el.lt}`);
  });
  const nutrientsValuesStr = nutrientsValuesArr.join(",");

  return {
    nutrientsValuesStr,
    nutrientsValuesQueryParams,
    curNutrientsValues: data,
  };
};

export const setAllergensDataByFormFun = (
  state: FilterFormsState,
  { payload: { data, formKey } }: ActionByFormKey<AllergensCheckbox[]>
) => {
  if (!data) return;
  if (!state[formKey]) return;
  const { allergensData, allergensArr, allergensStr } =
    createAllergensData(data);
  state[formKey].displayInputsForm.allergensCheckboxesState.inputsData =
    allergensData;
  state[formKey].displayInputsForm.allergensCheckboxesState.inputsStr =
    allergensStr;
  state[formKey].serverQueryProps.allergens = allergensArr;
};

export const setNutrientsValuesByFormFun = (
  state: FilterFormsState,
  { payload: { data, formKey } }: ActionByFormKey<NutrientValuesPartial[]>
) => {
  if (!data) return;
  if (!state[formKey]) return;
  const { curNutrientsValues, nutrientsValuesQueryParams, nutrientsValuesStr } =
    createNutrientValuesData(data);

  state[formKey].serverQueryProps.nutrientsValuesQueryParams =
    nutrientsValuesQueryParams;
  state[formKey].displayInputsForm.nutrientsValuesInputsState.inputsStr =
    nutrientsValuesStr;

  state[formKey].displayInputsForm.nutrientsValuesInputsState.inputsData =
    curNutrientsValues;
};

export const submitFilterFoodsByFormFun = (
  state: FilterFormsState,
  { payload: { data, formKey } }: ActionByFormKey<NutrientFormRules>
) => {
  if (!data) return;
  if (!state[formKey]) return;
  const { kosher_type, nutrient_type, is_vegan, is_vegetarian, kosher } = data;
  const kosherType = kosher_type === "all" ? {} : { kosher_type };
  const nutrientType = nutrient_type === "all" ? {} : { nutrient_type };
  const isVegan = is_vegan ? { is_vegan } : {};
  const isVegetarian = is_vegetarian ? { is_vegetarian } : {};
  const isKosher = kosher ? { kosher } : {};

  state[formKey].serverQueryProps = {
    ...state.favoriteFoodsFilterForm.serverQueryProps,
    ...isVegan,
    ...isVegetarian,
    ...isKosher,
    ...kosherType,
    ...nutrientType,
  };
};

export const resetFilterFoodsByFormFun = (
  state: FilterFormsState,
  { payload: { formKey } }: ActionByFormKey<NutrientFormRules>
) => {
  if (!state[formKey]) return;
  state[formKey] = initialFilterFoodsFormState[formKey];
};
export const resetAllergensFoodsByFormFun = (
  state: FilterFormsState,
  { payload: { formKey } }: ActionByFormKey<NutrientFormRules>
) => {
  if (!state[formKey]) return;
  state[formKey].displayInputsForm.allergensCheckboxesState =
    initialFilterFoodsFormState[
      formKey
    ].displayInputsForm.allergensCheckboxesState;
  state[formKey].serverQueryProps.allergens =
    initialFilterFoodsFormState[formKey].serverQueryProps.allergens;
};
