import { ErrorRequestHandler } from "express";
import { capitalize } from "lodash";

/* eslint-disable no-unused-vars */
export enum ErrorCodes {
  UNIQUE = "23505",
  INVALID = "22023",
}
interface ErrorProps {
  code: ErrorCodes;
  message?: string;
}
export class ErrorCustomizes<
  E extends Partial<Error> & { detail?: string; code?: string }
> {
  error?: E;
  errorPayload: any;
  message: string = "Something is went wrong";
  statusCode: number = 400;
  constructor(error?: E, errorPayload?: any) {
    console.log(error);
    this.error = error;

    this.errorPayload = errorPayload;
  }

  getFieldName() {
    // Key (identify_num)=(2222222) already exists.
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
      this.message = `The ${
        fieldNameArr || this.errorPayload
      } is already existed`;
    }

    if (this.error?.code === ErrorCodes.INVALID) {
      this.message = this.errorPayload
        ? `The ${this.errorPayload} is invalid value`
        : "The values are invalid";
    }
    return this;
  }
}

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: InstanceType<typeof ErrorCustomizes>,
  req,
  res,
  next
) => {
  if (err) {
    const { statusCode, message } = err.handleErrors();
    return res.status(statusCode).json({ message });
  }
  return next();
};
