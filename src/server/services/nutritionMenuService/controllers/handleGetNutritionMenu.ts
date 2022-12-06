import { RequestHandler } from "express";
import { client } from "../../../PGSql/DBConnectConfig";

import { ErrorCustomizes } from "../../errorsService/errorsService";

import { logAlert } from "./handleGenerateNutritionMenu";
import { WITH_CLAUSE_GET_NUTRITION_MENU } from "../utilities/helpersDBNutritionMenu";

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

    if (!nutritionMenuRes.rows.length)
      return next(
        new ErrorCustomizes(
          { message: "No nutrition menu is found" },
          "get",
          true
        )
      );

    return res.status(200).json(nutritionMenuRes.rows[0]);
  } catch (error) {
    console.log(error);
    req.logAlertInfo = logAlert(undefined, error as Error, "get", true);
  }

  return next();
};
