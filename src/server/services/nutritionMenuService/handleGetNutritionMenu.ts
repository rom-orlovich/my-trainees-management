import { RequestHandler } from "express";
import { client } from "../../PGSql/DBConnectConfig";

import { API_ROUTES } from "../apiRoutesConstants";

import { logAlert } from "./handleGenerateNutritionMenu";
import { WITH_CLAUSE_GET_NUTRITION_MENU } from "./helpersDB";

export const handleGetNutritionMenu: RequestHandler = async (
  req,
  res,
  next
) => {
  const nutritionMenuID = Number(req.params.id);

  try {
    // const nutritionMenuRes = await selectQuery(
    //   "nutrition_menu",
    //   "*",
    //   `where ${TABLES_DATA.NUTRITION_MENUS_LIST_ID}=$1`,
    //   [nutritionMenuID],
    //   WITH_CLAUSE_GET_NUTRITION_MENU
    // );

    const nutritionMenuRes = await client.query(
      WITH_CLAUSE_GET_NUTRITION_MENU,
      [nutritionMenuID]
    );

    if (nutritionMenuRes.rows.length)
      req.logAlertInfo = logAlert(
        {
          data: nutritionMenuRes.rows[nutritionMenuRes.rows.length - 1],
          message: `${API_ROUTES.NUTRITION_MENU_ENTITY} was found successfully`,
        },
        undefined,
        "get",
        true
      );
    else {
      req.logAlertInfo = logAlert(
        {
          data: nutritionMenuRes.rows[nutritionMenuRes.rows.length - 1],
          message: `${API_ROUTES.NUTRITION_MENU_ENTITY} wasn't found`,
        },
        undefined,
        "get",
        true
      );
    }
  } catch (error) {
    console.log(error);
    req.logAlertInfo = logAlert(undefined, error as Error, "get", true);
  }

  return next();
};
