/* eslint-disable camelcase */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  nutritionMenuApi,
  nutritionQuestionnaireApi,
} from "../../../redux/api/hooksAPI";

import { NutritionQuestionnaire } from "../../../redux/api/interfaceAPI";
import { useAppSelector } from "../../../redux/hooks";

import {} from "../../../redux/slices/formValuesStateSlice";
import { getNutritionQuestionnaireFormState } from "../../../redux/slices/nutritionQuestionnaireFormSlices/nutritionQuestionnaireFormSlice";
import { addFunction } from "../../baseComponents/RHF-Components/FormsHook";

import { NutritionQuestionnaireForm } from "./NutritionQuestionnaireForm";

export function NutritionQuestionnaireAddForm() {
  const profileID = Number(useParams().id);
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
