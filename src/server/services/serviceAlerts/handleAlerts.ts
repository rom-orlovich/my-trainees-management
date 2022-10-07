/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import { ModifiedActionResult } from "../../express";
import { deleteQuery, insertQueryOneItem } from "../../PGSql/sqlHelpers";
import { TABLES_DATA } from "../../utilities/constants";
import { createObjValuesArr, promiseHandler } from "../../utilities/helpers";
import { ActionType, ErrorCustomizes } from "../serviceErrors/handleErrors";

export const createDataIDwithMessage = (
  message: {
    singleEntityName: string;
    action?: string;
    messagePayload?: string;
  },
  data?: Record<string, any>
) => ({
  message: `The ${message.singleEntityName}${
    message.messagePayload || ""
  } was ${message.action}d successfully!`,
  data: { id: createObjValuesArr(data || {})[0] },
});

/**
 *
 * @param singleEntityName  The name of single entity.
 * @param logAlert If true, the response result will log to the db as alert.
 * @returns Object that will be used in the alerts handler middleware.
 */
export const createModifiedActionResult =
  (singleEntityName: string) =>
  (
    successRes?: {
      sendDataID?: boolean;
      message?: string;
      statusCode?: number;
      data: any;
      messagePayload?: string;
    },
    err?: { code?: string; message?: string },
    action?: ActionType,
    logAlert = true
  ): ModifiedActionResult => {
    if (err) {
      const errorCustomizes = new ErrorCustomizes(
        err,
        action,
        singleEntityName
      );

      errorCustomizes.handleErrors();

      return { error: errorCustomizes, logAlert };
    }

    const response = successRes?.sendDataID
      ? createDataIDwithMessage({
          action,
          messagePayload: successRes?.messagePayload,
          singleEntityName,
        })
      : {
          message: successRes?.message,
          ...successRes?.data,
        };

    return {
      successRes: {
        statusCode: successRes?.statusCode,
        response,
      },
      logAlert,
    };
  };

export const handleAlertsMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  if (!req.modifiedActionResult) return next();
  const { successRes, error, logAlert } = req.modifiedActionResult;

  if (logAlert) {
    const [_, errAlert] = await promiseHandler(
      insertQueryOneItem(TABLES_DATA.ALERTS_TABLE_NAME, {
        alert_message: error ? error?.message : successRes?.response.message,
        user_id: req.auth_data.user_id,
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

  return res.status(successRes?.statusCode || 200).json(successRes.response);
};

// NOTE: NOT DELETE!!
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
