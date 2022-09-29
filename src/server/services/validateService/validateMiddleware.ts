/* eslint-disable no-unused-vars */
import { RequestHandler } from "webpack-dev-server";
import * as yup from "yup";
import { promiseHandler } from "../../utilities/helpers";
import { ErrorCodes, ErrorCustomizes } from "../serviceErrors/handleErrors";

export const validateMiddleware: (
  validateSchema: yup.ObjectSchema<any> | undefined
) => RequestHandler = (validateSchema) => async (req, res, next) => {
  if (!validateSchema) return next();
  const [valid, errValid] = await promiseHandler<any, yup.ValidationError>(
    validateSchema.validate(req.body)
  );
  if (errValid && !valid)
    return next(new ErrorCustomizes({ code: ErrorCodes.INVALID }));
  return next();
};
