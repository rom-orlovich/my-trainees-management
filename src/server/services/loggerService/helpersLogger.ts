import { transports } from "winston";
import { IS_DEVELOPMENT_MODE } from "../../utilities/constants";

export const LOG_LEVEL: "debug" | "info" | "warn" | "error" =
  IS_DEVELOPMENT_MODE ? "info" : "info";

export const timezone = () =>
  new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jerusalem",
    dateStyle: "full",
  });

const logAppDir = "./logs/dev";
const logHttpDir = "./logs/http";

export const loggerDebugTransport = new transports.File({
  level: "debug",
  filename: "debug.log",
  dirname: logAppDir,
});
export const loggerInfoTransport = new transports.File({
  level: "info",
  filename: "info.log",
  dirname: logAppDir,
});
export const loggerErrorTransport = new transports.File({
  level: "error",
  filename: "error.log",
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
