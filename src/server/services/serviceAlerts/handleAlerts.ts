/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import { deleteQuery, insertQueryOneItem } from "../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../utilities/constants";
import { createObjValuesArr, promiseHandler } from "../../utilities/helpers";
import { ActionType, ErrorCustomizes } from "../serviceErrors/handleErrors";

/**
 *
 * @param singleEntityName  The name of single entity.
 * @param logAlert If true, the response result will log to the db as alert.
 * @returns Object that will be used in the alerts handler middleware.
 */
export const createModifiedActionResult =
  (singleEntityName: string, logAlert: boolean) =>
  (
    successRes: { statusCode?: number; data: any } | undefined,
    err: { code?: string; message: string } | undefined,
    action?: ActionType
  ) => {
    if (err) {
      const errorCustomizes = new ErrorCustomizes(
        err,
        action,
        singleEntityName
      );

      errorCustomizes.handleErrors();

      return { error: errorCustomizes, logAlert };
    }
    const message = `The ${singleEntityName} was ${action}d successfully!`;
    return {
      message,
      successRes,
      logAlert,
    };
  };

export const handleAlertsMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  if (!req.modifiedActionResult) return next();
  const { successRes, message, error, logAlert } = req.modifiedActionResult;

  if (logAlert) {
    const [_, errAlert] = await promiseHandler(
      insertQueryOneItem(TABLES_DATA.ALERTS_TABLE_NAME, {
        alert_message: message || error?.message,
      })
    );

    if (errAlert) {
      const errorCustomizes = new ErrorCustomizes(errAlert);
      errorCustomizes.handleErrors();
      return next(errorCustomizes);
    }
  }
  if (error) return next(error);

  if (!successRes) {
    return next(new Error("Something went wrong"));
  }
  return res.status(successRes?.statusCode || 200).json({
    message,
    id: createObjValuesArr(successRes!.data)[0],
  });
};
// app.delete(`${API_ROUTES.ALERT_ROUTE}/oldAlerts`, handleDeleteOldAlerts);
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
