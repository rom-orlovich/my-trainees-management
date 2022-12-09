/* eslint-disable no-param-reassign */

import { AllergensCheckbox } from "../../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/AllergensForm";
import { AllergensListType } from "../../../../components/Forms/NutritionQuestionnaireForms/AllergensForm/constants";

export const createAllergensData = (allergensData: AllergensCheckbox[]) => {
  const allergensArr: AllergensListType[] = [];
  console.log(allergensData);

  allergensData
    .filter((el) => el?.value)
    .forEach((el) => {
      console.log(el);
      allergensArr.push(el.name);
    });

  return {
    allergensData,
    allergensArr,
    allergensStr: allergensArr.join(","),
  };
};
