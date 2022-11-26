/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */

import path from "path";

import { format, createLogger, LoggerOptions, transports } from "winston";
import winstonExpress from "express-winston";
import TransportStream from "winston-transport";

import {
  loggerDebugTransport,
  loggerErrorTransport,
  loggerInfoTransport,
  loggerRequestErrors,
  loggerRequestInfo,
  loggerRequestWarns,
  LOG_LEVEL,
} from "./helpersLogger";

const loggerRequestTransport = [loggerRequestWarns, loggerRequestErrors];

const { timestamp, combine, printf, colorize, errors, json, prettyPrint } =
  format;
// Message Format
export const myFormat = printf(
  ({ level, message, timestamp, stack, ...meta }) => {
    // console.log(meta?.__filename, meta?.objs);

    // console.log(meta && meta instanceof Error);
    const filename = meta?.__filename
      ? path.resolve(meta?.__filename).split("/").slice(-1).join("")
      : "";

    const obj = meta?.objs
      ? `${"valuesObj:"} ${meta?.objs.reduce(
          (pre: string, cur: object) => `${pre} ${JSON.stringify(cur)}`,
          ""
        )}`
      : "";
    return `${timestamp} ${level}: ${filename} ${stack || message} ${
      obj || ""
    }`;
  }
);

// Shared Formats
const formats = [
  timestamp({ format: "DD/MM/YY, HH:MM:SS" }),
  errors({ stack: true }),
];
const combineFormatConsole = combine(...formats, colorize(), myFormat);
const combineLogFile = combine(...formats, myFormat);
export const httpFormat = combine(...formats, json(), prettyPrint());

const mainTransportLogger: TransportStream[] = [
  loggerInfoTransport,
  loggerDebugTransport,
  loggerErrorTransport,
];
if (process.env.NODE_ENV === "development") {
  mainTransportLogger.push(
    new transports.Console({ format: combineFormatConsole, level: LOG_LEVEL })
  );
  loggerRequestTransport.push(loggerRequestInfo);
}
const LOGGER_OPTIONS: LoggerOptions = {
  level: LOG_LEVEL,
  format: combineLogFile,
  defaultMeta: { service: "user-service" },
  transports: mainTransportLogger,
};

export const requestLogger = createLogger({
  transports: loggerRequestTransport,
  format: httpFormat,
  level: LOG_LEVEL,
});
export const logger = createLogger(LOGGER_OPTIONS);

export const winstonExpressOption: winstonExpress.LoggerOptions = {
  winstonInstance: requestLogger,
  statusLevels: true,
  meta: true,
  headerBlacklist: ["authorization"],
  requestWhitelist: ["body", "header", "url"],
  responseWhitelist: ["body", "header", "url"],
};
