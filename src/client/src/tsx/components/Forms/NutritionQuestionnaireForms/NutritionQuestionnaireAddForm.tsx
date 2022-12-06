/* eslint-disable camelcase */

import { nutritionQuestionnaireApi } from "../../../redux/api/hooksAPI";

import { NutritionQuestionnaire } from "../../../redux/api/interfaceAPI";
import { useAppSelector } from "../../../redux/hooks";

import { getNutritionQuestionnaireFormState } from "../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";

import { NutritionQuestionnaireForm } from "./NutritionQuestionnaireForm";

export function NutritionQuestionnaireAddForm() {
  const { displayInputsForm, serverQueryProps } = useAppSelector(
    getNutritionQuestionnaireFormState
  );

  const [createNutritionQuestionnaire] =
    nutritionQuestionnaireApi.useCreateOneItemMutation();
  const handleSubmit = ({
    nutrition_questionnaire_id,
    ...body
  }: NutritionQuestionnaire) => {
    console.log(serverQueryProps);
    addFunction({ addItem: createNutritionQuestionnaire })({
      ...body,
      ...serverQueryProps,
    });
  };
  return <NutritionQuestionnaireForm onSubmit={handleSubmit} />;
}
