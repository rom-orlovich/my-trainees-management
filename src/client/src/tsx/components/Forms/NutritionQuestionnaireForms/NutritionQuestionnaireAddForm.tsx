/* eslint-disable camelcase */

import { nutritionQuestionnaireApi } from "../../../redux/api/hooksAPI";

import { NutritionQuestionnaire } from "../../../redux/api/interfaceAPI";
import { useAppSelector } from "../../../redux/hooks";

import { getNutritionQuestionnaireFormState } from "../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";

import { NutritionQuestionnaireForm } from "./NutritionQuestionnaireForm";

export function NutritionQuestionnaireAddForm() {
  const { serverQueryProps } = useAppSelector(
    getNutritionQuestionnaireFormState
  );

  const [createNutritionQuestionnaire] =
    nutritionQuestionnaireApi.useCreateOneItemMutation();
  const handleSubmit = (body: NutritionQuestionnaire) => {
    addFunction({ addItem: createNutritionQuestionnaire })({
      ...body,
      ...serverQueryProps,
    });
  };
  return <NutritionQuestionnaireForm onSubmit={handleSubmit} />;
}
