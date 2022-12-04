import { PayloadAction } from "@reduxjs/toolkit";
import { AllergensCheckbox } from "../../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";
import { AllergensListType } from "../../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/constants";
import { GenericRecord } from "../../../../types";
import { FilterFoodsFormState } from "../nutrtionQuestionnaireFormsSliceTypes";

export const setAllergensArrFun = (
  action: PayloadAction<AllergensCheckbox[]>
) => {
  const allergensNamesArr: AllergensListType[] = [];
  action.payload.forEach((el) => {
    allergensNamesArr.push(el.name);
  });

  return {
    allergensCheckboxes: action.payload,
    allergensNamesArr,
    allergensStr: allergensNamesArr.join(","),
  };
};

export const setAllergensArrByFilterForm = <
  T extends GenericRecord<FilterFoodsFormState>
>(
  state: T,
  key: keyof T,
  action: PayloadAction<AllergensCheckbox[]>
) => {
  const { allergensCheckboxes, allergensNamesArr, allergensStr } =
    setAllergensArrFun(action);
  state[key].displayInputsForm.allergensCheckboxesState.allergensCheckboxes =
    allergensCheckboxes;
  state[key].displayInputsForm.allergensCheckboxesState.allergensStr =
    allergensStr;
  state[key].serverQueryProps.allergens = allergensNamesArr;
};
