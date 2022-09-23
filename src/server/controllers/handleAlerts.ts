/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import { deleteQuery, insertQueryOneItem } from "../PGSql/sqlHelpers";
import { TABLES_DATA } from "../utilities/constants";
import { createObjValuesArr, promiseHandler } from "../utilities/helpers";
import { ErrorCustomizes } from "./handleErrors";

export const handleAlertsMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  if (!req.modifiedActionResult) return next();
  const { data, message, error } = req.modifiedActionResult;

  const [_, errAlert] = await promiseHandler(
    insertQueryOneItem(TABLES_DATA.ALERTS_TABLE_NAME, {
      alert_message: message || error?.message,
    })
  );
  if (error) return next(error);

  if (errAlert) {
    const errorCustomizes = new ErrorCustomizes(errAlert);
    errorCustomizes.handleErrors();
    return next(errorCustomizes);
  }

  return res.status(200).json({
    message,
    id: createObjValuesArr(data)[0],
  });
};

export const handleDeleteOldAlerts: RequestHandler = async (req, res, next) => {
  const [data, err] = await promiseHandler(
    deleteQuery(
      TABLES_DATA.ALERTS_TABLE_NAME,
      `where alert_date < now() - interval '0 days'`,
      [],
      true
    )
  );
  if (err) next(new ErrorCustomizes(err));
  res.status(200).json("Old alerts are deleted successfully");
};
