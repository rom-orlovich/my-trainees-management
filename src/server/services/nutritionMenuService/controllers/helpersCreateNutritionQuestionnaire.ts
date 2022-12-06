/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */

import { RequestHandler } from "express";

import { OmitKey } from "../../../utilities/types";
import { createLogAlertInfo } from "../../alertsService/handleAlerts";

import { NutritionQuestionnaire } from "../nutritionMenuServiceTypes";
import { createNutritionQuestionnaire } from "../utilities/helpersCreateNutritionQuestionnaire";

export type NutritionQuestionnaireInsert = OmitKey<
  NutritionQuestionnaire,
  "favorite_foods" | "black_list_foods"
> & { favorite_foods: string; black_list_foods: string };

export const nutritionQuestionnaireLogAlert = createLogAlertInfo(
  "createNutritionQuestionnaire"
);
export const handleCreateNutritionQuestionnaire: RequestHandler = async (
  req,
  res,
  next
) => {
  const nutritionQuestionnaireClient = req.body as NutritionQuestionnaire;
  try {
    const insertNutritionQuestionnaireRes = await createNutritionQuestionnaire(
      nutritionQuestionnaireClient
    );
    const updateOrCreate =
      nutritionQuestionnaireClient.nutrition_questionnaire_id
        ? "update"
        : "create";

    if (insertNutritionQuestionnaireRes)
      req.logAlertInfo = nutritionQuestionnaireLogAlert(
        {
          data: insertNutritionQuestionnaireRes,

          message: `Nutrition questionnaire was ${updateOrCreate}d successfully`,
        },
        undefined,
        updateOrCreate,
        true
      );
  } catch (error) {
    req.logAlertInfo = nutritionQuestionnaireLogAlert(
      undefined,
      error as Error,
      "create",
      true
    );
  }
  return next();
};
