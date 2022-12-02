import { RequestHandler } from "express";
import { deleteQuery } from "../../../PGSql/simpleSqlQueries";
import { addToDate } from "../../../utilities/helpers";
import { TABLES_DATA } from "../../../utilities/tableDataSQL";
import { createLogAlertInfo } from "../../alertsService/handleAlerts";
import { createNutritionMenu } from "../utilities/createNutritionMenu";
import { NutritionQuestionnaire } from "../nutritionMenuServiceTypes";

export const nutritionQuestionnaires: NutritionQuestionnaire = {
  user_id: 2,
  allergens: [],
  black_list_foods: [],
  favorite_foods: [344],
  kosher: true,
  isKeepMeatMilk: true,
  is_vegan: false,
  is_vegetarian: false,
  profile_id: 3,
  day_start: new Date(),
  day_end: addToDate(new Date(), { hPlus: 15 }),
  meals_dist_percents: [30, 50, 20],
  diet_type: "neutral",
};
const NUTRITION_MENU_NAME_DATA = "Nutrition Menu";
export const logAlert = createLogAlertInfo(NUTRITION_MENU_NAME_DATA);

export const handleGenerateNutritionMenu: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const nutritionMenuID = Number(req.params.id);
    await deleteQuery(
      `${TABLES_DATA.MEALS_TABLE_NAME} as m`,
      `using ${TABLES_DATA.NUTRITION_MENUS_MEALS_TABLE_NAME} as nmm
  where m.${TABLES_DATA.MEALS_ID} = nmm.${TABLES_DATA.MEALS_ID} and nmm.${TABLES_DATA.NUTRITION_MENUS_LIST_ID} = $1`,
      [nutritionMenuID]
    );
    const nutritionMenuRes = await createNutritionMenu(
      nutritionMenuID,
      nutritionQuestionnaires
    );
    // console.log(nutritionMenuRes);
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
