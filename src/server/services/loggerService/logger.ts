/* eslint-disable @typescript-eslint/no-shadow */

import path from "path";

import { format, createLogger, LoggerOptions, transports } from "winston";
import winstonExpress from "express-winston";
import TransportStream from "winston-transport";
import {
  loggerRequestErrors,
  loggerRequestInfo,
  loggerRequestWarns,
  loggerTransport,
  LOG_LEVEL,
  timezone,
} from "./helpersLogger";

const loggerRequestTransport = [loggerRequestWarns, loggerRequestErrors];

const { timestamp, combine, printf, colorize, errors, json, prettyPrint } =
  format;
// Message Format
export const myFormat = printf(
  ({ level, message, timestamp, stack, ...meta }) => {
    const filename = meta?.fileName
      ? path.resolve(meta?.fileName).split("/").slice(-1).join("")
      : "";
    return `${timestamp} ${level}: ${filename} ${stack || message}`;
  }
);

// Shared Formats
const formats = [timestamp({ format: timezone() }), errors({ stack: true })];
const combineFormatConsole = combine(...formats, colorize(), myFormat);
const combineLogFile = combine(...formats, myFormat);
const httpFormat = combine(...formats, json(), prettyPrint());

const mainTransportLogger: TransportStream[] = [loggerTransport];
if (process.env.NODE_ENV === "development") {
  mainTransportLogger.push(
    new transports.Console({ format: combineFormatConsole })
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
