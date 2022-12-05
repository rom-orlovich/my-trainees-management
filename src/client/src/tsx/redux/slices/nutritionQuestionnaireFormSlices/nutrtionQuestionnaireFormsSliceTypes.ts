/* eslint-disable no-unused-vars */
import { AllergensCheckbox } from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";
import { AllergensListType } from "../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/constants";
import { NutrientsNamesFields } from "../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsFilterForm/FoodsFilterForm";
import { NutrientValuesInputs } from "../../../components/Forms/NutritionQuestionnaireForms/FoodListForms/FoodsFilterForm/NutrientsValuesForms/NutrientsValuesForm";
import { PickKey } from "../../../types";
import { KosherType, NutrientsTypes } from "../../api/interfaceAPI";

export type NutrientValuesGenericCompare =
  | `${NutrientsNamesFields}_lt`
  | `${NutrientsNamesFields}_gt`;

export type NutrientValuesForQuery = {
  [key in NutrientValuesGenericCompare]: number;
};
export interface DisplayAllergensInputState {
  allergensStr: string;
  allergensCheckboxes: AllergensCheckbox[];
}
export interface DisplayNutrientsValuesInputState {
  nutrientsValuesStr: string;
  curNutrientsValuesInputs: Partial<NutrientValuesInputs>[];
}
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
export type SetAllerganState = PickKey<
  ServerFilterFormQueryProps,
  "allergens"
> &
  PickKey<DisplayFilterInputsForm, "allergensCheckboxesState">;

export interface FilterFormsState {
  favoriteFoodFilterForm: FilterFoodsFormState;
}
