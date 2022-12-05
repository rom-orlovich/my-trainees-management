/* eslint-disable no-param-reassign */
import { PayloadAction } from "@reduxjs/toolkit";
import { AllergensCheckbox } from "../../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";
import { AllergensListType } from "../../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/constants";
import { GenericRecord } from "../../../../types";

import {
  ActionSetAllergensByFormKey,
  FilterFoodsFormState,
} from "../nutritionQuestionnaireFormsSliceTypes";

export const setAllergensArrFun = (allergensData: AllergensCheckbox[]) => {
  const allergensNamesArr: AllergensListType[] = [];
  allergensData.forEach((el) => {
    allergensNamesArr.push(el.name);
  });

  return {
    allergensData,
    allergensNamesArr,
    allergensStr: allergensNamesArr.join(","),
  };
};

export const setAllergensArrByFilterForm = <
  T extends GenericRecord<FilterFoodsFormState>
>(
  state: T,
  action: PayloadAction<ActionSetAllergensByFormKey>
) => {
  const { allergensData, allergensNamesArr, allergensStr } = setAllergensArrFun(
    action.payload.allergensData
  );
  state[
    action.payload.formKey
  ].displayInputsForm.allergensCheckboxesState.allergensCheckboxes = allergensData;
  state[
    action.payload.formKey
  ].displayInputsForm.allergensCheckboxesState.allergensStr = allergensStr;
  state[action.payload.formKey].serverQueryProps.allergens = allergensNamesArr;
};
