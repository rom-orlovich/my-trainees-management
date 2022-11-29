import { RequestHandler } from "express";
import { selectQuery } from "../../PGSql/simpleSqlQueries";
import { TABLES_DATA } from "../../utilities/tableDataSQL";
import { logAlert } from "./handleCreateNutritionMenu";
import { WITH_CLAUSE_GET_NUTRITION_MENU } from "./helpersDB";

export const handleGetNutritionMenu: RequestHandler = async (
  req,
  res,
  next
) => {
  const nutritionMenuID = Number(req.params.id);

  try {
    const nutritionMenuRes = await selectQuery(
      "nutrition_menu",
      "*",
      `where ${TABLES_DATA.NUTRITION_MENUS_LIST_ID}=$1`,
      [nutritionMenuID],
      WITH_CLAUSE_GET_NUTRITION_MENU
    );

    req.logAlertInfo = logAlert(
      { data: nutritionMenuRes[nutritionMenuRes.length - 1], message: "ok" },
      undefined,
      "get",
      true
    );
  } catch (error) {
    req.logAlertInfo = logAlert(
      undefined,
      { message: "some error" },
      "get",
      true
    );
  }

  return next();
};
