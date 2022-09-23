/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import { insertQueryOneItem } from "../PGSql/sqlHelpers";
import { TABLES_DATA } from "../utilities/constants";
import { createObjValuesArr, promiseHandler } from "../utilities/helpers";
import { ErrorCustomizes } from "./handleErrors";

export const handleAlertsMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  if (!req.modifiedActionResult) return next();
  const { data, message } = req.modifiedActionResult;

  const [_, errData] = await promiseHandler(
    insertQueryOneItem(TABLES_DATA.ALERTS_TABLE_NAME, {
      alert_message: message,
    })
  );

  if (errData) {
    next(new ErrorCustomizes(errData));
  }
  return res.status(200).json({
    message,
    id: createObjValuesArr(data)[0],
  });
};
