import { RequestHandler } from "express";
import { newDate } from "../../utilities/helpers";
import { createLogAlertInfo } from "../alertsService/handleAlerts";
import { createNutritionMenu } from "./createNutritionMenu";
import { NutritionQuestionnaire } from "./nutritionMenuServiceTypes";

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
  day_end: newDate(new Date(), { hPlus: 15 }),
  meals_dist_percents: [30, 50, 20],
  diet_type: "neutral",
};
const NUTRITION_MENU_NAME_DATA = "Nutrition Menu";
export const logAlert = createLogAlertInfo(NUTRITION_MENU_NAME_DATA);

export const handleCreateNutritionMenu: RequestHandler = async (
  req,
  res,
  next
) => {
  const nutritionMenuID = Number(req.params.id);
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
  return next();
};
