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

  const navigate = useNavigate();
  // const [addItem] = nutritionMenusListApi.useCreateOneItemMutation();
  const dispatch = useAppDispatch();
  // resetGoPrevPagesState disable the behavior of returning to pre page , after submit form.
  // Instead after submit this form the function will move the user to his training program's exercises list.
  useEffect(() => {
    dispatch(disableGoPrevPage());
  }, []);

  const handleSubmit = ({
    nutrition_questionnaire_id,
    ...body
  }: NutritionQuestionnaire) => {
    console.log(body);
  };
  return <NutritionQuestionnaireForm onSubmit={handleSubmit} />;
}