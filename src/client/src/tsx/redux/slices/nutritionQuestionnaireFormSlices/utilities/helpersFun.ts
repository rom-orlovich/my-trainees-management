/* eslint-disable no-param-reassign */

import { AllergensCheckbox } from "../../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";
import { AllergensListType } from "../../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/constants";

export const createAllergensData = (allergensData: AllergensCheckbox[]) => {
  const allergensArr: AllergensListType[] = [];
  allergensData.forEach((el) => {
    allergensArr.push(el.name);
  });

  return {
    allergensData,
    allergensArr,
    allergensStr: allergensArr.join(","),
  };
};
