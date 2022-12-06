import { RequestHandler } from "express";
import { client } from "../../../PGSql/DBConnectConfig";

import { logAlert } from "./handleGenerateNutritionMenu";
import { WITH_CLAUSE_GET_NUTRITION_MENU } from "../utilities/helpersDBNutritionMenu";

export const handleGetNutritionMenu: RequestHandler = async (
  req,
  res,
  next
) => {
  const nutritionMenuID = Number(req.params.id);

  try {
    const nutritionMenuRes = await client.query(
      WITH_CLAUSE_GET_NUTRITION_MENU,
      [nutritionMenuID]
    );

    if (!nutritionMenuRes.rows.length) {
      req.logAlertInfo = logAlert(
        undefined,
        { message: "Nutrition Menu is not found" },
        "get",
        true
      );
      return next();
    }
    return res.status(200).json(nutritionMenuRes.rows[0]);
  } catch (error) {
    console.log(error);
    req.logAlertInfo = logAlert(undefined, error as Error, "get", true);
  }

  return next();
};
