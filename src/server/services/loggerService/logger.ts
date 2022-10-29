/* eslint-disable @typescript-eslint/no-shadow */
import { format, createLogger, LoggerOptions, transports } from "winston";

const timezone = () =>
  new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jerusalem",
    dateStyle: "medium",
  });
// const timezone = () =>formatDate(new Date(),"en-US",{"locale":})

export const LOG_LEVEL: "debug" | "info" | "warn" | "error" = "debug";

const { timestamp, combine, label, printf, prettyPrint } = format;
const myFormat = printf(
  ({ level, message, label, timestamp }) => `${timestamp} ${level}: ${message}`
);
export const LOGGER_OPTIONS: LoggerOptions = {
  level: LOG_LEVEL,
  format: combine(
    // label({ label: "winston custom format" }),
    timestamp({ format: timezone() }),
    myFormat
    // prettyPrint()
  ),
  transports: [new transports.Console()],
};
export const logger = createLogger(LOGGER_OPTIONS);
