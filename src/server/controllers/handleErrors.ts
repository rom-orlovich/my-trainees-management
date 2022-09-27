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
  RESULT_NOT_fOUND = "2RNF",
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
    } else if (this.error?.code === ErrorCodes.TOO_LONG) {
      this.message = `The ${this.errorPayload} data is invalid.`;
    } else if (this.error?.code === ErrorCodes.INVALID) {
      this.message = `The ${this.errorPayload} is invalid.`;
    } else if (this.error?.code === ErrorCodes.RESULT_NOT_fOUND)
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
    const { statusCode, message } = err;
    return res.status(statusCode).json({ message });
  }
  return next();
};
