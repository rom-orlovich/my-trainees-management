/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import * as yup from "yup";
import { promiseHandler } from "../../utilities/helpers";
import { logger } from "../loggerService/logger";
import { createLogAlertInfo } from "../alertsService/handleAlerts";
import { ErrorCodes } from "../errorsService/errorsService";

const createLogAlertInfoHandler = createLogAlertInfo("data");
export const validateMiddleware: (
  validateSchema: yup.ObjectSchema<any> | undefined
) => RequestHandler = (validateSchema) => async (req, res, next) => {
  if (!validateSchema) return next();

  const [valid, errValid] = await promiseHandler<any, yup.ValidationError>(
    validateSchema.validate(req.body)
  );

  if (errValid || !valid) {
    logger.error("LINE: 20, schema is invalid", {
      objs: [errValid, valid],
      __filename,
    });
    req.logAlertInfo = createLogAlertInfoHandler(undefined, {
      code: ErrorCodes.INVALID,
      message: errValid?.message,
    });

    return next();
  }
  return next();
};
