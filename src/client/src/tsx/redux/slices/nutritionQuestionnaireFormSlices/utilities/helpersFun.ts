/* eslint-disable no-param-reassign */

import { AllergensCheckbox } from "../../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";
import { AllergensListType } from "../../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/constants";

export const createAllergensData = (allergensData: AllergensCheckbox[]) => {
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
