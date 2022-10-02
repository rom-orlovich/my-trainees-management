import { ErrorRequestHandler } from "express";
import { capitalize } from "lodash";
// import { insertQueryOneItem } from "../PGSql/sqlHelpers";
// import { TABLES_DATA } from "../utilities/constants";
// import { promiseHandler } from "../utilities/helpers";

/* eslint-disable no-unused-vars */
export enum ErrorCodes {
  UNIQUE = "23505",
  INVALID = "22023",
  TOO_LONG = "22001",
  NOT_COLUMN_FOUND = "42703",
  RESULT_NOT_FOUND = "2RNF",
  LOGIN_FAILED = "2LF",
}

export type ActionType = "update" | "delete" | "create" | "get";
export class ErrorCustomizes<
  E extends Partial<Error> & { detail?: string; code?: string }
> {
  error?: E;
  errorPayload: any;
  action?: ActionType;
  message: string = "Something is went wrong";
  statusCode: number = 400;

  constructor(error?: E, action?: ActionType, errorPayload?: any) {
    console.log(error);
    this.error = error;
    this.errorPayload = errorPayload;
    this.action = action;
  }

  getFieldName() {
    if (!this.error?.detail) return "";
    const fieldNameArr = this.error.detail
      ?.split(" ")[1]
      .split("=")[0]
      .slice(1, -1)
      .split("_");
    return fieldNameArr.map((el) => capitalize(el)).join(" ");
  }

  handleErrors() {
    if (this.error?.code === ErrorCodes.UNIQUE) {
      const fieldNameArr = this.getFieldName();
      const describeAction = this.action === "create" ? "new" : "exist";
      this.message = `Cannot ${this.action} ${describeAction} ${
        this.errorPayload
      }. The ${fieldNameArr || this.errorPayload} is already existed`;
      this.statusCode = 409;
    } else if (this.error?.code === ErrorCodes.NOT_COLUMN_FOUND) {
      const describeAction = this.action === "create" ? "new" : "exist";
      this.message = `Cannot ${this.action} ${describeAction} ${this.errorPayload}.`;
    } else if (this.error?.code === ErrorCodes.TOO_LONG) {
      this.message = `The ${this.errorPayload} data is invalid.`;
    } else if (this.error?.code === ErrorCodes.INVALID) {
      const fullErrorMessage = this.error.message?.split(" ");
      // Extract the invalid word from the error message.
      const invalidField = fullErrorMessage ? fullErrorMessage[0] : "";
      const invalidFieldFormatted = invalidField
        .split("_")
        .map((el, i) => capitalize(el))
        .join(" ");

      const newErrorMessage = `${invalidFieldFormatted} ${
        fullErrorMessage?.slice(1).join(" ") || ""
      }`;

      this.message = newErrorMessage || `The ${this.errorPayload} is invalid.`;
    } else if (this.error?.code === ErrorCodes.RESULT_NOT_FOUND)
      this.message = this.error?.message || "";
    else if (this.error?.code === ErrorCodes.LOGIN_FAILED)
      this.message = this.error?.message || "";

    return this;
  }
}

export const errorHandlerMiddleware: ErrorRequestHandler = async (
  err: InstanceType<typeof ErrorCustomizes>,
  req,
  res,
  next
) => {
  if (err) {
    console.log(err);
    const { statusCode, message } = err;
    return res.status(statusCode).json({ message });
  }
  return next();
};
