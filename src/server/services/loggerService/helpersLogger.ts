import { transports } from "winston";

export const LOG_LEVEL: "debug" | "info" | "warn" | "error" = "debug";

export const timezone = () =>
  new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jerusalem",
    dateStyle: "long",
  });

const logAppDir = "./logs/app";
const logHttpDir = "./logs/http";

export const loggerTransport = new transports.File({
  level: "debug",
  filename: "info.log",
  dirname: logAppDir,
});

export const loggerRequestInfo = new transports.File({
  level: "info",
  filename: "requestsInfo.log",
  dirname: logHttpDir,
});

export const loggerRequestWarns = new transports.File({
  level: "warn",
  filename: "requestWarns.log",
  dirname: logHttpDir,
});
export const loggerRequestErrors = new transports.File({
  level: "error",
  filename: "requestsErrors.log",
  dirname: logHttpDir,
});
