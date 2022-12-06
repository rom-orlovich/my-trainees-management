import { ErrorRequestHandler } from "express";
import { capitalize } from "lodash";

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
  errorFieldValue: Record<string, any> = {};

  constructor(error?: E, action?: ActionType, errorPayload?: any) {
    this.error = error;
    this.errorPayload = errorPayload;
    this.action = action;
  }

  getFieldName() {
    if (!this.error?.detail) return;
    const detail = this.error.detail?.split(" ")[1].split("=");
    const field = detail[0].slice(1, -1);
    this.errorFieldValue = { field };
  }

  handleUniqueError() {
    this.getFieldName();
    const describeAction = this.action === "create" ? "new" : "exist";
    this.message = `Cannot ${this.action} ${describeAction} ${
      this.errorPayload
    }. The ${
      this.errorFieldValue?.field || this.errorPayload
    } is already existed`;
    this.statusCode = 409;
  }

  handleNotColumnFound() {
    const describeAction = this.action === "create" ? "new" : "exist";
    this.message = `Cannot ${this.action} ${describeAction} ${this.errorPayload}.`;
  }

  handleInvalidField() {
    const fullErrorMessage = this?.error?.message?.split(" ");
    // Extract the invalid word from the error message.
    const invalidField = fullErrorMessage ? fullErrorMessage[0] : "";
    const invalidFieldFormatted = invalidField
      .split("_")
      .map((el, i) => capitalize(el))
      .join(" ");

    const newErrorMessage = `${invalidFieldFormatted} ${
      fullErrorMessage?.slice(1).join(" ") || ""
    }`;
    this.statusCode = 400;
    this.message = newErrorMessage || `The ${this.errorPayload} is invalid.`;
  }

  handleLoginField() {
    this.message = this.error?.message || "";
    this.statusCode = 401;
  }

  handleErrors() {
    if (this.error?.code === ErrorCodes.UNIQUE) {
      this.handleUniqueError();
    } else if (this.error?.code === ErrorCodes.NOT_COLUMN_FOUND) {
      this.handleNotColumnFound();
    } else if (this.error?.code === ErrorCodes.TOO_LONG) {
      this.message = `The ${this.errorPayload} data is invalid.`;
    } else if (this.error?.code === ErrorCodes.INVALID) {
      this.handleInvalidField();
    } else if (this.error?.code === ErrorCodes.LOGIN_FAILED) {
      this.handleLoginField();
    } else if (this.error?.message) this.message = this.error.message;

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
    return res.status(statusCode).json({ statusCode, message });
  }
  return next();
};
