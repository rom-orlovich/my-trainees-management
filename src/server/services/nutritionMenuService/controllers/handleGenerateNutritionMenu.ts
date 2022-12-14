import { RequestHandler } from "express";
import { deleteQuery } from "../../../PGSql/simpleSqlQueries";

import { TABLES_DATA } from "../../../utilities/tableDataSQL";
import { createLogAlertInfo } from "../../alertsService/handleAlerts";
import { createNutritionMenu } from "../utilities/createNutritionMenu";
import { getLastMeasureByProfileID } from "../utilities/helpersCreateNutritionMenu";

import { getNutritionQuestionnaire } from "../utilities/helpersDBNutritionMenu";

const NUTRITION_MENU_NAME_DATA = "Nutrition Menu";
export const logAlert = createLogAlertInfo(NUTRITION_MENU_NAME_DATA);

export const handleGenerateNutritionMenu: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const nutritionMenuID = Number(req.params.id);
    const profileID = Number(req.query.profileID);
    const nutritionQuestionnaireRes = await getNutritionQuestionnaire(
      profileID
    );

    if (!nutritionQuestionnaireRes) {
      req.logAlertInfo = logAlert(
        undefined,
        {
          message: `The Nutrition questionnaire is missing. Please Create One.`,
        },
        "get",
        true
      );
      return next();
    }

    const lastMeasure = await getLastMeasureByProfileID(profileID);

    if (!lastMeasure) {
      req.logAlertInfo = logAlert(
        undefined,
        {
          message: `No measure was found. please add one.`,
        },
        "get",
        true
      );
      return next();
    }

    await deleteQuery(
      `${TABLES_DATA.MEALS_TABLE_NAME} as m`,
      `using ${TABLES_DATA.NUTRITION_MENUS_MEALS_TABLE_NAME} as nmm
  where m.${TABLES_DATA.MEALS_ID} = nmm.${TABLES_DATA.MEALS_ID} and nmm.${TABLES_DATA.NUTRITION_MENUS_LIST_ID} = $1`,
      [nutritionMenuID]
    );

    const nutritionMenuRes = await createNutritionMenu(
      nutritionMenuID,
      nutritionQuestionnaireRes,
      lastMeasure
    );

    if (nutritionMenuRes)
      req.logAlertInfo = logAlert(
        {
          data: nutritionMenuRes,
          sendDataID: true,
        },
        undefined,
        "create",
        true
      );
    else {
      req.logAlertInfo = logAlert(
        undefined,
        { message: `The ${NUTRITION_MENU_NAME_DATA} creation was failed.` },
        "create",
        true
      );
    }
  } catch (error) {
    req.logAlertInfo = logAlert(
      undefined,
      { message: `The ${NUTRITION_MENU_NAME_DATA} creation was failed.` },
      "create",
      true
    );
  }
  return next();
};
