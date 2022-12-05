/* eslint-disable camelcase */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { NutritionQuestionnaire } from "../../../redux/api/interfaceAPI";
import { useAppDispatch } from "../../../redux/hooks";
import { disableGoPrevPage } from "../../../redux/slices/apiSideEffectSlice";

import {} from "../../../redux/slices/formValuesStateSlice";

import { NutritionQuestionnaireForm } from "./NutritionQuestionnaireForm";

export function NutritionQuestionnaireAddForm() {
  const profileID = Number(useParams().id);

  const handleSubmit = ({
    nutrition_questionnaire_id,
    ...body
  }: NutritionQuestionnaire) => {
    console.log(body);
  };
  return <NutritionQuestionnaireForm onSubmit={handleSubmit} />;
}
